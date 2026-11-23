'use strict';
// Deterministic, renderer-independent learning simulation. No real repair instructions.
const STEPS=Object.freeze(['inspect','measure','isolate','replace','verify']);
function newSession(seed=1){if(!Number.isSafeInteger(seed)||seed<0)throw Error('Invalid seed');return {seed,phase:'active',step:0,attempts:0,score:100,isolated:false,part:'faulty',voltage:seed%2?11.4:11.1,events:[]}}
function transition(current,input){if(!current||!input||typeof input.type!=='string')throw Error('Invalid action');if(current.phase!=='active')return {state:current,ok:false,message:'Lesson already finished'};const s={...current,events:[...current.events]};const expected=STEPS[s.step];const fail=message=>{s.attempts++;s.score=Math.max(0,s.score-5);s.events.push({type:'retry',message});return {state:s,ok:false,message}};if(input.type!==expected)return fail('Try the current task first: '+expected);
if(expected==='inspect'&&input.target!=='battery')return fail('Inspect the battery first');
if(expected==='measure'&&input.tool!=='voltmeter')return fail('Choose the voltmeter to inspect the simulated reading');
if(expected==='isolate'&&input.tool!=='insulated-wrench')return fail('Choose the insulated training wrench');
if(expected==='replace'&&(!s.isolated||input.part!=='terminal'))return fail('The training circuit must be isolated before replacement');
if(expected==='verify'&&(!s.isolated||s.part!=='replaced'||input.tool!=='voltmeter'))return fail('Finish the training repair and verify with the voltmeter');
if(expected==='isolate')s.isolated=true;
if(expected==='replace')s.part='replaced';
if(expected==='verify'){s.voltage=12.6;s.phase='complete'}
s.step++;s.events.push({type:'success',step:expected});return {state:s,ok:true,message:expected==='verify'?'Training mission complete':'Step complete: '+expected}}
module.exports={STEPS,newSession,transition};
