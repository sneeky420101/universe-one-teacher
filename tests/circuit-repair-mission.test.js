'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname,'..','circuit-repair-mission.html'),'utf8');
const play = fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');
function boot(){
  const handlers=new Map(),storage=new Map(),nodes=new Map();
  const ids=['battery','switch','bulb','batteryVisual','switchVisual','bulbVisual','attempts','completed','progress','summary','feedback','explanation','test','reset','voice','voiceStatus'];
  for(const id of ids) nodes.set(id,{value:id==='battery'?'flat':id==='switch'?'open':id==='bulb'?'broken':0,textContent:'',classList:{toggle(){}},addEventListener(event,fn){handlers.set(id+':'+event,fn)}});
  const answers=[0,1,2].map(i=>({dataset:{answer:String(i)},disabled:false,addEventListener(event,fn){handlers.set('answer'+i+':'+event,fn)}}));
  const document={getElementById:id=>nodes.get(id),querySelectorAll:selector=>selector==='[data-answer]'?answers:selector==='select'?[nodes.get('battery'),nodes.get('switch'),nodes.get('bulb')]:[]};
  const localStorage={getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)};
  const script=html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(script,'mission must contain executable script');
  vm.runInNewContext(script[1],{document,localStorage},{timeout:1000});
  return {nodes,answers,storage,click:id=>{const handler=handlers.get(id+':click');assert.ok(handler,'missing click handler '+id);handler()},change:id=>{const handler=handlers.get(id+':change');assert.ok(handler,'missing change handler '+id);handler()}};
}
test('mission is discoverable from gameplay selector',()=>assert.match(play,/href="\.\/circuit-repair-mission\.html"/));
test('accessible feedback and progress elements are present',()=>{
  assert.match(html,/id="feedback" role="status" aria-live="polite"/);
  assert.match(html,/id="progress" max="2"/);
  assert.match(html,/id="battery"/);assert.match(html,/id="switch"/);assert.match(html,/id="bulb"/);
});
test('failed circuit diagnoses all faults and does not award completion',()=>{
  const app=boot();app.click('test');
  assert.match(app.nodes.get('feedback').textContent,/battery/);
  assert.match(app.nodes.get('feedback').textContent,/switch/);
  assert.match(app.nodes.get('feedback').textContent,/bulb/);
  assert.equal(app.nodes.get('progress').value,0);
  assert.equal(app.answers[1].disabled,true);
});
test('repaired circuit unlocks explanation and correct answer persists completion',()=>{
  const app=boot();
  for(const [id,value] of [['battery','good'],['switch','closed'],['bulb','good']]){app.nodes.get(id).value=value;app.change(id)}
  app.click('test');assert.equal(app.nodes.get('progress').value,1);
  assert.equal(app.answers[1].disabled,false);
  app.click('answer0');assert.equal(app.nodes.get('progress').value,1);
  app.click('answer1');assert.equal(app.nodes.get('progress').value,2);
  assert.match(app.storage.get('universe-one-circuit-mission-v1'),/"explained":true/);
  app.click('reset');assert.equal(app.nodes.get('progress').value,0);
  assert.match(app.storage.get('universe-one-circuit-mission-v1'),/"explained":false/);
});

test('3D campus provides an interactive entrance and accessible direct link',()=>{
  const campus=fs.readFileSync(path.join(__dirname,'..','3d-campus.html'),'utf8');
  assert.match(campus,/name:'Circuit Repair Workshop',url:'\.\/circuit-repair-mission\.html'/);
  assert.match(campus,/<a href="\.\/circuit-repair-mission\.html">🔋 Circuit Repair Mission<\/a>/);
});

test('voice guidance is opt-in and does not require microphone access',()=>{
  assert.match(html,/id="voice" type="button" aria-pressed="false"/);
  assert.match(html,/speechSynthesis/);
  assert.doesNotMatch(html,/getUserMedia|SpeechRecognition|webkitSpeechRecognition/);
  const app=boot();
  assert.equal(app.nodes.get('voice').disabled,true);
  app.click('test');
  assert.equal(app.nodes.get('progress').value,0);
});
