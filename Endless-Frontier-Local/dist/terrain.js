export const CHUNK=640,CELL=20,RUNWAY_RISE=.5;
export const BIOMES=['Green meadows','Patchwork farms','Pine country','Alpine passes','Redrock canyon','River wetlands','Coastal islands','Metropolitan skyline'];
const COLORS=[['#749563','#596e50'],['#8e9c5e','#77764e'],['#526b4b','#4e6048'],['#949d8b','#697466'],['#bb855e','#8f644d'],['#6b8a68','#557567'],['#b3b28a','#8a9379'],['#7c8777','#596963']];
let seed=18273,originX=0,originZ=0;
export const craters=[];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),smooth=t=>t*t*(3-2*t);
export function hash(x,z,s=seed){let n=Math.imul(x|0,374761393)^Math.imul(z|0,668265263)^s;n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967296;}
export function random(s){let n=s>>>0;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
function noise(x,z){let ix=Math.floor(x),iz=Math.floor(z),fx=smooth(x-ix),fz=smooth(z-iz);return (hash(ix,iz)*(1-fx)+hash(ix+1,iz)*fx)*(1-fz)+(hash(ix,iz+1)*(1-fx)+hash(ix+1,iz+1)*fx)*fz;}
export function biomeAt(x,z){return ((Math.floor((z+500)/1500)+Math.floor(seed/71))%8+8)%8;}
function biomeHeight(type,x,z){const n=noise(x/720,z/740),small=noise(x/190,z/220),valley=Math.abs(Math.sin(x*.0018+Math.sin(z*.0007)*.45));switch(type){case 0:return 35+n*85+small*18;case 1:return 30+n*38+small*8;case 2:return 45+n*155+small*25;case 3:return 65+valley**1.4*(240+n*450)+small*32;case 4:return 40+valley**.45*(80+n*180)+small*25;case 5:return 8+n*34+small*8-Math.exp(-(((x-Math.sin(z*.001)*260)/125)**2))*60;case 6:return 90*Math.sin(x*.002+z*.0007)+n*65-38;case 7:return 38+n*18;}}
function baseHeight(x,z){const section=(z+500)/1500,i=Math.floor(section),t=section-i,b=biomeAt(x,z),next=(b+1)%8,blend=smooth(clamp((t-.7)/.3,0,1));return biomeHeight(b,x,z)*(1-blend)+biomeHeight(next,x,z)*blend;}
export function stripInfo(globalZ){const id=Math.round((globalZ-300)/2400),z=id*2400+300,x=Math.sin(id*2.31)*300,height=Math.floor(Math.max(12,baseHeight(x,z))/4)*4;return{id,x,z,height};}
export function heightGlobal(x,z){let h=baseHeight(x,z);const a=stripInfo(z),d=Math.max(Math.abs(x-a.x)/70,Math.abs(z-a.z)/340),blend=smooth(clamp((d-1)/.8,0,1));h=a.height*(1-blend)+h*blend;return Math.floor(h/4)*4;}
function cellHasDamage(x,z){const bx=Math.floor(x/CELL)*CELL,bz=Math.floor(z/CELL)*CELL;return craters.some(c=>Math.hypot(Math.max(bx-c.x,0,c.x-bx-CELL),Math.max(bz-c.z,0,c.z-bz-CELL))<c.radius*1.24+2);}
export function onRunway(x,z){const a=stripInfo(z);return Math.abs(x-a.x)<=22&&Math.abs(z-a.z)<=285;}
function craterDelta(x,z){let delta=0;for(const c of craters){if(c.repairRunway&&onRunway(x,z))continue;const d=Math.hypot(x-c.x,z-c.z)/c.radius;if(d<1)delta-=c.depth*Math.pow(1-d*d,1.35);else if(d<1.22)delta+=Math.sin((d-1)/.22*Math.PI)*Math.min(1.8,c.depth*.17);}return delta;}
export function excavated(x,z,pad=0){return craters.some(c=>!(c.repairRunway&&onRunway(x,z))&&Math.hypot(x-c.x,z-c.z)<c.radius*1.24+pad);}
function terrainGlobal(x,z){const bx=Math.floor(x/CELL)*CELL+CELL/2,bz=Math.floor(z/CELL)*CELL+CELL/2,base=heightGlobal(bx,bz);if(!cellHasDamage(x,z))return base;const sx=Math.floor(x/2)*2+1,sz=Math.floor(z/2)*2+1;return Math.floor((base+craterDelta(sx,sz))*4)/4;}
export function groundHeight(x,z){const gx=x+originX,gz=z+originZ,a=stripInfo(gz);if(onRunway(gx,gz)&&!excavated(gx,gz,1.5))return a.height+RUNWAY_RISE;return terrainGlobal(gx,gz);}
export function terrainHeight(x,z){return groundHeight(x,z);}
export function configureWorld(s,ox=0,oz=0){seed=s;originX=ox;originZ=oz;}

const rgb=hex=>({r:parseInt(hex.slice(1,3),16)/255,g:parseInt(hex.slice(3,5),16)/255,b:parseInt(hex.slice(5,7),16)/255});
export function buildTerrainBuffers(cx,cz){const steps=terrainBufferSteps(cx,cz);for(;;){const step=steps.next();if(step.done)return step.value;}}
export function* terrainBufferSteps(cx,cz){const gx=cx*CHUNK,gz=cz*CHUNK,biome=biomeAt(gx+320,gz+320),cols=COLORS[biome].map(c=>rgb(c)),soil=rgb(biome===4?'#80503c':'#685344'),char=rgb('#39372f'),ps=[],ns=[],cs=[],ix=[];
  const face=(vs,n,col,shade)=>{const i=ps.length/3;for(const v of vs){ps.push(...v);ns.push(...n);cs.push(col.r*shade,col.g*shade,col.b*shade,1);}ix.push(i,i+1,i+2,i,i+2,i+3);};
  for(let bx=0;bx<CHUNK;bx+=CELL){for(let bz=0;bz<CHUNK;bz+=CELL){const size=cellHasDamage(gx+bx+10,gz+bz+10)?2:CELL;for(let x=bx;x<bx+CELL;x+=size)for(let z=bz;z<bz+CELL;z+=size){const wx=gx+x+size/2,wz=gz+z+size/2,h=terrainGlobal(wx,wz);if(h<-.25)continue;const damaged=excavated(wx,wz),delta=craterDelta(wx,wz),col=damaged?(delta< -2?soil:char):h>480?rgb('#d8dfcf'):h<5?rgb('#b5b58d'):cols[0],sideCol=damaged?soil:cols[1],shade=.92+hash(Math.floor(wx/2),Math.floor(wz/2))*.12;
   face([[x,h,z],[x,h,z+size],[x+size,h,z+size],[x+size,h,z]],[0,1,0],col,shade);
   for(const[dx,dz]of[[-size,0],[size,0],[0,-size],[0,size]]){const nh=Math.max(-4,terrainGlobal(wx+dx,wz+dz));if(nh>=h)continue;if(dx<0)face([[x,nh,z],[x,nh,z+size],[x,h,z+size],[x,h,z]],[-1,0,0],sideCol,shade);if(dx>0)face([[x+size,nh,z+size],[x+size,nh,z],[x+size,h,z],[x+size,h,z+size]],[1,0,0],sideCol,shade);if(dz<0)face([[x+size,nh,z],[x,nh,z],[x,h,z],[x+size,h,z]],[0,0,-1],sideCol,shade);if(dz>0)face([[x,nh,z+size],[x+size,nh,z+size],[x+size,h,z+size],[x,h,z+size]],[0,0,1],sideCol,shade);}
  }}yield;
 }
 return{positions:new Float32Array(ps),normals:new Float32Array(ns),colors:new Float32Array(cs),indices:new Uint32Array(ix)};
}
