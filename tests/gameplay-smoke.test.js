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
  const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
   .filter(m=>!/(?:\bsrc\s*=|\btype\s*=\s*["'](?:module|application\/json))/i.test(m[1]));
  for(const script of scripts)assert.doesNotThrow(()=>new vm.Script(script[2],{filename:name}),name+' contains invalid inline JavaScript');
 }
});

test('workshop restores validated per-tab practice counters',()=>{
 const html=read('curriculum-workshop.html');
 assert.match(html,/sessionStorage\.getItem\("universe-one-practice-v1"\)/);
 assert.match(html,/Number\.isSafeInteger\(attempts\)/);
 assert.match(html,/Number\.isSafeInteger\(correct\)/);
 assert.match(html,/correct<=attempts/);
 assert.match(html,/sessionStorage\.setItem\("universe-one-practice-v1"/);
});

test('learning quest only restores and counts recognized challenge IDs',()=>{
 const html=read('learning-quest.html');
 assert.match(html,/for\(const r of rooms\)for\(let i=0;i<r\.questions\.length;i\+\+\)/);
 assert.match(html,/if\(raw\[id\]===true\)completed\[id\]=true/);
 assert.match(html,/rooms\.reduce\(\(n,r\)=>n\+r\.questions\.filter/);
});

test('learning quest lets students retry wrong answers before advancing',()=>{
 const html=read('learning-quest.html');
 assert.match(html,/if\(right\)\{answered=true;/);
 assert.match(html,/\$\('options'\)\.children\[i\]\.disabled=true/);
 assert.match(html,/Not quite\. Try another answer\./);
 assert.match(html,/\$\('next'\)\.hidden=true/);
});

test('learning quest offers a privacy-preserving CSV progress export',()=>{
 const html=read('learning-quest.html');
 assert.match(html,/id="exportProgress"/);
 assert.match(html,/universe-one-learning-progress\.csv/);
 assert.match(html,/text\/csv;charset=utf-8/);
 assert.match(html,/\['Learning room','Completed','Total'\]/);
 assert.doesNotMatch(html,/\['Student name','Email'/);
});

test('learning quest supports accessible next-room progression',()=>{
 const html=read('learning-quest.html');
 assert.match(html,/id="nextRoom"/);
 assert.match(html,/\$\('nextRoom'\)\.onclick=/);
 assert.match(html,/room=\(room\+1\)%rooms\.length/);
 assert.match(html,/\$\('challengeTitle'\)\.focus\(\)/);
});

test('learning quest keeps mobile responsive overrides after base grid rules',()=>{
 const html=read('learning-quest.html');
 const base=html.indexOf('.room{display:grid;grid-template-columns:repeat(');
 const mobile=html.indexOf('@media(max-width:600px)');
 const narrow=html.indexOf('@media(max-width:360px)');
 assert.ok(base>=0&&mobile>base&&narrow>mobile,'responsive overrides must follow base room grid');
 assert.match(html.slice(mobile),/\.room\{grid-template-columns:1fr 1fr/);
 assert.match(html.slice(narrow),/\.room\{grid-template-columns:1fr\}/);
});
