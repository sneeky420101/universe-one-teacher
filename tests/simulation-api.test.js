'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {setTimeout:delay}=require('node:timers/promises');
const path=require('node:path');
test('server serves simulation API and interactive lab',async()=>{
 const port=20000+Math.floor(Math.random()*20000);
 const child=spawn(process.execPath,['server.js'],{cwd:path.resolve(__dirname,'..'),env:{...process.env,PORT:String(port)},stdio:'ignore'});
 const origin='http://127.0.0.1:'+port;
 try{
  let ready=false;
  for(let i=0;i<40;i++){try{const r=await fetch(origin+'/health');if(r.ok){ready=true;break}}catch{}await delay(100)}
  assert.equal(ready,true,'server started');
  const r=await fetch(origin+'/api/simulation?topic='+encodeURIComponent('Repair a plumbing pipe'));
  assert.equal(r.status,200);
  const data=await r.json();
  assert.equal(data.ok,true);
  assert.equal(data.scenario.domain,'plumbing');
  assert.equal(data.scenario.steps.length,6);
  assert.equal(data.scenario.verifiedForRealWorldRepair,false);
  const bad=await fetch(origin+'/api/simulation?topic=unrelated');
  assert.equal(bad.status,422);
  const lab=await fetch(origin+'/assembly-lab.html');
  assert.equal(lab.status,200);
  const html=await lab.text();
  assert.match(html,/api\\/simulation/);
  const student=await fetch(origin+'/student-hub.html');
  assert.equal(student.status,200);
  const studentHtml=await student.text();
  assert.match(studentHtml,/universe-one-local-learning-v1/);
  assert.match(studentHtml,/questionBank/);
  assert.match(studentHtml,/Complete the 3D workshop before recording an assessment score/);
  assert.match(studentHtml,/Open workshop to complete/);
  assert.match(html,/savePracticeCompletion\(scenario\.domain\)/);
  const home=await fetch(origin+'/');
  assert.match(await home.text(),/assembly-lab.html/);
  const post=await fetch(origin+'/api/simulation',{method:'POST'});
  assert.equal(post.status,405);
 }finally{child.kill()}
});
