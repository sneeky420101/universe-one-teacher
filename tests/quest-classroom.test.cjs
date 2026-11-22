'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../quest.html'),'utf8');
const source=html.split('<script>')[1].split('</script>')[0];
test('classroom script parses',()=>new vm.Script(source));
test('mission data and grading',()=>{
const elements={topic:{value:'space',selectedIndex:0},level:{value:'Grade 5'}};
const storage=new Map();
const c=vm.createContext({localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},document:{getElementById:id=>elements[id],createElement:()=>({})}});
const start=source.indexOf('const topics='),end=source.indexOf('let gl,program');
vm.runInContext("const $=id=>document.getElementById(id);function updateLesson(){};"+source.slice(start,end),c);
assert.equal(vm.runInContext('topics.length',c),6);
assert.equal(vm.runInContext('topics.every(t=>questions[t]&&facts[t]&&questions[t].answers[questions[t].correct])',c),true);
vm.runInContext('answerIndex=1;submitAnswer()',c);assert.equal(vm.runInContext('completed.size',c),0);
vm.runInContext('answerIndex=0;submitAnswer();submitAnswer()',c);assert.equal(vm.runInContext('completed.size',c),1);
assert.equal(vm.runInContext('loadProgress().has("space")',c),true);
});
