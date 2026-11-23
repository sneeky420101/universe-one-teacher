'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {buildScenario,createRequestedWorkshop,listScenarioCatalog}=require('../lib/scenario-generator');
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

test('catalog exposes exactly 200 explicitly conceptual theme-mode combinations',()=>{
 const catalog=listScenarioCatalog();
 assert.equal(catalog.conceptualCombinations,200);
 assert.equal(catalog.verifiedRealWorldProcedures,0);
 for(const [domain,themes] of Object.entries(catalog.themes)){
  assert.equal(themes.length,10,domain);
  assert.equal(new Set(themes).size,10,domain);
 }
 assert.equal(catalog.modes.length,5);
});
test('selected themes and modes are labeled as unverified conceptual lessons',()=>{
 const cases=[
  ['Inspect a car engine cover in maintenance overview','automotive','engine cover'],
  ['Inspect plumbing faucet body in disassembly mode','plumbing','faucet body'],
  ['Inspect electronics sensor housing for reassembly','electronics','sensor housing'],
  ['Inspect woodworking cabinet hinge for inspection','woodworking','cabinet hinge']
 ];
 for(const [request,domain,theme] of cases){
  const result=buildScenario(request);
  assert.equal(result.ok,true,request);
  assert.equal(result.scenario.domain,domain);
  assert.equal(result.scenario.theme,theme);
  assert.equal(result.scenario.verifiedForRealWorldRepair,false);
  assert.equal(result.scenario.fidelity,'procedural-prototype');
 }
});

test('theme-only queries resolve to their correct domain',()=>{
 for(const [request,domain] of [['Inspect the radiator shroud','automotive'],['Inspect the sink trap','plumbing'],['Inspect the sensor housing','electronics'],['Inspect the drawer slide','woodworking']]){
  const result=buildScenario(request);
  assert.equal(result.ok,true,request);
  assert.equal(result.scenario.domain,domain,request);
  assert.equal(result.scenario.simulationStages.length,5);
  assert.match(result.scenario.notice,/Conceptual six-step/);
 }
});


test('ambiguous cross-domain requests require clarification rather than silently choosing a workshop',()=>{
 const result=buildScenario('Inspect car and plumbing equipment');
 assert.equal(result.ok,false);
 assert.equal(result.reason,'ambiguous-topic');
 assert.deepEqual(result.domains,['automotive','plumbing']);
 assert.match(result.hint,/Specify one workshop domain/);
});
