'use strict';
// Simulation-authoritative component interaction; rendering and controls are adapters.
// Distances are game units; this is not a certified physical model.
const MAX_REACH=2.4;
const components=Object.freeze({
battery:{position:[0,1,0],mass:16,tool:'scanner',prerequisites:[]},
negative_terminal:{position:[.2,1.1,0],mass:.15,tool:'wrench',prerequisites:['battery_inspected']},
positive_terminal:{position:[-.2,1.1,0],mass:.15,tool:'wrench',prerequisites:['isolated']},
fuse_box:{position:[.7,1,.4],mass:1.2,tool:'scanner',prerequisites:[]}
});
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
function initialWorld(){return {revision:0,players:{},components:Object.fromEntries(Object.keys(components).map(id=>[id,{removed:false,owner:null}])),flags:{battery_inspected:false,isolated:false},events:[]}}
function addPlayer(world,id,position=[0,1,1]){if(!/^[a-z0-9_-]{1,32}$/i.test(id)||!Array.isArray(position)||position.length!==3||!position.every(Number.isFinite))throw Error('Invalid player');return {...world,players:{...world.players,[id]:{position,held:null}},revision:world.revision+1}}
function movePlayer(world,id,position){const player=world?.players?.[id];if(!player||!Array.isArray(position)||position.length!==3||!position.every(Number.isFinite))return {ok:false,reason:'Invalid movement',world};if(distance(player.position,position)>1.5||position.some(n=>Math.abs(n)>40))return {ok:false,reason:'Movement exceeds allowed distance',world};return {ok:true,world:{...world,revision:world.revision+1,players:{...world.players,[id]:{...player,position:[...position]}}}}}
function interact(world,command){const {playerId,partId,tool,action}=command||{};const player=world?.players?.[playerId],part=world?.components?.[partId],spec=components[partId];if(!player||!part||!spec)return {ok:false,reason:'Unknown player or component',world};if(!['inspect','remove','release'].includes(action))return {ok:false,reason:'Unknown interaction',world};if(distance(player.position,spec.position)>MAX_REACH)return {ok:false,reason:'Move closer to the component',world};if(action==='remove'&&tool!==spec.tool)return {ok:false,reason:'Incorrect tool',world};if(action==='remove'&&spec.prerequisites.some(k=>!world.flags[k]))return {ok:false,reason:'Complete the safety prerequisite first',world};if(action==='remove'&&(part.owner&&part.owner!==playerId))return {ok:false,reason:'Another learner is using this component',world};if(action==='remove'&&part.removed)return {ok:false,reason:'Component already removed',world};const next={...world,revision:world.revision+1,components:{...world.components,[partId]:{...part}},players:{...world.players,[playerId]:{...player}},flags:{...world.flags},events:[...world.events]};
if(action==='inspect'&&partId==='battery')next.flags.battery_inspected=true;
if(action==='remove'){next.components[partId].removed=true;next.components[partId].owner=playerId;next.players[playerId].held=partId;if(partId==='negative_terminal')next.flags.isolated=true}
if(action==='release'&&part.owner===playerId){next.components[partId].owner=null;next.players[playerId].held=null}
next.events.push({playerId,partId,action,revision:next.revision});return {ok:true,world:next}}
module.exports={components,initialWorld,addPlayer,movePlayer,interact};
