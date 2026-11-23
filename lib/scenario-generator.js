'use strict';
const {createWorkshop}=require('./workshop-engine');
const CATALOG=Object.freeze({
 automotive:{title:'Automotive: inspect and rebuild a bolted cover',keywords:['car','automotive','engine','oil','tire','motorcycle'],tool:'socket'},
 plumbing:{title:'Plumbing: inspect and reassemble a pipe fitting',keywords:['pipe','plumbing','faucet','water','valve'],tool:'wrench'},
 electronics:{title:'Electronics: inspect and reassemble a device enclosure',keywords:['electronics','circuit','computer','radio','battery'],tool:'screwdriver'},
 woodworking:{title:'Woodworking: inspect and reassemble a wooden joint',keywords:['wood','carpentry','furniture','cabinet'],tool:'screwdriver'}
});
// A catalog of conceptual assembly themes, not certified real-world procedures.
// Each theme reuses the six-step virtual fastener/cover interaction until
// equipment-specific 3D assets and reviewed instructions are available.
const THEMES=Object.freeze({
 automotive:['engine cover','wheel hub','brake housing','transmission casing','radiator shroud','alternator mount','dashboard panel','air filter enclosure','suspension bracket','battery tray'],
 plumbing:['faucet body','pipe coupling','valve housing','sink trap','pump casing','filter housing','manifold cover','fixture mount','drain fitting','water meter housing'],
 electronics:['computer case','circuit enclosure','sensor housing','radio casing','control panel','battery compartment','keyboard frame','speaker enclosure','network switch case','power supply cover'],
 woodworking:['cabinet hinge','drawer slide','table joint','chair bracket','shelf support','door hardware','wooden frame','workbench fitting','storage box','furniture connector']
});
const MODES=Object.freeze(['inspection','disassembly','reassembly','maintenance','manufacturing overview']);
function listScenarioCatalog(){
 return {domains:Object.keys(CATALOG),themes:THEMES,modes:MODES,conceptualCombinations:Object.values(THEMES).reduce((n,a)=>n+a.length,0)*MODES.length,verifiedRealWorldProcedures:0};
}
function chooseTheme(domain,query){
 const themes=THEMES[domain];
 return themes.find(theme=>query.includes(theme))||themes[0];
}
function buildScenario(request){
 if(typeof request!=='string'||request.trim().length<8||request.length>500) return {ok:false,reason:'invalid-request'};
 const query=request.toLowerCase();
 const matches=Object.entries(CATALOG).map(([id,c])=>({id,score:c.keywords.filter(w=>new RegExp('\\b'+w+'\\b','i').test(query)).length})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
 if(!matches.length)return {ok:false,reason:'unsupported-topic',hint:'Try automotive, plumbing, electronics or woodworking.'};
 const domain=matches[0].id, c=CATALOG[domain];
 const theme=chooseTheme(domain,query);
 const mode=MODES.find(m=>query.includes(m))||'inspection';
 const steps=[
 {id:'inspect',part:'fastener',action:'inspect'},
 {id:'remove-fastener',part:'fastener',action:'remove',tool:c.tool,requires:['inspect']},
 {id:'remove-cover',part:'cover',action:'remove',requires:['remove-fastener']},
 {id:'inspect-cover',part:'cover',action:'inspect',requires:['remove-cover']},
 {id:'install-cover',part:'cover',action:'install',requires:['inspect-cover']},
 {id:'install-fastener',part:'fastener',action:'install',tool:c.tool,requires:['install-cover']}
 ];
 return {ok:true,scenario:{id:'intro-'+domain+'-'+THEMES[domain].indexOf(theme)+'-'+MODES.indexOf(mode),domain,theme,mode,title:c.title+' — '+theme+' ('+mode+')',requestedTopic:request.trim(),fidelity:'procedural-prototype',verifiedForRealWorldRepair:false,parts:[{id:'fastener'},{id:'cover'}],steps,notice:'Illustrative educational procedure only. Not vehicle-, building-, or equipment-specific instructions.'}};
}
function createRequestedWorkshop(request){
 const result=buildScenario(request);
 return result.ok?{...result,workshop:createWorkshop(result.scenario)}:result;
}
module.exports={buildScenario,createRequestedWorkshop,listScenarioCatalog};
