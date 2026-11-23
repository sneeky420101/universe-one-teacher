'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {buildScenario,createRequestedWorkshop}=require('../lib/scenario-generator');
test('generates four scoped workshop domains',()=>{
 for(const [request,domain] of [['Rebuild a car engine','automotive'],['Repair a plumbing pipe','plumbing'],['Inspect an electronics circuit','electronics'],['Repair a wooden cabinet','woodworking']]){
 const r=buildScenario(request);assert.equal(r.ok,true);assert.equal(r.scenario.domain,domain);assert.equal(r.scenario.steps.length,6);assert.equal(r.scenario.verifiedForRealWorldRepair,false);
 }
});
test('rejects unknown, empty and excessive requests',()=>{
 for(const q of ['hello',' ', 'Learn underwater basket weaving', 'x'.repeat(501)])assert.equal(buildScenario(q).ok,false);
});
test('generated lesson enforces prerequisites and completes',()=>{
 const r=createRequestedWorkshop('Learn automotive engine repairs');assert.equal(r.ok,true);
 const w=r.workshop;
 assert.equal(w.perform({stepId:'remove-cover'}).reason,'prerequisite');
 for(const [stepId,tool] of [['inspect'],['remove-fastener','socket'],['remove-cover'],['inspect-cover'],['install-cover'],['install-fastener','socket']]){
 const result=w.perform({stepId,tool});assert.equal(result.ok,true,stepId);
 }
 assert.equal(w.snapshot().complete,true);
});
