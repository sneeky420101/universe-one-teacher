'use strict';
const crypto=require('node:crypto');
const {initialWorld,addPlayer,movePlayer,interact}=require('./shared-workshop-world');
const sessions=new Map();const MAX_SESSIONS=40;
const key=()=>crypto.randomBytes(16).toString('hex');
function snapshot(s){return {revision:s.world.revision,world:s.world,players:Object.keys(s.world.players).length}}
function create(){if(sessions.size>=MAX_SESSIONS)throw Error('World capacity reached');const id=key(),token=key(),playerId='p_'+token.slice(0,10);let world=addPlayer(initialWorld(),playerId);sessions.set(id,{world,users:new Map([[token,playerId]]),created:Date.now()});return {id,token,playerId,...snapshot(sessions.get(id))}}
function join(id){const s=sessions.get(id);if(!s)throw Error('World unavailable');if(s.users.size>=24)throw Error('World full');const token=key(),playerId='p_'+token.slice(0,10);s.world=addPlayer(s.world,playerId);s.users.set(token,playerId);return {id,token,playerId,...snapshot(s)}}
function command(id,token,data){const s=sessions.get(id),playerId=s?.users.get(token);if(!playerId)throw Error('Invalid world credentials');const result=data.action==='move'?movePlayer(s.world,playerId,data.position):interact(s.world,{playerId,partId:data.partId,tool:data.tool,action:data.action});if(result.ok)s.world=result.world;return {ok:result.ok,reason:result.reason||null,...snapshot(s)}}
function state(id,token){const s=sessions.get(id);if(!s||!s.users.has(token))throw Error('Invalid world credentials');return snapshot(s)}
function handle(req,res){const url=new URL(req.url,'http://localhost');if(url.pathname!=='/api/world')return false;const json=(status,value)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(value))};if(req.method==='GET'){try{return json(200,state(url.searchParams.get('id'),url.searchParams.get('token'))),true}catch(e){return json(403,{error:e.message}),true}}
if(req.method!=='POST')return json(405,{error:'Method not allowed'}),true;
let raw='';req.on('data',chunk=>{raw+=chunk;if(raw.length>2048)req.destroy()});req.on('end',()=>{try{const data=JSON.parse(raw||'{}');const result=data.action==='create'?create():data.action==='join'?join(data.id):command(data.id,data.token,data);json(200,result)}catch(e){json(400,{error:e.message})}});return true}
module.exports={handle,create,join,command,state,sessions};
