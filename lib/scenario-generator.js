'use strict';
const {createWorkshop}=require('./workshop-engine');
const CATALOG=Object.freeze({
 automotive:{title:'Automotive: inspect and rebuild a bolted cover',keywords:['car','automotive','engine','oil','tire','motorcycle'],tool:'socket'},
 plumbing:{title:'Plumbing: inspect and reassemble a pipe fitting',keywords:['pipe','plumbing','faucet','water','valve'],tool:'wrench'},
 electronics:{title:'Electronics: inspect and reassemble a device enclosure',keywords:['electronics','circuit','computer','radio','battery'],tool:'screwdriver'},
 woodworking:{title:'Woodworking: inspect and reassemble a wooden joint',keywords:['wood','carpentry','furniture','cabinet'],tool:'screwdriver'}
});
function buildScenario(request){
 if(typeof request!=='string'||request.trim().length<8||request.length>500) return {ok:false,reason:'invalid-request'};
 const query=request.toLowerCase();
 const matches=Object.entries(CATALOG).map(([id,c])=>({id,score:c.keywords.filter(w=>new RegExp('\\b'+w+'\\b','i').test(query)).length})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
 if(!matches.length)return {ok:false,reason:'unsupported-topic',hint:'Try automotive, plumbing, electronics or woodworking.'};
 const domain=matches[0].id, c=CATALOG[domain];
 const steps=[
 {id:'inspect',part:'fastener',action:'inspect'},
 {id:'remove-fastener',part:'fastener',action:'remove',tool:c.tool,requires:['inspect']},
 {id:'remove-cover',part:'cover',action:'remove',requires:['remove-fastener']},
 {id:'inspect-cover',part:'cover',action:'inspect',requires:['remove-cover']},
 {id:'install-cover',part:'cover',action:'install',requires:['inspect-cover']},
 {id:'install-fastener',part:'fastener',action:'install',tool:c.tool,requires:['install-cover']}
 ];
 return {ok:true,scenario:{id:'intro-'+domain,domain,title:c.title,requestedTopic:request.trim(),fidelity:'procedural-prototype',verifiedForRealWorldRepair:false,parts:[{id:'fastener'},{id:'cover'}],steps,notice:'Illustrative educational procedure only. Not vehicle-, building-, or equipment-specific instructions.'}};
}
function createRequestedWorkshop(request){
 const result=buildScenario(request);
 return result.ok?{...result,workshop:createWorkshop(result.scenario)}:result;
}
module.exports={buildScenario,createRequestedWorkshop};
