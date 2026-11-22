'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const modes=['play.html','3d-campus.html','workshop-3d.html','quest.html','hands-on-lab.html','learning-quest.html','campus.html','engineering-lab.html'];
test('gameplay entry points contain HTML documents',()=>{
 for(const name of modes){const html=read(name);assert.match(html,/<html\b/i,name);assert.match(html,/<\/html>/i,name);assert.match(html,/<title\b/i,name)}
});
test('gameplay menu links resolve to local pages',()=>{
 const html=read('play.html');
 const links=[...html.matchAll(/href=["']\.\/([^"'#?]+\.html)["']/g)].map(m=>m[1]);
 assert.ok(links.length>=4);
 for(const link of links)assert.ok(fs.existsSync(path.join(root,link)),'broken gameplay link: '+link);
});
test('learning quest includes scoring, progress and reset controls',()=>{
 const html=read('learning-quest.html');
 for(const token of ['id="rooms"','id="options"','id="mastery"','id="stars"','id="reset"','function answer(i)','function render()'])assert.ok(html.includes(token),'missing '+token);
});
test('workshop offers tutor navigation',()=>{
 assert.match(read('curriculum-workshop.html'),/href="tutor\.html"/);
});

test('inline gameplay scripts parse as JavaScript',()=>{
 const vm=require('node:vm');
 for(const name of [...modes,'curriculum-workshop.html','tutor.html','educator-dashboard.html']){
  const html=read(name);
  const scripts=[...html.matchAll(/<script\\b([^>]*)>([\\s\\S]*?)<\\/script>/gi)]
   .filter(m=>!/(?:\\bsrc\\s*=|\\btype\\s*=\\s*["'](?:module|application\\/json))/i.test(m[1]));
  for(const script of scripts)assert.doesNotThrow(()=>new vm.Script(script[2],{filename:name}),name+' contains invalid inline JavaScript');
 }
});
