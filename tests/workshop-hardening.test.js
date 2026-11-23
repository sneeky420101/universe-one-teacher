'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {createWorkshop}=require('../lib/workshop-engine');
test('rejects cyclic prerequisites before gameplay',()=>{
 assert.throws(()=>createWorkshop({parts:[{id:'p'}],steps:[{id:'a',part:'p',action:'inspect',requires:['b']},{id:'b',part:'p',action:'inspect',requires:['a']}]}),/Cyclic/);
});
test('rejects nonfinite and negative verified tolerance',()=>{
 for(const tolerance of [NaN,Infinity,-1])assert.throws(()=>createWorkshop({parts:[{id:'p'}],steps:[{id:'a',part:'p',action:'inspect',specRequired:true,verifiedSpec:true,target:5,tolerance}]}),/Invalid verified specification/);
});
test('invalid inputs return structured errors',()=>{
 const w=createWorkshop({parts:[{id:'p'}],steps:[{id:'a',part:'p',action:'inspect'}]});
 assert.equal(w.perform(null).reason,'invalid-input');
 assert.equal(w.perform().reason,'unknown-step');
});
