'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { createWorkshop } = require('../lib/workshop-engine');
const spec = { parts:[{id:'bolt'},{id:'cover'}], steps:[
  {id:'remove-bolt',part:'bolt',action:'remove',tool:'socket'},
  {id:'remove-cover',part:'cover',action:'remove',requires:['remove-bolt']},
  {id:'install-cover',part:'cover',action:'install',requires:['remove-cover']},
  {id:'install-bolt',part:'bolt',action:'install',requires:['install-cover'],tool:'torque-wrench',specRequired:true,verifiedSpec:true,target:20,tolerance:1}
]};
test('disassembly and reassembly require correct order, tools and measurement',()=>{
 const w=createWorkshop(spec);
 assert.equal(w.perform({stepId:'remove-cover'}).reason,'prerequisite');
 assert.equal(w.perform({stepId:'remove-bolt',tool:'hammer'}).reason,'wrong-tool');
 assert.equal(w.perform({stepId:'remove-bolt',tool:'socket'}).ok,true);
 assert.equal(w.perform({stepId:'remove-cover'}).ok,true);
 assert.equal(w.perform({stepId:'install-cover'}).ok,true);
 assert.equal(w.perform({stepId:'install-bolt',tool:'torque-wrench'}).reason,'verified-measurement-required');
 assert.equal(w.perform({stepId:'install-bolt',tool:'torque-wrench',measurement:24}).reason,'measurement-out-of-range');
 assert.equal(w.perform({stepId:'install-bolt',tool:'torque-wrench',measurement:20}).complete,true);
 assert.equal(w.snapshot().parts.every(p=>p.installed),true);
});
test('unverified service values cannot pass',()=>{
 const w=createWorkshop({...spec,steps:spec.steps.map(s=>s.id==='install-bolt'?{...s,verifiedSpec:false}:s)});
 w.perform({stepId:'remove-bolt',tool:'socket'});w.perform({stepId:'remove-cover'});w.perform({stepId:'install-cover'});
 assert.equal(w.perform({stepId:'install-bolt',tool:'torque-wrench',measurement:20}).reason,'missing-verified-spec');
});
