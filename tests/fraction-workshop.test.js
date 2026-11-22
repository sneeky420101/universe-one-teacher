'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const page=fs.readFileSync(path.join(root,'fraction-workshop.html'),'utf8');
test('fraction workshop is linked from learning quest',()=>{
 assert.match(fs.readFileSync(path.join(root,'learning-quest.html'),'utf8'),/href="\.\/fraction-workshop\.html"/);
});
test('fraction workshop has actual manipulative controls and accessible pieces',()=>{
 for(const id of ['denominator','bar','clear','fill','check','new','feedback','score'])assert.ok(page.includes('id="'+id+'"'),id);
 assert.match(page,/aria-pressed/);
 assert.match(page,/selected\.has\(i\)/);
 assert.match(page,/selected\.size===target/);
});
test('fraction workshop script parses and simplifies fractions correctly',()=>{
 const match=page.match(/<script>([\s\S]*?)<\/script>/);
 assert.ok(match);
 new vm.Script(match[1]);
 const context=vm.createContext({});
 vm.runInContext(match[1].slice(0,match[1].indexOf('newChallenge();')),{
 ...context,
 document:{getElementById(){return {}}}
 });
});
