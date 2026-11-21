#!/usr/bin/env node
// Conservative tracked-file audit. Not a substitute for history/host secret scanning.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
const result=cp.spawnSync('git',['ls-files','-z'],{cwd:root,encoding:'buffer'});
if(result.status!==0){console.error('Cannot enumerate tracked files');process.exit(2)}
const tracked=result.stdout.toString('utf8').split('\0').filter(Boolean);
const riskyName=/(^|\/)(\.env(?:\.|$)|google-services\.json$|local\.properties$|[^/]*(?:secret|credentials|service-account)[^/]*\.json$)|\.(?:jks|keystore|p12|pfx|pem|key)$/i;
const patterns=[
 ['private key',/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
 ['GitHub token',/gh[pousr]_[A-Za-z0-9_]{25,}/],
 ['Google API key',/AIza[0-9A-Za-z_-]{35}/],
 ['AWS access key',/AKIA[0-9A-Z]{16}/]
];
let errors=0;
for(const file of tracked){
 if(riskyName.test(file)){console.error('BLOCKED tracked sensitive filename: '+file);errors++}
 const full=path.join(root,file);
 if(!fs.existsSync(full)||!fs.statSync(full).isFile()||fs.statSync(full).size>1024*1024)continue;
 const data=fs.readFileSync(full,'utf8');
 // Exclude this audit's own pattern definitions to avoid self-matches.
 if(file==='scripts/security-audit.js')continue;
 for(const [label,re] of patterns)if(re.test(data)){console.error('BLOCKED possible '+label+' in '+file);errors++}
}
console.log(errors?'Security audit failed ('+errors+' finding(s))':'Tracked-file security audit passed ('+tracked.length+' paths scanned)');
process.exitCode=errors?1:0;
