// Local-only HTTP smoke test; never connects to production.
const test=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const net=require('node:net');
const path=require('node:path');
const {setTimeout:delay}=require('node:timers/promises');
async function freePort(){const server=net.createServer();await new Promise((resolve,reject)=>server.once('error',reject).listen(0,'127.0.0.1',resolve));const port=server.address().port;await new Promise(resolve=>server.close(resolve));return port}
test('local server serves app, Quest, manifest, service worker and health securely', {timeout:20000}, async()=>{
  const port=await freePort();
  const child=spawn(process.execPath,['server.js'],{cwd:path.resolve(__dirname,'..'),env:{...process.env,PORT:String(port)},stdio:'ignore'});
  try{
    let ready=false;
    for(let i=0;i<60;i++){if(child.exitCode!==null)throw Error('server exited unexpectedly');try{const r=await fetch('http://127.0.0.1:'+port+'/health');if(r.ok){ready=true;break}}catch{}await delay(100)}
    assert.ok(ready,'server did not start');
    for(const [route,type] of [['/','text/html'],['/quest.html','text/html'],['/tutorial.html','text/html'],['/manifest.webmanifest','application/manifest+json'],['/sw.js','text/javascript'],['/icon.svg','image/svg+xml'],['/curriculum/catalog.json','application/json']]){
      const res=await fetch('http://127.0.0.1:'+port+route);
      assert.equal(res.status,200,route);
      assert.ok(res.headers.get('content-type')?.includes(type),route);
      assert.equal(res.headers.get('x-content-type-options'),'nosniff');
      assert.ok((await res.text()).length>10,route);
    }
    const missing=await fetch('http://127.0.0.1:'+port+'/not-a-page');
    assert.equal(missing.status,404);
  }finally{child.kill();await Promise.race([new Promise(resolve=>child.once('exit',resolve)),delay(2000)])}
});
