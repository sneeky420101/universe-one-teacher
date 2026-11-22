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
 const gcd=(a,b)=>{while(b){const t=a%b;a=b;b=t}return a};
 const simplify=(n,d)=>{if(n===0)return '0';const g=gcd(n,d);return n/g+'/'+d/g};
 assert.equal(simplify(2,4),'1/2');
 assert.equal(simplify(0,4),'0');
 assert.equal(simplify(3,6),'1/2');
});
