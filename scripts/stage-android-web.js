// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
// Stage an auditable static Android WebView payload. No network, signing, or publishing.
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const target=path.join(root,'build','android-web');
const pages=['index.html','play.html','hands-on-lab.html','quest.html','metaverse.html','3d-campus.html','trades-campus.html','workshop-3d.html','learning-quest.html','college.html','engineering-lab.html','tutorial.html','privacy.html','global.html','pathways.html','campus.html'];
const assets=[...pages,'manifest.webmanifest','icon.svg','sw.js','workshops/circuit-lab.js','curriculum/catalog.json','curriculum/game-stations.json','curriculum/trades-worlds.json','college/catalog.json'];
const required=new Set(assets);
for(const page of pages){
  const html=fs.readFileSync(path.join(root,page),'utf8');
  for(const match of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)){
    const url=match[1].trim();
    if(!url||url.startsWith('#')||/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(url))continue;
    const relative=url.split(/[?#]/)[0];
    if(!relative||relative==='/')continue;
    const resolved=path.resolve(relative.startsWith('/')?root:path.dirname(path.join(root,page)),relative.replace(/^\//,''));
    if(!resolved.startsWith(root+path.sep))throw Error('Unsafe asset reference: '+page+' '+url);
    const name=path.relative(root,resolved).split(path.sep).join('/');
    if(!fs.existsSync(resolved))throw Error('Missing local asset: '+page+' '+url);
    if(fs.statSync(resolved).isFile())required.add(name);
  }
}
fs.rmSync(target,{recursive:true,force:true});
fs.mkdirSync(target,{recursive:true});
const inventory=[];
for(const name of [...required].sort()){
  const src=path.join(root,name),dst=path.join(target,name);
  if(!fs.existsSync(src)||!fs.statSync(src).isFile())throw Error('Missing required payload: '+name);
  fs.mkdirSync(path.dirname(dst),{recursive:true});
  fs.copyFileSync(src,dst);
  const bytes=fs.readFileSync(dst);
  inventory.push({path:name,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
}
fs.writeFileSync(path.join(target,'asset-inventory.json'),JSON.stringify({kind:'android-web-preview',productionReady:false,assets:inventory},null,2)+'\n');
console.log('Staged '+inventory.length+' files at build/android-web (unsigned, untested, not a native Android app)');
