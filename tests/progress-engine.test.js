const test=require('node:test');
const assert=require('node:assert/strict');
const {recordAttempt,lessonSummary,supportiveFeedback}=require('../learning/progress-engine');
test('records attempt without mutating prior state',()=>{
 const original={version:1,events:[]};
 const result=recordAttempt(original,{eventId:'a1',lessonId:'math1',status:'attempted',score:40});
 assert.equal(original.events.length,0);
 assert.deepEqual(lessonSummary(result.state,'math1'),{attempts:1,bestScore:40,mastered:false});
});
test('duplicate event is idempotent',()=>{
 const e={eventId:'a1',lessonId:'math1',status:'attempted',score:40};
 const first=recordAttempt({version:1,events:[]},e);
 const second=recordAttempt(first.state,e);
 assert.equal(second.duplicate,true);assert.equal(second.state.events.length,1);
});
test('mastery and best score survive retries',()=>{
 let state={version:1,events:[]};
 state=recordAttempt(state,{eventId:'a1',lessonId:'math1',status:'attempted',score:40}).state;
 state=recordAttempt(state,{eventId:'a2',lessonId:'math1',status:'mastered',score:90}).state;
 assert.deepEqual(lessonSummary(state,'math1'),{attempts:2,bestScore:90,mastered:true});
});
test('rejects invalid values and supplies supportive correction',()=>{
 assert.throws(()=>recordAttempt({}, {eventId:'x',lessonId:'y',status:'mastered',score:101}),RangeError);
 assert.match(supportiveFeedback(false),/try again/i);
});
