'use strict';
const crypto=require('node:crypto');
const rooms=new Map();
const MAX_PLAYERS=24, MAX_ROOMS=100, MAX_BODY=4096;
const clean=(s,n=48)=>typeof s==='string'?s.trim().slice(0,n):'';
const token=()=>crypto.randomBytes(18).toString('hex');
function publicState(r){return {id:r.id,lesson:r.lesson,revision:r.revision,phase:r.phase,participants:[...r.players.values()].map(p=>({id:p.id,name:p.name,role:p.role,ready:p.ready})),completed:[...r.completed],locked:r.locked};}
function broadcast(r){const msg='data: '+JSON.stringify(publicState(r))+'\n\n';for(const res of r.listeners){try{res.write(msg)}catch{r.listeners.delete(res)}}}
function reply(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data))}
async function body(req){let str='';for await(const chunk of req){str+=chunk;if(str.length>MAX_BODY)throw Error('Payload too large')}return JSON.parse(str||'{}')}
function lookup(data){const r=rooms.get(clean(data.room,16).toUpperCase());const p=r?.players.get(clean(data.token,64));if(!r||!p)throw Error('Invalid room credentials');return {r,p}}
function create(data){if(rooms.size>=MAX_ROOMS)throw Error('Room capacity reached');const id=crypto.randomBytes(4).toString('hex').toUpperCase();const t=token();const r={id,lesson:'automotive-electrical',revision:0,phase:'lobby',players:new Map(),completed:new Set(),locked:false,listeners:new Set(),created:Date.now()};r.players.set(t,{id:token().slice(0,8),name:clean(data.name)||'Instructor',role:'teacher',ready:false});rooms.set(id,r);return {room:id,token:t,role:'teacher',participantId:r.players.get(t).id,state:publicState(r)}}
function join(data){const r=rooms.get(clean(data.room,16).toUpperCase());if(!r)throw Error('Room not found');if(r.locked||r.players.size>=MAX_PLAYERS)throw Error('Room closed or full');const t=token();r.players.set(t,{id:token().slice(0,8),name:clean(data.name)||'Learner',role:'student',ready:false});r.revision++;broadcast(r);return {room:r.id,token:t,role:'student',participantId:r.players.get(t).id,state:publicState(r)}}
const steps=['inspect','isolate','replace','verify'];
function action(data){const {r,p}=lookup(data);const type=clean(data.action,32);if(type==='ready'){p.ready=!!data.value}
else if(type==='start'||type==='reset'||type==='lock'){if(p.role!=='teacher')throw Error('Teacher permission required');if(type==='start'){r.phase='active';r.completed.clear()}if(type==='reset'){r.phase='lobby';r.completed.clear();for(const player of r.players.values())player.ready=false}if(type==='lock')r.locked=!!data.value}
else if(type==='complete'){if(r.phase!=='active')throw Error('Lesson not active');const step=clean(data.step,24);if(!steps.includes(step))throw Error('Unknown step');const index=steps.indexOf(step);if(index>0&&!r.completed.has(steps[index-1]))throw Error('Prerequisite incomplete');r.completed.add(step);if(r.completed.size===steps.length)r.phase='complete'}
else throw Error('Unknown action');
r.revision++;broadcast(r);return {state:publicState(r)}}
function handle(req,res){const url=new URL(req.url,'http://localhost');if(!url.pathname.startsWith('/api/classroom/'))return false;
const route=url.pathname.slice('/api/classroom/'.length);if(route==='events'&&req.method==='GET'){try{const {r}=lookup({room:url.searchParams.get('room'),token:url.searchParams.get('token')});res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-store','Connection':'keep-alive','X-Accel-Buffering':'no'});r.listeners.add(res);res.write('data: '+JSON.stringify(publicState(r))+'\n\n');req.on('close',()=>r.listeners.delete(res))}catch(e){reply(res,403,{error:e.message})}return true}
if(req.method!=='POST'){reply(res,405,{error:'Method not allowed'});return true}
(async()=>{try{const data=await body(req);const out=route==='create'?create(data):route==='join'?join(data):route==='action'?action(data):null;if(!out)return reply(res,404,{error:'Not found'});reply(res,200,out)}catch(e){reply(res,400,{error:e.message})}})();return true}
module.exports={handle,create,join,action,publicState,rooms};
