'use strict';
// Batch 41: framework-independent educational tire inspection state machine.
// Sidewall damage is never represented as patchable.
const STEPS = Object.freeze(['briefing','inspection','decision','reassembly','complete']);
const ACTIONS = Object.freeze({
  briefing:'confirmSafety',
  inspection:'inspectSidewall',
  decision:'chooseReplacement',
  reassembly:'confirmReassembly'
});
function initialState(){return {step:'briefing',completed:false,mistakes:0,feedback:'Review workshop safety before inspecting the tire.'};}
function transition(state,action){
  if(!state || !STEPS.includes(state.step)) state=initialState();
  if(action==='reset') return initialState();
  if(state.step==='complete') return {...state,feedback:'Inspection scenario already completed. Reset to practice again.'};
  const expected=ACTIONS[state.step];
  if(action!==expected) return {...state,mistakes:state.mistakes+1,feedback:action==='choosePatch'?'A sidewall split is not repairable in this scenario. Refer the tire for replacement.':'Complete the current safety and inspection step first.'};
  const next=STEPS[STEPS.indexOf(state.step)+1];
  const messages={inspection:'Safety acknowledged. Inspect the sidewall damage.',decision:'Visible sidewall split identified. Choose replacement, not a patch.',reassembly:'Correct: replacement by qualified personnel. Confirm simulated reassembly.',complete:'Practice mission complete. This does not certify vehicle repair skills.'};
  return {step:next,completed:next==='complete',mistakes:state.mistakes,feedback:messages[next]};
}
function restore(raw){
  try {
    const value=typeof raw==='string'?JSON.parse(raw):raw;
    if(!value || !STEPS.includes(value.step) || typeof value.mistakes!=='number' || !Number.isSafeInteger(value.mistakes) || value.mistakes<0 || typeof value.feedback!=='string')return initialState();
    return {step:value.step,completed:value.step==='complete',mistakes:value.mistakes,feedback:value.feedback.slice(0,300)};
  }catch{return initialState();}
}
const api={STEPS,ACTIONS,initialState,transition,restore,storageKey:'u1-tire-training-v1'};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(typeof window!=='undefined')window.UniverseOneTireTraining=api;
