'use strict';
// Renderer-independent 3D scene data for the introductory conceptual workshop.
// All coordinates are illustrative units, not measured equipment dimensions.
const PALETTES=Object.freeze({
 automotive:['#4b5563','#d1d5db'],plumbing:['#0e7490','#94a3b8'],
 electronics:['#334155','#22d3ee'],woodworking:['#92400e','#fbbf24']
});
function finiteVec(v){return Array.isArray(v)&&v.length===3&&v.every(Number.isFinite)}
function buildAssemblyScene(scenario){
 if(!scenario||!Array.isArray(scenario.parts)||!Array.isArray(scenario.steps))throw Error('Invalid scene scenario');
 const ids=new Set();
 const colors=PALETTES[scenario.domain]||PALETTES.automotive;
 const objects=scenario.parts.map((part,i)=>{
  if(!part||typeof part.id!=='string'||!part.id||ids.has(part.id))throw Error('Invalid scene part');
  ids.add(part.id);
  const isFastener=part.id==='fastener';
  const position=isFastener?[0,0.3,0.28]:[0,0,0];
  const removedPosition=isFastener?[0,0.85,0.7]:[0.8,0.15,0];
  const scale=isFastener?[0.16,0.16,0.28]:[1.6,0.25,1.1];
  return {id:part.id,primitive:isFastener?'cylinder':'box',material:{color:colors[i%colors.length],roughness:0.55},position,homePosition:[...position],removedPosition,scale,selectable:true};
 });
 for(const o of objects)if(!finiteVec(o.position)||!finiteVec(o.removedPosition)||!finiteVec(o.scale))throw Error('Invalid scene geometry');
 return {schemaVersion:1,scenarioId:scenario.id||'conceptual',units:'illustrative',verifiedDimensions:false,objects,camera:{position:[2.8,2.3,3.4],target:[0,0,0]},lighting:{ambient:0.75,key:1.1},notice:'Conceptual geometry only. Not an accurate model of a specific machine or assembly.'};
}
function sceneAtSnapshot(scene,snapshot){
 if(!scene||!Array.isArray(scene.objects)||!snapshot||!Array.isArray(snapshot.parts))throw Error('Invalid scene state');
 const states=new Map(snapshot.parts.map(p=>[p.id,p.installed]));
 return {...scene,objects:scene.objects.map(o=>{
  if(!states.has(o.id)||typeof states.get(o.id)!=='boolean')throw Error('Missing part state');
  const installed=states.get(o.id);
  return {...o,installed,position:[...(installed?o.homePosition:o.removedPosition)]};
 })};
}
module.exports={buildAssemblyScene,sceneAtSnapshot};
