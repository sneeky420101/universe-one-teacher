// Copyright © 2026 Brandon Hastings, War Bolt Frame Studios.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const index=fs.readFileSync('index.html','utf8');
const quest=fs.readFileSync('quest.html','utf8');
test('all 12 grade labels generated',()=>assert.match(index,/Array\.from\(\{length:12\}/));
test('college and adult tracks selectable',()=>{assert.match(index,/College/);assert.match(index,/Adult \/ GED/)});
test('Quest XR requests immersive-vr',()=>assert.match(quest,/requestSession\('immersive-vr'/));
test('Quest uses XR viewer pose',()=>assert.match(quest,/getViewerPose\(refSpace\)/));
test('Quest provides non-VR fallback',()=>assert.match(quest,/desktopPreview\(\)/));
test('copyright notice',()=>{assert.match(index,/Brandon Hastings/);assert.match(quest,/War Bolt Frame Studios/)});
test('no client-side secrets',()=>{for(const html of [index,quest])assert.doesNotMatch(html,/-----BEGIN PRIVATE KEY-----|sk_live_[a-zA-Z0-9]{12}/)});
