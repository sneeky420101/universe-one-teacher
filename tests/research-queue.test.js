const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const queue=JSON.parse(fs.readFileSync('curriculum/research-queue.json','utf8'));
const {approvedRecords}=require('../curriculum/evidence-gate');
test('research queue has unique complete hands-on lessons',()=>{assert.ok(queue.items.length>=6);const ids=new Set();for(const item of queue.items){assert.ok(!ids.has(item.id));ids.add(item.id);for(const field of ['subject','level','objective','practice','primarySource'])assert.ok(typeof item[field]==='string'&&item[field].trim(),item.id+':'+field);assert.match(item.primarySource,/^https:\/\//);assert.equal(item.reviewStatus,'pending')}});
test('unreviewed research lessons never pass the factual publication gate',()=>assert.deepEqual(approvedRecords(queue.items),[]));
