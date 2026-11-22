// Copyright © 2026 Brandon Hastings — VOLTFRAME Studios.
// Assert browser-facing controls have explicit accessible names and no placeholder destinations.
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const pages=['index.html','quest.html','engineering-lab.html','workshop-3d.html','college.html'];
test('critical learning pages declare mobile viewport and meaningful document titles',()=>{
  for(const page of pages){
    const html=fs.readFileSync(path.join(root,page),'utf8');
    assert.match(html,/<title>[^<\n]+<\/title>/i,'missing title in '+page);
    assert.match(html,/<meta\s+name=["']viewport["']/i,'missing viewport in '+page);
  }
});
test('no javascript pseudo-links in critical learning pages',()=>{
  for(const page of pages){
    const html=fs.readFileSync(path.join(root,page),'utf8');
    assert.doesNotMatch(html,/href\s*=\s*["']\s*javascript:/i,'unsafe pseudo-link in '+page);
  }
});
