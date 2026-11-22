const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const pages=['index.html','play.html','life-workshops-3d.html','hands-on-lab.html','quest.html','metaverse.html','3d-campus.html','trades-campus.html','workshop-3d.html','learning-quest.html','college.html','engineering-lab.html','tutorial.html','privacy.html','global.html','pathways.html','campus.html'];
for(const page of pages){test('inline browser scripts parse: '+page,()=>{const html=fs.readFileSync(path.join(root,page),'utf8');const scripts=[...html.matchAll(/<script\\b([^>]*)>([\\s\\S]*?)<\\/script>/gi)];for(let i=0;i<scripts.length;i++){const attrs=scripts[i][1];if(/\\bsrc\\s*=/.test(attrs)||/\\btype\\s*=\\s*['\"](?:application\\/json|importmap)['\"]/.test(attrs))continue;const code=scripts[i][2];if(!code.trim())continue;assert.doesNotThrow(()=>new vm.Script(code,{filename:page+':inline-'+i}),page+':inline-'+i)}})}
