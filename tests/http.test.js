// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {once}=require('node:events');
const http=require('node:http');
const net=require('node:net');
function get(url){return new Promise((resolve,reject)=>http.get(url,res=>{let body='';res.setEncoding('utf8');res.on('data',c=>body+=c);res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body}))}).on('error',reject))}
async function freePort(){const server=net.createServer();server.listen(0,'127.0.0.1');await once(server,'listening');const port=server.address().port;server.close();await once(server,'close');return port}
test('HTTP server serves classroom and Quest routes with security headers',async()=>{
const port=await freePort();
const child=spawn(process.execPath,['server.js'],{env:{...process.env,PORT:String(port)},stdio:'ignore'});
try{
let ready=false;
for(let attempt=0;attempt<40;attempt++){if(child.exitCode!==null)throw Error('Server exited early');try{const r=await get('http://127.0.0.1:'+port+'/health');if(r.status===200){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}
assert.ok(ready,'server did not start');
const base='http://127.0.0.1:'+port;
for(const route of ['/','/index.html','/quest.html']){const r=await get(base+route);assert.equal(r.status,200);assert.match(r.headers['content-type'],/text\/html/);assert.match(r.headers['content-security-policy'],/default-src 'none'/);assert.equal(r.headers['x-content-type-options'],'nosniff');assert.match(r.body,/Brandon Hastings/)}
assert.equal((await get(base+'/health')).body,'ok');
assert.equal((await get(base+'/missing')).status,404);
assert.equal((await get(base+'/%2e%2e/secret')).status,404);
}finally{child.kill();await once(child,'exit').catch(()=>{})}
});
