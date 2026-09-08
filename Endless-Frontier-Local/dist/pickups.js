import{VoxelPart}from'./voxels.js?v=balance-8';
import{groundHeight}from'./world.js?v=balance-8';
import{segmentSphereHit}from'./weapons.js?v=balance-8';
const B=globalThis.BABYLON,V=B.Vector3;
export class AmmoPickups{
 constructor(scene,weapons,effects,onCollect=()=>{},random=Math.random){this.scene=scene;this.weapons=weapons;this.effects=effects;this.onCollect=onCollect;this.random=random;this.items=[];this.timer=2;this.serial=0;this.time=0;
  const crate=new VoxelPart('airborne reload cache',scene,null,.14);crate.box(0,0,0,3.8,2.2,2.8,'#253f52');for(const x of[-1.8,1.8])crate.box(x,0,0,.24,2.65,3.15,'#74edee');for(const z of[-1.5,1.5]){crate.box(0,0,z,1.5,.36,.14,'#a9fcf2').box(0,0,z,.36,1.5,.14,'#a9fcf2');}for(let i=0;i<4;i++)crate.box(-1.1+i*.72,1.25,0,.4,.25,2.0,'#afc8c8');crate.build();this.source=crate;crate.mesh.isVisible=false;
  const ring=new VoxelPart('reload collection beacon',scene,null,.28);ring.volume([-18,18,-18,18,-.2,.2],(x,y)=>{const r=Math.hypot(x,y);return r>17.2&&r<18&&(Math.floor(Math.atan2(y,x)*12)%3!==0)?'#61f1ee':null;}).build();this.ringSource=ring;ring.mesh.isVisible=false;const material=scene.voxelMaterial.clone('reload radiance');material.emissiveColor=new B.Color3(.25,.85,.85);ring.mesh.material=material;
 }
 reset(){this.clear();this.timer=1.5+this.random()*2;this.time=0;}
 clear(){for(const item of this.items)item.root.dispose(false,false);this.items=[];}
 spawn(flight){const heading=flight.velocity.length()>12?flight.velocity.normalizeToNew():flight.axes().f,side=new V(heading.z,0,-heading.x).normalize(),distance=Math.max(650,flight.speed*(6+this.random()*2)),offset=(this.random()-.5)*Math.max(70,Math.min(250,flight.speed*.35));const position=flight.position.add(heading.scale(distance)).add(side.scale(offset));position.y=Math.max(Math.max(0,groundHeight(position.x,position.z))+110,flight.position.y+(this.random()-.5)*65);
  const root=new B.TransformNode('missile reload '+(++this.serial),this.scene);root.position.copyFrom(position);const body=this.source.mesh.createInstance('reload cache '+this.serial);body.parent=root;body.position.setAll(0);body.isVisible=true;body.isPickable=false;const ring=this.ringSource.mesh.createInstance('collection ring '+this.serial);ring.parent=root;ring.position.setAll(0);ring.isVisible=true;ring.isPickable=false;ring.rotation.y=Math.atan2(heading.x,heading.z);const item={root,body,ring,kind:'pickup',def:{name:'Missile reload'},radius:18,phase:this.random()*Math.PI*2,age:0};this.items.push(item);return item;
 }
 update(dt,flight,previous){if(!this.weapons.weapon||flight.crashed||flight.landed)return;this.time+=dt;this.timer-=dt;if(this.timer<=0){if(this.items.length<7)this.spawn(flight);this.timer=5+this.random()*5;}
  for(const item of [...this.items]){item.age+=dt;item.body.rotation.y+=dt*.6;item.body.position.y=Math.sin(this.time*1.6+item.phase)*.6;item.ring.rotation.z+=dt*.12;item.def.name=this.weapons.ammo===this.weapons.weapon.ammo?'Reload · ammo full':'Missile reload';const distance=V.Distance(item.root.position,flight.position);if(segmentSphereHit(previous,flight.position,item.root.position,item.radius)!==null){const restored=this.weapons.reload();if(restored){for(let i=0;i<32;i++){const a=i*Math.PI/16;this.effects.emit(item.root.position,new V(Math.cos(a)*16,Math.sin(a)*16,0).add(flight.velocity.scale(.25)),'blue',.35,.8);}this.onCollect(restored);this.remove(item);continue;}}
   if(item.age>100||distance>Math.max(16000,flight.speed*12)||V.Dot(item.root.position.subtract(flight.position),flight.axes().f)<-900)this.remove(item);
  }
 }
 remove(item){item.root.dispose(false,false);this.items.splice(this.items.indexOf(item),1);}
 rebase(dx,dz){for(const item of this.items){item.root.position.x-=dx;item.root.position.z-=dz;}}
}
