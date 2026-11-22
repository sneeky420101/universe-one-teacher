// VOLTFRAME Studios — catch malformed inline JavaScript before device builds.
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const pages=['index.html','play.html','hands-on-lab.html','quest.html','metaverse.html','3d-campus.html','trades-campus.html','workshop-3d.html','learning-quest.html','college.html','engineering-lab.html','tutorial.html','privacy.html','global.html','pathways.html','campus.html'];
test('inline classroom scripts parse without syntax errors',()=>{
  for(const page of pages){
    const html=fs.readFileSync(path.join(root,page),'utf8');
    let index=0;
    for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){
      const attrs=match[1];
      if(/\bsrc\s*=/.test(attrs)||/\btype\s*=\s*["'](?:application\/json|importmap)["']/i.test(attrs))continue;
      if(!match[2].trim())continue;
      assert.doesNotThrow(()=>new vm.Script(match[2],{filename:page+'#inline-'+(++index)}),'JavaScript syntax error in '+page);
    }
  }
});
