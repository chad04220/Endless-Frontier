import{FLEET_BALANCE,STANDARD_GAIN,ratedMach}from'./balance.js?v=balance-8';
import{MODULES,moduleFor,activeModule}from'./equipment.js?v=balance-8';
import{SPECS,AIRCRAFT_TYPES}from'./aircraft.js?v=balance-8';
export const REWARDS={metresPerCredit:5,birdPass:60,aircraftPass:150,landingFlat:750,landingMultiplier:1,landingMinimumDistance:500,lowCeiling:80,lowFullHeight:5,lowMaxPerSecond:20};
export function lowFlightRate(agl){if(!Number.isFinite(agl))return 0;const proximity=Math.max(0,Math.min(1,(REWARDS.lowCeiling-Math.max(0,agl))/(REWARDS.lowCeiling-REWARDS.lowFullHeight)));return REWARDS.lowMaxPerSecond*proximity**1.35;}
export const AIRCRAFT_PRICE={prop:0,swift:1700,jet:2500,ufo:15000};
export const UPGRADES=[
 {id:'fuel',name:'Extended fuel tanks',description:'+10% fuel capacity per level',base:150,icon:'01'},
 {id:'efficiency',name:'Fuel injection',description:'4% less fuel burned per level',base:190,icon:'02'},
 {id:'engine',name:'Engine tuning',description:'+8% thrust and power per level',base:210,icon:'03'},
 {id:'aero',name:'Aerodynamic kit',description:'4% less drag per level',base:170,icon:'04'},
 {id:'controls',name:'Flight controls',description:'+6% control authority per level',base:160,icon:'05'},
 {id:'weight',name:'Lightweight airframe',description:'3% less mass per level',base:230,icon:'06'}
];
const KEY='endless-frontier-save-v1',MAX_LEVEL=5;
export class Progression{
 constructor(storage){this.storage=storage;this.saveFailed=false;const table=()=>Object.fromEntries(AIRCRAFT_TYPES.map(t=>[t,{}]));this.data={version:1,bank:0,best:0,runs:0,nearMisses:0,owned:Object.fromEntries(AIRCRAFT_TYPES.map(t=>[t,t==='prop'])),upgrades:table(),equippedLevels:table(),modules:table(),moduleEquipped:table(),settled:[]};try{const raw=JSON.parse(storage?.getItem(KEY)||'null');if(raw&&raw.version===1){for(const k of['bank','best','runs','nearMisses'])this.data[k]=Number.isFinite(raw[k])?Math.max(0,Math.min(1e9,Math.floor(raw[k]))):0;for(const type of AIRCRAFT_TYPES){this.data.owned[type]=type==='prop'||raw.owned?.[type]===true;for(const u of UPGRADES){const level=Math.max(0,Math.min(MAX_LEVEL,Math.floor(Number(raw.upgrades?.[type]?.[u.id])||0)));this.data.upgrades[type][u.id]=level;const installed=raw.equippedLevels?.[type]?.[u.id];this.data.equippedLevels[type][u.id]=Number.isFinite(installed)?Math.max(0,Math.min(level,Math.floor(installed))):level;}for(const m of MODULES[type]){this.data.modules[type][m.id]=raw.modules?.[type]?.[m.id]===true;if(this.data.modules[type][m.id]&&raw.moduleEquipped?.[type]?.[m.slot]===m.id)this.data.moduleEquipped[type][m.slot]=m.id;}}this.data.settled=Array.isArray(raw.settled)?raw.settled.filter(v=>typeof v==='string').slice(-30):[];}}catch{this.saveFailed=true;}}
 owns(type){return AIRCRAFT_TYPES.includes(type)&&this.data.owned[type]===true;}
 purchaseAircraft(type){const cost=AIRCRAFT_PRICE[type];if(!AIRCRAFT_TYPES.includes(type)||this.owns(type)||this.data.bank<cost)return false;this.data.bank-=cost;this.data.owned[type]=true;this.save();return true;}
 addBank(amount){if(!Number.isFinite(amount)||amount<=0)return false;this.data.bank=Math.min(1e9,this.data.bank+Math.floor(amount));this.save();return true;}
 level(type,id){return this.data.upgrades[type]?.[id]||0;}
 installedLevel(type,id){return this.data.equippedLevels[type]?.[id]??this.level(type,id);}
 equipLevel(type,id,level){if(!this.owns(type)||!UPGRADES.some(u=>u.id===id)||!Number.isInteger(level)||level<0||level>this.level(type,id))return false;this.data.equippedLevels[type][id]=level;delete this.data.moduleEquipped[type][id];this.save();return true;}
 cost(type,id){const u=UPGRADES.find(v=>v.id===id);if(!u)return Infinity;return Math.round(u.base*FLEET_BALANCE[type].priceScale*1.55**this.level(type,id)/10)*10;}
 buy(type,id){if(!this.owns(type)||!AIRCRAFT_TYPES.includes(type)||!UPGRADES.some(u=>u.id===id))return false;const lvl=this.level(type,id),cost=this.cost(type,id);if(lvl>=MAX_LEVEL||this.data.bank<cost)return false;this.data.bank-=cost;this.data.upgrades[type][id]=lvl+1;this.data.equippedLevels[type][id]=lvl+1;delete this.data.moduleEquipped[type][id];this.save();return true;}
 buyModule(type,id){const m=moduleFor(type,id);if(!m||!this.owns(type)||this.data.modules[type][id]||this.data.bank<m.price)return false;this.data.bank-=m.price;this.data.modules[type][id]=true;this.data.moduleEquipped[type][m.slot]=id;this.save();return true;}
 equipModule(type,id){const m=moduleFor(type,id);if(!m||!this.owns(type)||!this.data.modules[type][id])return false;if(this.data.moduleEquipped[type][m.slot]===id)delete this.data.moduleEquipped[type][m.slot];else this.data.moduleEquipped[type][m.slot]=id;this.save();return true;}
 spec(type,preview=null){const s={...SPECS[type]},choice=slot=>preview?.slot===slot?preview:{slot,level:this.installedLevel(type,slot),module:activeModule(this,type,slot)},gain=STANDARD_GAIN;
  s.fuelIdle=FLEET_BALANCE[type].fuelIdle;s.fuelRate=FLEET_BALANCE[type].fuelRate;s.fuelCapacity=100;s.fuelEfficiency=1;s.fuelBurnMultiplier=1;
  for(const slot of ['fuel','efficiency','engine','aero','controls','weight','weapons']){const c=choice(slot),n=Math.max(0,Math.min(5,c.level||0));if(c.module){for(const[k,v]of Object.entries(c.module.mods))s[k]*=v;continue;}
   if(slot==='fuel')s.fuelCapacity*=1+n*gain.fuel;if(slot==='efficiency')s.fuelEfficiency*=1-n*gain.efficiency;if(slot==='engine'){s.thrust*=1+n*gain.engine;s.power*=1+n*gain.engine;}if(slot==='aero')s.cd*=1-n*gain.aero;if(slot==='weight')s.mass*=1-n*gain.weight;if(slot==='controls')for(const k of['roll','pitch','yaw'])s[k]*=1+n*gain.controls;
  }s.maxMach=ratedMach(type,choice);return s;
 }
 settle(run,outcome){if(this.data.settled.includes(run.id))return run.result;const distance=Math.max(0,Math.floor(run.distance)),base=Math.floor(distance/REWARDS.metresPerCredit),near=Math.max(0,Math.floor(run.nearCredits)),low=Math.max(0,Math.floor(run.lowCredits||0)),combat=Math.max(0,Math.floor(run.combatCredits||0)),landing=outcome==='landed'&&distance>=REWARDS.landingMinimumDistance?REWARDS.landingFlat+Math.round((base+near+low+combat)*REWARDS.landingMultiplier):0,earned=base+near+low+combat+landing;const result={outcome,distance,base,near,low,combat,hits:run.hits||0,landing,earned,dodged:run.dodged,nearMisses:run.nearMisses,best:distance>this.data.best};this.data.bank+=earned;this.data.best=Math.max(this.data.best,distance);this.data.runs++;this.data.nearMisses+=run.nearMisses;this.data.settled.push(run.id);this.data.settled=this.data.settled.slice(-30);run.result=result;this.save();return result;}
 reset(){this.data=new Progression(null).data;this.save();}
 save(){try{if(!this.storage)throw Error('Storage unavailable');this.storage.setItem(KEY,JSON.stringify(this.data));this.saveFailed=false;}catch{this.saveFailed=true;}}
}

export class Run{
 constructor(){this.id=globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random();this.distance=0;this.nearCredits=0;this.lowCredits=0;this.lowRate=0;this.combatCredits=0;this.hits=0;this.hitTargets=new Set();this.nearMisses=0;this.dodged=0;this.seen=new Set();this.result=null;this.ended=false;this.cinematicTime=0;this.duration=0;}
 advance(globalZ,dt,flight=null){if(this.ended)return;this.distance=Math.max(this.distance,globalZ);this.duration+=dt;this.lowRate=flight&&!flight.ground&&!flight.crashed&&!flight.landed&&flight.speed>flight.stall*.85?lowFlightRate(flight.agl):0;this.lowCredits+=this.lowRate*Math.max(0,dt);}
 get flightEarnings(){return Math.floor(this.distance/REWARDS.metresPerCredit)+this.nearCredits+Math.floor(this.lowCredits)+this.combatCredits;}
 hit(event){if(this.ended||!event.value||this.hitTargets.has(event.id))return false;this.hitTargets.add(event.id);this.hits++;this.combatCredits+=event.value;return true;}
 pass(event){if(this.ended||this.seen.has(event.id))return;this.seen.add(event.id);this.dodged++;if(event.near){this.nearMisses++;this.nearCredits+=event.value;}}
 end(outcome,progression){if(this.ended)return this.result;this.ended=true;this.outcome=outcome;return progression.settle(this,outcome);}
 tickCinematic(dt){if(!this.ended)return false;this.cinematicTime+=dt;return this.cinematicTime>=(this.outcome==='crashed'?4:1.7);}
}
