const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'..','index.html'),'utf8');
test('saved quiz progress rejects null, arrays and primitives',()=>{
  const match=html.match(/let done=\{\};try\{const saved=JSON\.parse\(localStorage\.getItem\('universe-one-progress'\)\|\|'\{\}'\);if\(saved&&typeof saved==='object'&&!Array\.isArray\(saved\)\)done=saved\}catch\{\};/);
  assert.ok(match,'progress parser guard must exist');
  for(const [stored,expected] of [['null',{}],['[]',{}],['true',{}],['42',{}],['{"earth":true}',{earth:true}],['{broken',{}]]){
    const context={localStorage:{getItem:()=>stored}};
    vm.runInNewContext(match[0]+';globalThis.result=JSON.stringify(done)',context);
    assert.deepEqual(JSON.parse(context.result),expected);
  }
});
