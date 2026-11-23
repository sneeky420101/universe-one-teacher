'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {buildScenario}=require('../lib/scenario-generator');
const {createWorkshop}=require('../lib/workshop-engine');
const {buildAssemblyScene,sceneAtSnapshot}=require('../lib/assembly-scene');
test('scene geometry exists for every generated conceptual domain',()=>{
 for(const request of ['Rebuild a car engine','Repair a plumbing pipe','Inspect an electronics circuit','Repair a wooden cabinet']){
  const result=buildScenario(request);
  assert.equal(result.ok,true);
  const scene=buildAssemblyScene(result.scenario);
  assert.equal(scene.objects.length,result.scenario.parts.length);
  assert.equal(scene.verifiedDimensions,false);
  assert.equal(new Set(scene.objects.map(o=>o.id)).size,scene.objects.length);
  assert.ok(scene.objects.every(o=>o.scale.every(n=>Number.isFinite(n)&&n>0)));
 }
});
test('scene state tracks actual workshop removals and reinstallations',()=>{
 const scenario=buildScenario('Rebuild a car engine').scenario;
 const workshop=createWorkshop(scenario);
 const scene=buildAssemblyScene(scenario);
 const initial=sceneAtSnapshot(scene,workshop.snapshot());
 assert.equal(initial.objects.every(o=>o.installed),true);
 assert.equal(workshop.perform({stepId:'inspect'}).ok,true);
 assert.equal(workshop.perform({stepId:'remove-fastener',tool:'socket'}).ok,true);
 const removed=sceneAtSnapshot(scene,workshop.snapshot());
 const fastener=removed.objects.find(o=>o.id==='fastener');
 assert.equal(fastener.installed,false);
 assert.deepEqual(fastener.position,fastener.removedPosition);
 for(const step of [{stepId:'remove-cover'},{stepId:'inspect-cover'},{stepId:'install-cover'},{stepId:'install-fastener',tool:'socket'}])assert.equal(workshop.perform(step).ok,true);
 const final=sceneAtSnapshot(scene,workshop.snapshot());
 assert.equal(final.objects.every(o=>o.installed),true);
 assert.equal(workshop.snapshot().complete,true);
});
test('scene rejects malformed geometry inputs and missing part state',()=>{
 assert.throws(()=>buildAssemblyScene({parts:[{id:'x'},{id:'x'}],steps:[]}),/Invalid scene part/);
 const scene=buildAssemblyScene(buildScenario('Rebuild a car engine').scenario);
 assert.throws(()=>sceneAtSnapshot(scene,{parts:[]}),/Missing part state/);
});

test('repeated scene updates restore original home positions',()=>{
 const scene=buildAssemblyScene(buildScenario('Rebuild a car engine').scenario);
 const removed=sceneAtSnapshot(scene,{parts:[{id:'fastener',installed:false},{id:'cover',installed:true}]});
 const restored=sceneAtSnapshot(removed,{parts:[{id:'fastener',installed:true},{id:'cover',installed:true}]});
 const original=scene.objects.find(o=>o.id==='fastener');
 assert.deepEqual(restored.objects.find(o=>o.id==='fastener').position,original.position);
});
