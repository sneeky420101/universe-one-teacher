const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const html=fs.readFileSync(path.join(__dirname,'..','life-workshops-3d.html'),'utf8');
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
test('all scripted UI element references resolve to real elements',()=>{for(const m of html.matchAll(/\$\('([^']+)'\)/g))assert.ok(ids.has(m[1]),'missing element '+m[1])});
test('all fixed toolbar buttons have active handlers',()=>{for(const id of ['left','right','zoomIn','zoomOut','next','readAloud','reset','stepBack','stepForward','experimentRun','experimentReset','check','retry'])assert.ok(html.includes("$('"+id+"').onclick="),'unwired button '+id)});
test('workshop selection and experiment input have change handlers',()=>{assert.ok(html.includes("$('workshop').onchange="));assert.ok(html.includes("$('experimentValue').oninput="))});
test('canvas provides pointer and keyboard interaction and cancellation',()=>{for(const event of ['pointerdown','pointerup','pointercancel','keydown'])assert.ok(html.includes("canvas.addEventListener('"+event+"'"),'missing '+event)});

test('touch controls track only the active primary pointer',()=>{for(const fragment of ['if(!e.isPrimary)return','id:e.pointerId','e.pointerId!==start.id',"canvas.addEventListener('lostpointercapture'"])assert.ok(html.includes(fragment),fragment)});
