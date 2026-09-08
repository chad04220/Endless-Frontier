import { VoxelPart } from './voxels.js?v=balance-8';
const B=globalThis.BABYLON;
function detailEnvironment(name,p){
 if(['oak','pine','birch','palm'].includes(name)){for(let i=0;i<6;i++){const a=i*Math.PI/3,y=4+i*.6;p.rod([0,y,0],[Math.cos(a)*2.4,y+1.6,Math.sin(a)*2.4],.2,'#725441').rod([0,.6,0],[Math.cos(a)*1.6,.1,Math.sin(a)*1.6],.23,'#65513e');}for(let y=1;y<8;y+=.7)p.box(.4,y,0,.18,.35,.48,name==='birch'?'#323a31':'#896947');}
 else if(name==='cactus'){for(let y=.5;y<6.5;y+=.45)for(const side of[-1,1])p.box(side*.52,y,.1,.16,.16,.18,'#b1b579');p.box(0,6.8,0,.6,.24,.6,'#b8ab69');}
 else if(['boulder','spire','arch'].includes(name)){for(let i=0;i<7;i++){const x=Math.sin(i*2.1)*3.7,z=Math.cos(i*2.1)*2.7,r=.55+(i%3)*.23;if(name!=='arch'||Math.abs(x)>3)p.volume([x-r,x+r,0,r*1.1,z-r,z+r],(xx,y,zz)=>Math.hypot(xx-x,y,zz-z)<r?'#827863':null);}if(name==='spire')for(let y=2;y<17;y+=3.5)p.box(0,y,3.25-y*.12,Math.max(2,7-y*.23),.18,.32,'#c6926a');}
 else if(['house','cottage','barn'].includes(name)){const w=name==='barn'?15:11,d=name==='barn'?20:12,h=name==='barn'?8:6;p.box(0,.15,0,w+.6,.6,d+.6,'#827c68').box(0,.35,d/2+1,3.4,.7,2,'#b4b5a0').box(0,2.05,d/2+.6,.12,3.9,.2,'#a2a68d');for(const side of[-1,1]){for(let y=1;y<h;y+=.65)p.box(side*w/2,y,0,.16,.16,d,'#aaae95');for(const z of[-d/2,d/2]){for(const x of[-3.6,3.6])p.box(x,3.8,z+Math.sign(z)*.48,.12,1.95,.15,'ivory').box(x,3.8,z+Math.sign(z)*.48,1.95,.12,.15,'ivory').box(x,2.7,z+Math.sign(z)*.45,2.25,.22,.6,'#aaa994');}p.box(side*(w/2+.25),h+.05,0,.28,.25,d+1.5,'#5a6b62');}for(let z=-d/2;z<d/2;z+=.9)p.box(0,h+2.6,z,1.5,.16,.18,'#805342');}
 else if(name==='silo'){for(let y=1;y<12;y+=1.8)p.volume([-4.2,4.2,y,y+.24,-4.2,4.2],(x,yy,z)=>Math.hypot(x,z)>3.85&&Math.hypot(x,z)<4.18?'metal':null);for(let y=1;y<14;y+=.65)p.box(0,y,4.1,1.1,.16,.18,'dark');p.rod([-.55,0,4.1],[-.55,14,4.1],.12,'metal').rod([.55,0,4.1],[.55,14,4.1],.12,'metal');}
 else if(name==='windmill'){for(let y=2;y<17;y+=2)p.box(0,y,1.6,1.5,.2,.2,'metal');for(let i=0;i<4;i++){const a=i*Math.PI/2;for(let r=4;r<8;r+=.7)p.box(Math.cos(a)*r,19+Math.sin(a)*r,2.1,Math.abs(Math.sin(a))*1.3+.5,Math.abs(Math.cos(a))*1.3+.5,.35,'#cbd4b9');}}
 else if(['apartment','tower','office','factory'].includes(name)){const k=['apartment','tower','office','factory'].indexOf(name),w=[18,22,25,28][k],d=[18,20,18,25][k],h=[26,65,42,16][k];p.box(0,.4,0,w+1,1,d+1,'#727d73');for(let y=2;y<h;y+=4){p.box(0,y,d/2+.55,w,.26,.45,'#d0d4c3').box(0,y,-d/2-.55,w,.26,.45,'#d0d4c3');for(const side of[-1,1])p.box(side*(w/2+.45),y,0,.4,.26,d,'#81938b');}for(const x of[-w*.32,w*.32]){p.box(x,h+1.5,0,4,2.5,3,'#778c87');for(let z=-1;z<=1;z+=.5)p.box(x,h+2.8,z,3,.22,.18,'dark');}p.box(0,2.4,d/2+.5,3.2,4.5,.55,'glass').box(0,4.7,d/2+1.7,5,.5,3,'#697d74');}
 else if(name==='pylon'){for(const z of[-.6,.6])for(let y=3;y<30;y+=5)p.rod([4-y*.09,y,z],[-4+(y+5)*.09,y+5,z],.22,'lightMetal');for(const x of[-6,0,6])for(let y=30;y<33;y+=.45)p.box(x,y,0,.9,.16,.9,'cream');}
 else if(name==='cloud'){for(let i=0;i<5;i++){const x=Math.sin(i*2.9)*24,z=Math.cos(i*1.9)*10,r=3+i%2;p.volume([x-r,x+r,-4,3,z-r,z+r],(xx,y,zz)=>Math.hypot(xx-x,y*.7,zz-z)<r?'#e6ece7':null);}}
 else if(name==='fueltruck'){for(const side of[-1,1])for(const z of[-2.5,2.6])p.volume([side*1.55-.3,side*1.55+.3,.1,1.6,z-.8,z+.8],(x,y,zz)=>Math.hypot(y-.85,zz-z)<.76?Math.abs(x)>1.7?'metal':'rubber':null);p.box(0,1.8,3.75,2.8,.45,.35,'metal').box(0,2.6,3.65,1.5,.6,.25,'dark');for(const side of[-1,1])p.box(side*1.03,2.4,3.8,.45,.35,.2,'ivory').box(side*1.63,3.3,2.4,.25,.4,.5,'metal');p.rod([1.5,2,-3],[1.5,4,-3],.13,'metal');}
}
function detailSky(name,p){const bird=BIRD_TYPES.find(d=>name.startsWith(d.name));if(bird){if(name.endsWith('body')){p.volume([-.25,.25,.1,.5,.38,.84],(x,y,z)=>Math.hypot(x,y-.28,(z-.61)*.85)<.23?bird.body:null);for(const side of[-1,1])p.box(side*.22,.35,.65,.08,.08,.1,'black').rod([side*.12,-.2,-.25],[side*.12,-.36,-.6],.05,bird.beak);for(let i=-2;i<=2;i++)p.box(i*.095,-.035,-.96,.08,.075,.37,bird.wing);}else if(name.endsWith('wing')){const sign=[...p.cells.values()].some(c=>c.x<0)?-1:1;for(let i=0;i<7;i++){const x=sign*(bird.span*.19+i*bird.span*.042);p.box(x,-.015,-.26,.07,.08,.35-i*.019,i%2?bird.wing:bird.body);}}return;}
 const def=TRAFFIC_TYPES.find(d=>name.startsWith(d.name));if(!def)return;const l=def.length,w=def.span,r=l*.065;
 if(name.includes('fuselage')){for(const side of[-1,1]){for(let z=-l*.28;z<l*.25;z+=Math.max(.6,l*.032))p.box(side*r*.93,r*.26,z,.18,.32,.38,'glass');p.box(side*r*.98,-.05,0,.16,.16,l*.56,'orange');if(!def.rotor){p.box(side*w*.485,.1,-l*.1-Math.abs(w*.485)*def.sweep*.45,.18,.24,.35,side<0?'red':'green');for(let x=r*1.5;x<w*.45;x+=1.5)p.box(side*x,.36,-l*.1-x*def.sweep*.35,.1,.12,l*.18,'metal');}else p.rod([side*.9,-r,1.5],[side*1.3,-r-1,-2],.15,'metal');}p.rod([0,r,-l*.18],[0,r+1.1,-l*.2],.08,'dark');for(let j=0;j<def.engines;j++){const x=def.engines===1?0:(j-(def.engines-1)/2)*(w/(def.engines+1));p.box(x,-r*.8,l*.18,r*.6,r*.6,.25,'black').box(x,-r*.8,-l*.08,r*.55,r*.55,.18,'metal');}}
 else if(def.airship){for(const side of[-1,1])for(let z=-3;z<4;z+=1)p.box(side*1.55,-6.8,z,.2,.6,.65,'glass');for(let z=-17;z<19;z+=4)p.volume([-8,8,-7,7,z,z+.18],(x,y)=>{const rad=(x/8)**2+(y/7)**2+(z/(l/2))**2;return rad<1&&rad>.94?'#b9c7bd':null;});}
 else if(name.includes('propeller')||name.includes('rotor')){const span=name.includes('rotor')?w:l*.2;for(const side of[-1,1])p.box(side*span*.43,0,0,span*.1,.3,.32,'yellow');}
}
export function makeCatalog(scene){
 const assets=new Map(),pools=new Map();
 function asset(name,size,build){const p=new VoxelPart(name,scene,null,size*.7);build(p);detailEnvironment(name,p);p.build(true);p.mesh.setEnabled(false);assets.set(name,{mesh:p.mesh,count:p.count});return p;}
 const greens=['#527148','#2b5541','#7e9658','#4b7852'];
 for(let k=0;k<4;k++)asset(['oak','pine','birch','palm'][k],.55,p=>{
  p.box(0,5,0,.8,10,.8,'#725441');
  if(k===1){for(let l=0;l<6;l++){const y=4+l*1.7,r=4-l*.54;p.volume([-r,r,y,y+3.5,-r,r],(x,yy,z)=>Math.hypot(x,z)<r*(1-(yy-y)/3.8)?greens[l%4]:null);}}
  else if(k===3){for(let a=0;a<7;a++){let t=a*Math.PI*2/7;p.rod([0,10,0],[Math.cos(t)*5,9,Math.sin(t)*5],.6,greens[a%4]);p.rod([Math.cos(t)*2,10.4,Math.sin(t)*2],[Math.cos(t)*5,8.6,Math.sin(t)*5],.45,greens[a%4]);}}
  else{for(let i=0;i<5;i++){const x=Math.sin(i*2.4)*2,z=Math.cos(i*2.4)*2,y=8+i*.5,r=k===2?2.4:3.2;p.volume([x-r,x+r,y-r,y+r,z-r,z+r],(xx,yy,zz)=>Math.hypot(xx-x,(yy-y)*.85,zz-z)<r?greens[(k+i)%4]:null);}if(k===2)for(let y=0;y<8;y+=1.5)p.box(0,y,0,1,.35,1,'cream');}
 });
 asset('cactus',.35,p=>p.box(0,3.4,0,1,6.8,1,'#5c8158').box(-1.25,3.5,0,2,1,1,'#5c8158').box(-2,4.5,0,1,3,1,'#5c8158').box(1.1,2.6,0,2,1,1,'#5c8158').box(1.8,3.4,0,1,2,1,'#5c8158'));
 for(let k=0;k<3;k++)asset(['boulder','spire','arch'][k],.7,p=>{
  const col=['#919889','#b77655','#ae8663'][k];
  if(k===0)p.volume([-4,4,0,4.7,-3.3,3.3],(x,y,z)=>(x/4)**2+(y/4.7)**2+(z/3.3)**2<1?y>3?'#a9ad99':col:null);
  else if(k===1){for(let l=0;l<6;l++)p.box(Math.sin(l)*.6,l*3.5+1.75,0,8-l*.85,3.5,7-l*.75,l%2?col:'#986249');}
  else{p.box(-6,6,0,4,12,5,col).box(6,6,0,4,12,5,col).box(0,13,0,15,4,5,col).box(0,16,0,10,2,4,'#ca9a6f');}
 });
 for(let k=0;k<3;k++)asset(['house','cottage','barn'][k],.6,p=>{
  const w=k===2?15:11,h=k===2?8:6,d=k===2?20:12,col=['#d2d0b5','#e1c4a0','#a8523d'][k];p.box(0,h/2,0,w,h,d,col);
  for(let l=0;l<5;l++)p.box(0,h+l*.6,0,w-l*2,.6,d+1,k===1?'#6b7765':'#a75f43');
  p.box(0,1.8,d/2+.2,k===2?6:2.2,3.6,.6,'dark');for(const x of[-3.6,3.6])p.box(x,3.8,d/2+.25,1.8,1.8,.6,'glass').box(x,3.8,-d/2-.25,1.8,1.8,.6,'glass');p.box(3,h+2,1,1.2,4,1.2,'#85715d');
 });
 asset('silo',.6,p=>p.volume([-4,4,0,15,-4,4],(x,y,z)=>Math.hypot(x,z)<4-(y>12?(y-12)*.6:0)?Math.floor(y)%4===0?'metal':'cream':null));
 asset('windmill',.5,p=>{p.box(0,10,0,3,20,3,'ivory').box(0,19,1,4,3,3,'dark');for(let a=0;a<4;a++){const t=a*Math.PI/2;p.rod([0,19,2],[Math.cos(t)*8,19+Math.sin(t)*8,2],.7,'ivory');}});
 for(let k=0;k<4;k++)asset(['apartment','tower','office','factory'][k],1,p=>{
  const w=[18,22,25,28][k],d=[18,20,18,25][k],h=[26,65,42,16][k];p.box(0,h/2,0,w,h,d,k===1?'#788c8a':k===2?'#adc0b9':'#b4ad99');p.box(0,h+.5,0,w+2,1,d+2,'dark');
  for(let y=4;y<h-2;y+=4)for(let x=-w/2+2;x<w/2;x+=4)p.box(x,y,d/2+.25,2,2.5,1,k%2?'glass':'#b5d6d0').box(x,y,-d/2-.25,2,2.5,1,'glass');
  for(let y=4;y<h-2;y+=4)for(let z=-d/2+2;z<d/2;z+=4)p.box(w/2+.25,y,z,1,2.5,2,'glass').box(-w/2-.25,y,z,1,2.5,2,'glass');
  p.box(0,h+2,0,6,3,5,'metal');if(k===3)p.box(9,22,-6,3,40,3,'#ae7958');if(k===1)p.box(0,h+8,0,1,16,1,'metal');
 });
 asset('pylon',.5,p=>{for(const s of[-1,1]){p.rod([s*4,0,0],[s,33,0],.45,'metal');for(let y=3;y<31;y+=5)p.rod([-4+y*.09,y,0],[4-(y+5)*.09,y+5,0],.33,'metal');}p.box(0,33,0,15,1,1.5,'dark').box(0,26,0,11,1,1.5,'metal');for(const x of[-6,0,6])p.box(x,31.5,0,.5,3,.5,'ivory');});
 asset('cloud',4,p=>{for(let j=0;j<7;j++){const x=Math.sin(j*2)*20,z=Math.cos(j*3)*8,y=Math.sin(j)*3,r=9+j%3*3;p.volume([x-r,x+r,y-r*.55,y+r*.55,z-r,z+r],(xx,yy,zz)=>((xx-x)/r)**2+((yy-y)/(r*.55))**2+((zz-z)/r)**2<1?'white':null);}});
 asset('fueltruck',.4,p=>p.box(0,1.3,0,3,1.8,7,'dark').box(0,2.8,2.2,3,2.4,2.5,'orange').box(0,3.1,3.6,2.7,1.1,.4,'glass').box(0,2.8,-1.6,3,2.4,4,'cream'));
 return {assets,spawn(name,parent,position,scale=1,rotation=0){const item=assets.get(name);if(!item)throw Error('Unknown asset '+name);const mesh=pools.get(name)?.pop()||item.mesh.createInstance(name);mesh.parent=parent;mesh.setEnabled(true);mesh.position.set(...position);mesh.scaling.setAll(scale);mesh.rotation.y=rotation;mesh.isPickable=false;return mesh;},release(mesh){if(mesh.isDisposed()||!assets.has(mesh.name)||mesh.sourceMesh!==assets.get(mesh.name).mesh)return false;mesh.setEnabled(false);mesh.parent=null;if(!pools.has(mesh.name))pools.set(mesh.name,[]);pools.get(mesh.name).push(mesh);return true;},dispose(){for(const a of assets.values())a.mesh.parent.dispose(false,false);}};
}

export const BIRD_TYPES=[
 {name:'gulls',body:'ivory',wing:'cream',beak:'yellow',size:1.1,span:2.5,rate:5},
 {name:'geese',body:'cream',wing:'dark',beak:'orange',size:1.5,span:2.9,rate:3.7},
 {name:'ravens',body:'black',wing:'dark',beak:'black',size:.95,span:2,rate:6},
 {name:'eagles',body:'ivory',wing:'#6d5036',beak:'yellow',size:1.7,span:3.2,rate:2.2},
 {name:'pelicans',body:'ivory',wing:'cream',beak:'orange',size:1.8,span:3.5,rate:3},
 {name:'parrots',body:'green',wing:'#3f8fba',beak:'yellow',size:.9,span:1.9,rate:7},
 {name:'cranes',body:'cream',wing:'white',beak:'red',size:1.7,span:3.1,rate:3.4},
 {name:'ducks',body:'#95724c',wing:'#4b716b',beak:'orange',size:1,span:1.9,rate:7.3}
];
export const TRAFFIC_TYPES=[
 {name:'glider',length:12,span:21,color:'ivory',sweep:0,engines:0,speed:31},
 {name:'biplane',length:8,span:10,color:'orange',sweep:0,engines:1,speed:43},
 {name:'bush plane',length:10,span:13,color:'yellow',sweep:0,engines:1,speed:48},
 {name:'twin turboprop',length:17,span:23,color:'ivory',sweep:.05,engines:2,speed:70},
 {name:'business jet',length:18,span:16,color:'cream',sweep:.35,engines:2,speed:100},
 {name:'fighter',length:16,span:11,color:'blue',sweep:.45,engines:2,speed:130},
 {name:'cargo aircraft',length:31,span:37,color:'#657d70',sweep:.15,engines:4,speed:95},
 {name:'airliner',length:42,span:40,color:'ivory',sweep:.35,engines:2,speed:115},
 {name:'helicopter',length:11,span:15,color:'orange',rotor:true,speed:38},
 {name:'airship',length:45,span:16,color:'cream',airship:true,speed:22}
];

export function makeSkyCatalog(scene){const sources=[];
 function add(name,size,fill,origin=[0,0,0]){const p=new VoxelPart(name,scene,null,size*.65);fill(p);detailSky(name,p);p.build(true);p.mesh.setEnabled(false);return{mesh:p.mesh,origin};}
 for(const def of BIRD_TYPES){const s=def.size;const body=add(def.name+' body',.14,p=>p.volume([-.3,.3,-.3,.3,-.75,.65],(x,y,z)=>(x/.3)**2+(y/.3)**2+(z/.8)**2<1?def.body:null).box(0,.18,.55,.35,.35,.4,def.body).box(0,.16,.87,.18,.14,def.name==='pelicans'?.7:.3,def.beak).box(0,0,-.84,.5,.1,.55,def.wing));
  const parts=[body];for(const side of[-1,1]){parts.push(add(def.name+' wing',.14,p=>p.volume([side<0?-def.span/2:0,side<0?0:def.span/2,-.075,.075,-.3,.55],(x,y,z)=>z<.5-Math.abs(x)*.3?def.wing:null),[side*.18,0,0]));}sources.push({def,kind:'bird',parts,scale:s,radius:Math.max(.8,def.span*s*.32)});
 }
 for(const def of TRAFFIC_TYPES){const l=def.length,w=def.span,s=l>25?.65:.35;const parts=[];
  if(def.airship){parts.push(add(def.name,s,p=>p.volume([-8,8,-7,7,-l/2,l/2],(x,y,z)=>(x/8)**2+(y/7)**2+(z/(l/2))**2<1?(Math.abs(y)<.7?'orange':def.color):null).box(0,-7,0,3,3,9,'dark').box(0,5,-17,1,8,8,'orange').box(0,0,-18,17,1,7,'orange')));}
  else {parts.push(add(def.name+' fuselage',s,p=>{const r=l*.065;p.volume([-r,r,-r,r,-l/2,l/2],(x,y,z)=>{const taper=Math.sqrt(Math.max(0,1-(z/(l/2))**2));return Math.hypot(x,y*.9)<r*taper?(y<-.25?'dark':def.color):null;}).box(0,r*.68,l*.24,r*1.7,r*.55,l*.15,'glass').box(0,r*.2,-l*.4,w*.35,s*2,l*.16,def.color).box(0,r*1.3,-l*.37,s*2,r*3,l*.16,'orange');
   if(!def.rotor)p.volume([-w/2,w/2,-s,s,-l*.24,l*.15],(x,y,z)=>{const lead=l*.14-Math.abs(x)*def.sweep,trail=-l*.15-Math.abs(x)*def.sweep*.35;return z<lead&&z>trail?Math.abs(x)>w*.43?'orange':def.color:null;});
   if(def.name==='biplane'){p.box(0,2,0,w,s*2,l*.28,'orange');for(const side of[-1,1])p.box(side*w*.36,1,0,s*2,2,s*2,'metal');}
   for(let j=0;j<def.engines;j++){const x=def.engines===1?0:(j-(def.engines-1)/2)*(w/(def.engines+1));p.box(x,-r*.8,l*.05,r*.8,r*.8,l*.24,'dark');}
  }));
  if(def.rotor){parts.push(add(def.name+' rotor',.3,p=>p.box(0,0,0,w,.3,.55,'black').box(0,0,0,.55,.3,w,'black'),[0,2,0]));}
  else if(def.speed<85&&def.engines){for(let j=0;j<def.engines;j++){const x=def.engines===1?0:(j-(def.engines-1)/2)*(w/(def.engines+1));parts.push(add(def.name+' propeller '+j,.25,p=>p.box(0,0,0,.3,l*.2,.3,'dark').box(0,0,0,l*.2,.3,.3,'dark'),[x,def.engines===1?0:-l*.065*.8,def.engines===1?l*.5+.1:l*.17+.2]));}}
  }
  sources.push({def,kind:'aircraft',parts,scale:1,radius:def.airship?8:Math.max(2,l*.07)});
 }
 return{sources,spawn(index,parent){const src=sources[index],root=new B.TransformNode(src.def.name,scene);root.parent=parent;root.scaling.setAll(src.scale);const meshes=src.parts.map(p=>{const m=p.mesh.createInstance(src.def.name);m.parent=root;m.position.set(...p.origin);m.setEnabled(true);m.isPickable=false;return m;});return{...src,root,meshes};}};
}
