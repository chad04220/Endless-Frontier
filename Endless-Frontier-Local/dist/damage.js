const KEY='endless-frontier-damage-v1';
export const WORLD_SEED=18273;
export class DamageLedger{
 constructor(storage){this.storage=storage;this.failed=false;this.data={version:1,craters:[],destroyed:[],traffic:[],wrecks:[]};try{const raw=JSON.parse(storage?.getItem(KEY)||'null');if(raw?.version===1){const finite=v=>Number.isFinite(v)&&Math.abs(v)<1e10;this.data.craters=(raw.craters||[]).filter(c=>[c.x,c.z,c.radius,c.depth].every(finite)&&c.radius>0&&c.depth>0).map(c=>({...c,repairRunway:true}));for(const k of['destroyed','traffic'])this.data[k]=(raw[k]||[]).filter(v=>typeof v==='string');this.data.wrecks=(raw.wrecks||[]).filter(w=>[w.x,w.z,w.seed].every(finite));}}catch{this.failed=true;}}
 captureWorld(craters,destroyed){this.data.craters=craters.map(c=>({...c,repairRunway:true}));this.data.destroyed=[...destroyed];this.save();}
 destroyTraffic(id){if(id&&!this.data.traffic.includes(id)){this.data.traffic.push(id);this.save();}}
 addWreck(x,z,type){this.data.wrecks.push({x,z,type,seed:Date.now()%2147483647,id:'wreck-'+Date.now()+'-'+this.data.wrecks.length});this.save();}
 get count(){return this.data.craters.length+this.data.destroyed.length+this.data.traffic.length+this.data.wrecks.length;}
 repair(){this.data.craters=[];this.data.destroyed=[];this.data.traffic=[];this.data.wrecks=[];this.save();}
 save(){try{if(!this.storage)throw Error('No device storage');this.storage.setItem(KEY,JSON.stringify(this.data));this.failed=false;}catch{this.failed=true;}}
}
