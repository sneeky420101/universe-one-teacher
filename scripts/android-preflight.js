#!/usr/bin/env node
// VOLTFRAME Studios — Android packaging preflight. Never signs or publishes.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const errors=[];
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
const required=['name','short_name','start_url','scope','display','icons'];
for(const key of required)if(!manifest[key]||(Array.isArray(manifest[key])&&!manifest[key].length))errors.push('Missing PWA manifest '+key);
if(manifest.display!=='standalone')errors.push('Standalone display required for planned web-to-Android packaging');
const icons=Array.isArray(manifest.icons)?manifest.icons:[];
for(const size of [192,512]){
  const match=icons.some(icon=>icon.type==='image/png'&&String(icon.sizes||'').split(/\s+/).includes(size+'x'+size)&&fs.existsSync(path.join(root,icon.src.replace(/^\.\//,''))));
  if(!match)errors.push('Missing '+size+'x'+size+' PNG app icon');
}
const configPath=path.join(root,'release','android.json');
let config={};
try{config=JSON.parse(fs.readFileSync(configPath,'utf8'))}catch(e){if(e.code!=='ENOENT')errors.push('Invalid release/android.json: '+e.message)}
if(!/^([a-zA-Z][a-zA-Z0-9_]*\.)+[a-zA-Z][a-zA-Z0-9_]*$/.test(config.applicationId||''))errors.push('Missing valid Android applicationId');
if(!/^https:\/\//.test(config.verifiedOrigin||''))errors.push('Missing HTTPS verifiedOrigin');
if(!/^https:\/\//.test(config.privacyPolicyUrl||''))errors.push('Missing HTTPS privacyPolicyUrl');
if(!/^\S+@\S+\.\S+$/.test(config.supportEmail||''))errors.push('Missing verified supportEmail');
if(config.digitalAssetLinksVerified!==true)errors.push('Digital Asset Links ownership verification incomplete');
if(config.physicalDeviceTestsPassed!==true)errors.push('Physical Android testing incomplete');
if(config.signedBundleVerified!==true)errors.push('Signed AAB verification incomplete');
console.log('Android/Play preflight (no build or upload)');
for(const error of errors)console.error('BLOCKED '+error);
if(errors.length){console.error('NOT READY: '+errors.length+' blocker(s)');process.exitCode=1}
else console.log('Metadata preflight passed; legal/store review and release approval still required.');
