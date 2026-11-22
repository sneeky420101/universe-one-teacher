'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const page=fs.readFileSync(path.join(root,'water-cycle-simulator.html'),'utf8');
test('learning quest links to science simulator',()=>{
 const quest=fs.readFileSync(path.join(root,'learning-quest.html'),'utf8');
 assert.match(quest,/href="\.\/water-cycle-simulator\.html"/);
});
test('science simulator has functional inputs and accessible status',()=>{
 for(const id of ['temperature','humidity','simulate','reset','observation','feedback','stepCount'])assert.ok(page.includes('id="'+id+'"'),id);
 assert.match(page,/aria-live="polite"/);
 assert.match(page,/\$\('simulate'\)\.onclick=run/);
 assert.match(page,/\$\('reset'\)\.onclick=/);
});
test('science model branches produce defined process and explanatory output',()=>{
 const script=page.match(/<script>([\s\S]*?)<\/script>/);
 assert.ok(script);
 new vm.Script(script[1]);
 const start=script[1].indexOf('function model('),end=script[1].indexOf('\nfunction run()',start);
 const context=vm.createContext({});
 vm.runInContext(script[1].slice(start,end),context);
 for(const [t,h,stage] of [[30,30,'evaporation'],[10,90,'condensation'],[30,100,'precipitation']]){
  const result=vm.runInContext('model('+t+','+h+')',context);
  assert.equal(result.stage,stage);
  assert.ok(result.message.length>30);
 }
});
