const test=require('node:test');
const assert=require('node:assert/strict');
const tire=require('../lib/tire-training');
test('safe workflow completes in sequence',()=>{
 let s=tire.initialState();
 for(const action of ['confirmSafety','inspectSidewall','chooseReplacement','confirmReassembly'])s=tire.transition(s,action);
 assert.equal(s.step,'complete');assert.equal(s.completed,true);assert.equal(s.mistakes,0);
});
test('out-of-order action does not advance',()=>{
 const s=tire.transition(tire.initialState(),'inspectSidewall');
 assert.equal(s.step,'briefing');assert.equal(s.mistakes,1);
});
test('sidewall patch decision is rejected',()=>{
 let s=tire.transition(tire.initialState(),'confirmSafety');
 s=tire.transition(s,'inspectSidewall');
 s=tire.transition(s,'choosePatch');
 assert.equal(s.step,'decision');assert.match(s.feedback,/not repairable/);
});
test('reset clears progress',()=>{
 let s=tire.transition(tire.initialState(),'confirmSafety');
 s=tire.transition(s,'reset');assert.deepEqual(s,tire.initialState());
});
test('invalid saved data falls back safely',()=>{
 assert.deepEqual(tire.restore('bad json'),tire.initialState());
 assert.deepEqual(tire.restore('{"step":"complete","mistakes":-1,"feedback":"x"}'),tire.initialState());
});
test('valid saved data restores completion consistently',()=>{
 const s=tire.restore(JSON.stringify({step:'complete',mistakes:2,feedback:'Done'}));
 assert.equal(s.completed,true);assert.equal(s.mistakes,2);
});

test('3D workshop mounts the accessible tire scenario and storage controls',()=>{
 const fs=require('node:fs');
 const html=fs.readFileSync(require('node:path').join(__dirname,'../workshop-3d.html'),'utf8');
 for(const marker of ['src="./lib/tire-training.js"','id="tireTraining"','id="tireStatus"','aria-live="polite"','id="tireActions"','id="tireReset"','tireApi.transition','localStorage.setItem','localStorage.removeItem']){
  assert.ok(html.includes(marker),'Missing workshop integration: '+marker);
 }
 assert.match(html,/sidewall split/i);
 assert.match(html,/not patchable/i);
});
