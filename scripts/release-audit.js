#!/usr/bin/env node
// VOLTFRAME Studios release gate: fails closed until evidence is supplied.
// This is a readiness audit, not proof of Play or headset certification.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const evidencePath=path.join(root,'release','evidence.json');
const required=[
  ['automatedTests','Successful test run with workflow URL or archived log'],
  ['httpsDeployment','Verified public HTTPS origin and accessible routes'],
  ['androidDevice','Physical Android installation, offline and update checks'],
  ['questDevice','Physical Quest immersive entry, controller and exit checks'],
  ['privacyReview','Privacy and child-directed data handling review'],
  ['storeContact','Verified developer support and privacy contact'],
  ['androidBundle','Signed Android App Bundle and package ID'],
  ['playAccount','Verified Play Console account and required testing'],
  ['ownerApproval','Explicit final release approval']
];
let evidence={};
try{evidence=JSON.parse(fs.readFileSync(evidencePath,'utf8'))}catch(e){if(e.code!=='ENOENT')throw e}
const failures=[];
for(const [key,description] of required){
  const item=evidence[key];
  if(!item||item.verified!==true||typeof item.reference!=='string'||!item.reference.trim()){
    failures.push(key+': '+description);
  }
}
console.log('VOLTFRAME Teacher release audit');
if(failures.length){
  for(const failure of failures)console.log('BLOCKED '+failure);
  console.log('NOT READY: '+failures.length+' release gate(s) incomplete');
  process.exitCode=1;
}else{
  console.log('Evidence fields populated; manually validate authenticity before release.');
  console.log('READY FOR MANUAL REVIEW — not automatic publication approval');
}
