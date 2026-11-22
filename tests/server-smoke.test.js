// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
const test=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {once}=require('node:events');
const net=require('node:net');

async function freePort(){
 const server=net.createServer();
 server.listen(0,'127.0.0.1');
 await once(server,'listening');
 const port=server.address().port;
 await new Promise((resolve,reject)=>server.close(e=>e?reject(e):resolve()));
 return port;
}
test('HTTP smoke: school, game, catalog, security and method handling', {timeout:15000},async()=>{
 const port=await freePort();
 const child=spawn(process.execPath,['server.js'],{env:{...process.env,PORT:String(port)},stdio:'ignore'});
 try{
  let ready=false;
  for(let i=0;i<60;i++){
   if(child.exitCode!==null)throw Error('server exited before startup');
   try{const r=await fetch('http://127.0.0.1:'+port+'/health');if(r.ok){ready=true;break}}catch{}
   await new Promise(resolve=>setTimeout(resolve,100));
  }
  assert.ok(ready,'server did not start');
  for(const [route,type] of [['/', 'text/html'],['/learning-quest.html','text/html'],['/college.html','text/html'],['/metaverse.html','text/html'],['/engineering-lab.html','text/html'],['/quest.html','text/html'],['/college/catalog.json','application/json'],['/curriculum/catalog.json','application/json']]){
   const r=await fetch('http://127.0.0.1:'+port+route);
   assert.equal(r.status,200,route);
   assert.match(r.headers.get('content-type')||'',new RegExp(type));
   assert.equal(r.headers.get('x-content-type-options'),'nosniff');
   assert.match(r.headers.get('content-security-policy')||'',/default-src/);
   assert.ok((await r.text()).length>100);
  }
  const missing=await fetch('http://127.0.0.1:'+port+'/not-a-route');
  assert.equal(missing.status,404);
  const post=await fetch('http://127.0.0.1:'+port+'/health',{method:'POST'});
  assert.equal(post.status,405);
 }finally{
  child.kill();
  if(child.exitCode===null)await Promise.race([once(child,'exit'),new Promise(resolve=>setTimeout(resolve,1000))]);
 }
});
