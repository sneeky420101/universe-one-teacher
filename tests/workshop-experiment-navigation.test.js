const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','life-workshops-3d.html'),'utf8');
test('experiment values are keyed per workshop and station',()=>{
 assert.ok(html.includes('experimentValues={}'));
 assert.ok(html.includes('experimentValues[key]??config.initial'));
 assert.ok(html.includes('experimentValues[id]=v'));
});
test('slider input updates current station state',()=>{
 assert.ok(html.includes("const key=$('workshop').value+':'+selected;const value=Number("));
});
