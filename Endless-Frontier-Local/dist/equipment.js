import{createAircraft}from'./aircraft.js?v=balance-8';
import{buildExtraEquipment}from'./fleet.js?v=balance-8';
import{buildMissile}from'./ordnance.js?v=balance-8';
export{buildMissile}from'./ordnance.js?v=balance-8';
import{VoxelPart}from'./voxels.js?v=balance-8';
const B=globalThis.BABYLON;
export const MODULES={
 "prop": [
  {
   "id": "sunbird",
   "slot": "engine",
   "name": "Sunbird fusion drive",
   "price": 6200,
   "tag": "TWIN HALO TURBINES",
   "description": "Replaces the propeller with two luminous fusion ducts. Pure thrust replaces shaft power.",
   "stats": "4.90× stock thrust · direct thrust · 1.8× fuel burn",
   "mods": {
    "thrust": 4.901960784313726,
    "power": 0,
    "fuelBurnMultiplier": 1.8
   }
  },
  {
   "id": "manta",
   "slot": "aero",
   "name": "Manta gravitic wings",
   "price": 4600,
   "tag": "SPLIT ARC LIFT ARRAY",
   "description": "Forked emerald wings, floating tip blades and exposed field coils.",
   "stats": "50% less stock drag · 30% more area",
   "mods": {
    "cd": 0.5,
    "area": 1.3
   }
  },
  {
   "id": "heart",
   "slot": "fuel",
   "name": "Helios cell banks",
   "price": 3200,
   "tag": "CONTAINED STAR CELLS",
   "description": "Four armored, glowing energy cells replace the external fuel system.",
   "stats": "75% more than stock fuel capacity",
   "mods": {
    "fuelCapacity": 1.75
   }
  },
  {
   "id": "bloom",
   "slot": "efficiency",
   "name": "Aurora recycler",
   "price": 3600,
   "tag": "RADIANT HEAT HARVESTER",
   "description": "A crown of copper radiators and cyan coolant loops recaptures wasted energy.",
   "stats": "35% less fuel burned than stock",
   "mods": {
    "fuelEfficiency": 0.65
   }
  },
  {
   "id": "wasp",
   "slot": "controls",
   "name": "Wasp vector surfaces",
   "price": 4200,
   "tag": "SEGMENTED FLIGHT FEATHERS",
   "description": "Serrated servo feathers replace every aileron, flap, elevator and rudder.",
   "stats": "65% stronger than stock controls",
   "mods": {
    "roll": 1.65,
    "pitch": 1.65,
    "yaw": 1.65
   }
  },
  {
   "id": "firefly",
   "slot": "weapons",
   "name": "Firefly seeker racks",
   "price": 5400,
   "tag": "GUIDED MISSILE SYSTEM",
   "description": "Twin emerald launch racks carry eight Firefly missiles. Lock moving targets or fire straight into obstacles and terrain. Collect airborne reload packs to replenish ammunition during flight.",
   "stats": "8 missiles · 0.75 s lock · guided or straight fire",
   "mods": {},
   "weapon": {
    "ammo": 8,
    "lockTime": 0.75,
    "cooldown": 0.8,
    "turnRate": 2.8,
    "range": 3200,
    "speed": 650,
    "life": 10
   }
  },
  {
   "id": "scarab",
   "slot": "weight",
   "name": "Scarab exoframe",
   "price": 5200,
   "tag": "EMERALD LATTICE HULL",
   "description": "A black ceramic fuselage inside a luminous emerald and copper exoskeleton.",
   "stats": "30% less stock mass",
   "mods": {
    "mass": 0.7
   }
  }
 ],
 "jet": [
  {
   "id": "singularity",
   "slot": "engine",
   "name": "Singularity ram drives",
   "price": 9600,
   "tag": "DUAL VOID REACTORS",
   "description": "Enormous violet reactors with armored intake jaws and plasma exhaust petals.",
   "stats": "3.67× stock thrust · direct thrust · 2× fuel burn",
   "mods": {
    "thrust": 3.6666666666666665,
    "power": 0,
    "fuelBurnMultiplier": 2.0
   }
  },
  {
   "id": "razor",
   "slot": "aero",
   "name": "Razor phase wings",
   "price": 7200,
   "tag": "OBSIDIAN DOUBLE DELTA",
   "description": "Swept black double-delta wings with luminous magenta edges and split tips.",
   "stats": "55% less stock drag · 15% more area",
   "mods": {
    "cd": 0.45,
    "area": 1.15
   }
  },
  {
   "id": "vault",
   "slot": "fuel",
   "name": "Antimatter vaults",
   "price": 4800,
   "tag": "MAGNETIC CONTAINMENT PODS",
   "description": "Caged violet antimatter cores replace the standard reserve tanks.",
   "stats": "95% more than stock fuel capacity",
   "mods": {
    "fuelCapacity": 1.95
   }
  },
  {
   "id": "umbra",
   "slot": "efficiency",
   "name": "Umbra cryo matrix",
   "price": 5400,
   "tag": "CRYOGENIC SPINE",
   "description": "A finned sapphire heat exchanger with exposed magenta circulation conduits.",
   "stats": "35% less fuel burned than stock",
   "mods": {
    "fuelEfficiency": 0.65
   }
  },
  {
   "id": "spectre",
   "slot": "controls",
   "name": "Spectre vector blades",
   "price": 6800,
   "tag": "ACTIVE PLASMA STEERING",
   "description": "Deeply swept split control blades and luminous actuators move with your inputs.",
   "stats": "75% stronger than stock controls",
   "mods": {
    "roll": 1.75,
    "pitch": 1.75,
    "yaw": 1.75
   }
  },
  {
   "id": "nightjar",
   "slot": "weapons",
   "name": "Nightjar strike array",
   "price": 8500,
   "tag": "ADVANCED SEEKER BATTERY",
   "description": "Twin violet launch cassettes carry twelve Nightjar missiles. Fast seekers pursue moving targets while unguided rounds crater the landscape. Collect airborne reload packs to replenish ammunition during flight.",
   "stats": "12 missiles · 0.5 s lock · agile guidance",
   "mods": {},
   "weapon": {
    "ammo": 12,
    "lockTime": 0.5,
    "cooldown": 0.55,
    "turnRate": 4.0,
    "range": 5700,
    "speed": 1200,
    "life": 11
   }
  },
  {
   "id": "wraith",
   "slot": "weight",
   "name": "Wraith phase shell",
   "price": 8200,
   "tag": "FACETED STEALTH CHASSIS",
   "description": "A completely new obsidian hull with armored facets and glowing violet ribs.",
   "stats": "35% less stock mass",
   "mods": {
    "mass": 0.65
   }
  }
 ],
 "swift": [
  {
   "id": "tempest",
   "slot": "engine",
   "name": "Tempest arc turbines",
   "price": 7900,
   "tag": "TWIN ARC PROPULSION",
   "description": "Twin ten-blade scimitar rotors, exposed amber field rings and auxiliary arc boosters replace both turbines.",
   "stats": "4.30× stock thrust · 7.66× shaft power · 1.9× fuel burn",
   "mods": {
    "thrust": 4.296296296296297,
    "power": 7.659574468085107,
    "fuelBurnMultiplier": 1.9
   }
  },
  {
   "id": "albatross",
   "slot": "aero",
   "name": "Albatross split wings",
   "price": 5900,
   "tag": "LAMINAR FORKED WING",
   "description": "Cobalt forked wing tips, projecting amber spars and triple split winglets reshape the Meridian.",
   "stats": "60% less stock drag · 20% more area",
   "mods": {
    "cd": 0.4,
    "area": 1.2
   }
  },
  {
   "id": "solstice",
   "slot": "fuel",
   "name": "Solstice capacitor tanks",
   "price": 4100,
   "tag": "ARMORED AMBER RESERVES",
   "description": "Paired conformal star-cell tanks with luminous containment bands and heavy spar mounts.",
   "stats": "85% more than stock fuel capacity",
   "mods": {
    "fuelCapacity": 1.85
   }
  },
  {
   "id": "zephyr",
   "slot": "efficiency",
   "name": "Zephyr heat recovery",
   "price": 4700,
   "tag": "TWIN THERMAL LATTICES",
   "description": "Twelve-finned intercoolers and exposed coolant conduits recycle turbine heat.",
   "stats": "35% less fuel burned than stock",
   "mods": {
    "fuelEfficiency": 0.65
   }
  },
  {
   "id": "harrier",
   "slot": "controls",
   "name": "Harrier servo feathers",
   "price": 5400,
   "tag": "TWIN-TAIL VECTOR CONTROL",
   "description": "Slotted servo feathers replace the ailerons, Fowler flaps, elevators and twin rudders.",
   "stats": "70% stronger than stock controls",
   "mods": {
    "roll": 1.7,
    "pitch": 1.7,
    "yaw": 1.7
   }
  },
  {
   "id": "comet",
   "slot": "weapons",
   "name": "Comet seeker combs",
   "price": 6800,
   "tag": "TWIN OUTBOARD LAUNCHERS",
   "description": "Ten amber Comet seekers in two wing-mounted launch combs. Collect airborne reload packs to replenish them.",
   "stats": "10 missiles · 0.6 s lock · precision guidance",
   "mods": {},
   "weapon": {
    "ammo": 10,
    "lockTime": 0.6,
    "cooldown": 0.65,
    "turnRate": 3.4,
    "range": 4300,
    "speed": 900,
    "life": 11
   }
  },
  {
   "id": "chrysalis",
   "slot": "weight",
   "name": "Chrysalis lattice fuselage",
   "price": 6700,
   "tag": "COBALT EXOSKELETON",
   "description": "An angular cobalt pressure shell with amber seams and closely spaced titanium braces.",
   "stats": "35% less stock mass",
   "mods": {
    "mass": 0.65
   }
  }
 ],
 "ufo": [
  {
   "id": "wormhole",
   "slot": "engine",
   "name": "Wormhole warp chambers",
   "price": 18000,
   "tag": "SIX-CORE SPACETIME DRIVE",
   "description": "Six enormous rear ion chambers and an enlarged ventral field ring replace the stock gravitic drive.",
   "stats": "3.82× stock thrust · direct thrust · 2.2× fuel burn",
   "mods": {
    "thrust": 3.823529411764706,
    "power": 0,
    "fuelBurnMultiplier": 2.2
   }
  },
  {
   "id": "eventide",
   "slot": "aero",
   "name": "Eventide phase petals",
   "price": 13500,
   "tag": "EIGHT RADIAL FIELD BLADES",
   "description": "Eight slender floating phase petals with magenta field nodes replace the outer lifting disc.",
   "stats": "75% less stock drag · 15% more area",
   "mods": {
    "cd": 0.25,
    "area": 1.15
   }
  },
  {
   "id": "tesseract",
   "slot": "fuel",
   "name": "Tesseract energy reservoirs",
   "price": 9600,
   "tag": "EIGHT CONTAINMENT CELLS",
   "description": "Eight violet energy reservoirs form a crown above the saucer, each wrapped in bright containment bands.",
   "stats": "100% more than stock fuel capacity",
   "mods": {
    "fuelCapacity": 2.0
   }
  },
  {
   "id": "entropy",
   "slot": "efficiency",
   "name": "Entropy reversal matrix",
   "price": 11000,
   "tag": "CRYONIC HEAT SINKS",
   "description": "Paired alien radiator lattices with exposed pink circulation loops and twelve heat blades per bank.",
   "stats": "35% less fuel burned than stock",
   "mods": {
    "fuelEfficiency": 0.65
   }
  },
  {
   "id": "oracle",
   "slot": "controls",
   "name": "Oracle vector lattice",
   "price": 12500,
   "tag": "DISTRIBUTED PLASMA VANES",
   "description": "Serrated roll and pitch vanes, radial field brakes and twin vertical yaw paddles respond instantly.",
   "stats": "80% stronger than stock controls",
   "mods": {
    "roll": 1.8,
    "pitch": 1.8,
    "yaw": 1.8
   }
  },
  {
   "id": "nova",
   "slot": "weapons",
   "name": "Nova hunter arrays",
   "price": 14500,
   "tag": "ALIEN SEEKER BATTERY",
   "description": "Sixteen ring-finned Nova missiles in paired ventral batteries. High-agility guidance and airborne ammo refills.",
   "stats": "16 missiles · 0.35 s lock · extreme agility",
   "mods": {},
   "weapon": {
    "ammo": 16,
    "lockTime": 0.35,
    "cooldown": 0.4,
    "turnRate": 4.8,
    "range": 7600,
    "speed": 1850,
    "life": 13
   }
  },
  {
   "id": "paradox",
   "slot": "weight",
   "name": "Paradox phase hull",
   "price": 16000,
   "tag": "LENTICULAR PHASE SHELL",
   "description": "A dark lens-shaped hull with twenty glowing radial ribs and an exposed underside ring.",
   "stats": "38% less stock mass",
   "mods": {
    "mass": 0.62
   }
  }
 ]
};
export const SLOTS=['fuel','efficiency','engine','aero','controls','weight','weapons'];
export function moduleFor(type,id){return MODULES[type]?.find(m=>m.id===id);}
export function activeModule(progress,type,slot){return MODULES[type].find(m=>m.slot===slot&&progress.data.moduleEquipped[type][slot]===m.id);}
export function equipmentChoice(progress,type,slot){const mod=activeModule(progress,type,slot);return{slot,level:mod?5:progress.installedLevel(type,slot),module:mod||null};}
const originalSlot=name=>name==='fuselage monocoque'?'weight':name.includes('wing structure')?'aero':/aileron|slotted flap|^elevator$|^rudder$/.test(name)?'controls':/turboprop cowling|propeller|jet intake|compressor blades|afterburner ring/.test(name)?'engine':name==='panel seams door handles rivets and vents'?'efficiency':name==='inspection plates fasteners hinges and intake rims'?'fuel':null;
// This factory supplies both the installed geometry and the rotating shop inspection.
export function buildEquipment(scene,type,choice,parent){
 if(type==='swift'||type==='ufo')return buildExtraEquipment(scene,type,choice,parent);
 if(!choice.module&&!choice.level){const aircraft=createAircraft(scene,type),parts=aircraft.parts.filter(p=>originalSlot(p.name)===choice.slot);for(const p of aircraft.parts)if(!parts.includes(p))p.mesh.dispose(false,false);if(parent)aircraft.root.parent=parent;return{root:aircraft.root,parts,surfaces:aircraft.surfaces,emitters:[],choice,type};}
 const jet=type==='jet',bm=!!choice.module,L=Math.max(1,choice.level||1),slot=choice.slot,parts=[],surfaces={ailerons:[],flaps:[],elevators:[],rudders:[],props:[]},emitters=[];
 const root=parent||new B.TransformNode('equipment inspection',scene),name=bm?choice.module.name:['Mk I','Mk II','Mk III','Mk IV','Mk V'][L-1]+' '+slot;
 const body=bm?'#121525':jet?'#cddce0':'#eee6ce',edge=bm?(jet?'#ab60ff':'#42ebbd'):['#ed824f','#f1bd55','#59bcb4','#7c9de2','#eff7f3'][L-1],hot=bm?(jet?'#f18aff':'#b8ffe0'):'#ffcc78',metal=bm?(jet?'#434267':'#927a50'):'#536971';
 const add=(label,origin=[0,0,0],size=.065)=>{const p=new VoxelPart(name+' · '+label,scene,root,size,origin);p.equipmentSlot=slot;parts.push(p);return p;};
 const finish=p=>{if(bm){const luminous=[...p.cells.values()].filter(c=>c.color===edge||c.color===hot);if(luminous.length){scene.moduleGlowMaterials??=new Map();if(!scene.moduleGlowMaterials.has(edge)){const m=scene.voxelMaterial.clone('radiant '+edge);m.emissiveColor=B.Color3.FromHexString(edge).scale(.75);m.specularColor=B.Color3.Black();scene.moduleGlowMaterials.set(edge,m);}const material=scene.moduleGlowMaterials.get(edge);if(luminous.length===p.cells.size){p.build();p.mesh.material=material;return p;}const glow=new VoxelPart(name+' · illuminated circuits',scene,p.node,p.size);glow.equipmentSlot=slot;for(const c of luminous){p.cells.delete(c.x+','+c.y+','+c.z);glow.set(c.x,c.y,c.z,c.color);}glow.build();glow.mesh.material=material;parts.push(glow);}}p.build();return p;};
 const ring=(p,cx,cy,z,r,thick,color,depth=.16)=>p.volume([cx-r,cx+r,cy-r,cy+r,z-depth/2,z+depth/2],(x,y)=>{const d=Math.hypot(x-cx,y-cy);return d<r&&d>r-thick?color:null;});
 if(slot==='engine'){
  if(!jet&&!bm){const radius=.59+L*.027,p=add('sculpted turbine cowling');p.volume([-radius,radius,-radius,radius,2.75,4.04],(x,y,z)=>Math.hypot(x,y)<radius*(1-(z-2.75)*.13)?(Math.floor(z*12)%(7-L)===0?edge:body):null);for(const s of[-1,1])p.box(s*(radius-.02),-.14,3.05,.15,.35,.48,metal);finish(p);const hub=add('spinner',[0,0,4.14],.045);ring(hub,0,0,0,.28,.28,edge,.35);finish(hub);surfaces.props.push(hub.node);for(let i=0;i<4+L;i++){const blade=add('scimitar blade '+i,[0,0,0],.04);blade.node.parent=hub.node;blade.volume([-.24,.32,.18,1.45+L*.035,-.07,.07],(x,y)=>Math.abs(x-(y-.3)**2*.12)<.11+L*.008?(y>1.15?edge:metal):null);finish(blade);blade.node.rotation.z=i*Math.PI*2/(4+L);}}
  else for(const s of[-1,1]){const cx=s*(jet?1.42:1.48),cy=jet?-.18:.05,z0=jet?-5.8:2.15,z1=jet?1.5:4.25,r=bm?(jet?.9:.75):.64+L*.028,p=add('drive housing '+s);p.volume([cx-r,cx+r,cy-r,cy+r,z0,z1],(x,y,z)=>{const d=bm&&jet?Math.max(Math.abs(x-cx),Math.abs(y-cy))*.82+Math.hypot(x-cx,y-cy)*.18:Math.hypot(x-cx,y-cy),rr=r*(.88+.12*Math.sin((z-z0)/(z1-z0)*Math.PI));return d<rr&&d>rr-.16?(Math.floor((z-z0)*5)%7===0?metal:body):null;});for(let z=z0+.1;z<z1;z+=bm?.48:.75)ring(p,cx,cy,z,r+.035,.085,edge,.095);for(let i=0;i<(bm?8:4+L);i++){const a=i*Math.PI*2/(bm?8:4+L);p.rod([cx+Math.cos(a)*r,cy+Math.sin(a)*r,z0+.45],[cx+Math.cos(a)*(r*.64),cy+Math.sin(a)*(r*.64),z0-.55],.085,metal);}finish(p);const turbine=add('luminous rotor '+s,[cx,cy,z1-.15],.05);for(let i=0;i<12;i++){const a=i*Math.PI/6;turbine.rod([Math.cos(a)*.15,Math.sin(a)*.15,0],[Math.cos(a+.24)*r*.78,Math.sin(a+.24)*r*.78,0],.055,metal);}ring(turbine,0,0,0,r*.68,.07,hot,.1);finish(turbine);surfaces.props.push(turbine.node);const core=add('exhaust core '+s);ring(core,cx,cy,z0-.1,r*.7,.12,hot,.3);finish(core);emitters.push([cx,cy,z0-.5]);if(!jet){const brace=add('fusion support '+s);brace.rod([s*.4,0,3.2],[cx,cy,3.2],.19,metal);finish(brace);}}
 }
 if(slot==='aero')for(const s of[-1,1]){const span=jet?5.6:6.7,y=jet?.02:1.1,p=add('replacement wing '+s);p.volume([s<0?-span:.7,s<0?-.7:span,y-.12,y+.23,-3.3,2.6],(x,yy,z)=>{const ax=Math.abs(x),lead=jet?2.3-ax*(bm?.43:.54-L*.012):2.02-ax*(bm?.095:.025+L*.008),trail=jet?-1.85-ax*.22:-.18;const ridge=y+ax*.012;if(z>lead||z<trail||Math.abs(yy-ridge)>(bm?.12:.10+L*.009))return null;if(bm&&ax>span*.76&&z>trail+.28&&z<lead-.42)return null;return z>lead-.18||ax>span-.34||bm&&Math.floor(ax*2)%5===0?edge:body;});for(let i=0;i<(bm?4:L);i++){const x=s*(span-.10-i*.19);p.rod([x,y+.08,jet?-2.7:.0],[x+s*.06,y+(bm?1.05:.28+L*.13)-i*.08,jet?-1.45:.95],.065,i%2?metal:edge);}finish(p);}
 if(slot==='fuel')for(const s of[-1,1]){const cx=s*(jet?2.65:3.15),cy=jet?-.48:.48,r=bm?.38:.23+L*.038,z=jet?-1.1:.2,p=add('reserve pod '+s);p.volume([cx-r,cx+r,cy-r,cy+r,z-1.6,z+1.6],(x,y,zz)=>{const rr=bm?Math.max(Math.abs(x-cx),Math.abs(y-cy)):Math.hypot(x-cx,y-cy);return rr<r*Math.sqrt(Math.max(0,1-((zz-z)/1.65)**2))?(bm?hot:body):null;});for(let i=0;i<(bm?8:L+2);i++){const zz=z-1.3+i*2.6/((bm?8:L+2)-1);ring(p,cx,cy,zz,r+.065,.09,i%2?edge:metal,.12);}p.box(cx,cy+.27,z,.2,.5,1.4,metal);if(bm)for(const dx of[-r,r])p.rod([cx+dx,cy-r,z-1.4],[cx+dx,cy-r,z+1.4],.085,body);finish(p);}
 if(slot==='efficiency'){const p=add('heat exchanger spine'),z=jet?-1.55:-1.65,y=jet?.75:.61;for(const s of[-1,1]){p.rod([s*.43,y,z-1.15],[s*.43,y,z+1.1],.11,edge);for(let i=0;i<(bm?12:L+3);i++){const zz=z-1+i*2/((bm?12:L+3)-1);p.box(s*.4,y+.14,zz,bm?.78:.42+L*.045,bm?.75:.14+L*.06,.085,i%3===0?edge:metal);}p.rod([s*.43,y,z+1.1],[s*.8,.05,jet?.3:2.6],.065,hot);}finish(p);}
 if(slot==='controls'){
 const paddle=(label,origin,width,depth,kind,side=0)=>{const p=add(label,origin,.045);p.volume([-width/2,width/2,-.075,.075,-depth,0],(x,y,z)=>{if(bm&&z<-depth*.55&&Math.floor((x+width/2)/.27)%3===0)return null;const trail=-depth+(bm?Math.abs(x)*.12:Math.abs(x)/width*L*.035);return z>trail?(z<trail+.16||Math.abs(x)>width*.41?edge:body):null;});for(let i=0;i<(bm?5:L+1);i++)p.box(-width*.4+i*width*.8/(bm?4:L),.10,-.14,.08,.11,.25,metal);finish(p);if(kind==='ailerons')surfaces[kind].push({node:p.node,side});else surfaces[kind].push(p.node);};
 for(const s of[-1,1]){paddle('aileron '+s,[s*(jet?4.2:4.55),jet?.02:1.08,jet?-2.54:-.2],jet?2.25:3.5,bm?.94:.5+L*.035,'ailerons',s);paddle('flap '+s,[s*2,jet?-.03:1.06,jet?-2.02:-.21],jet?1.75:1.8,bm?.86:.48+L*.03,'flaps');paddle('elevator '+s,[s*(jet?1.48:1.23),jet?.49:.4,jet?-4.56:-4.36],jet?2.55:2.1,bm?.95:.4+L*.035,'elevators');}
 for(const x of jet?[-1.14,1.14]:[0]){const p=add('rudder '+x,[x,jet?.5:.35,jet?-4.22:-4.07],.045);p.box(0,.8,-.25,.14,1.72,bm?.78:.42+L*.045,body);for(let i=0;i<(bm?8:L+2);i++)p.box(0,i*1.6/(bm?7:L+1),bm?-.6:-.44,.18,.12,.27,edge);finish(p);if(jet){const carrier=new B.TransformNode('canted rudder hinge',scene);carrier.parent=root;carrier.position.set(x,.25,-4.1);carrier.rotation.z=x<0?.18:-.18;p.node.parent=carrier;p.node.position.set(0,.25,-.12);}surfaces.rudders.push(p.node);}}
 if(slot==='weapons'){const count=jet?6:4,columns=jet?3:2;for(const side of[-1,1]){const cx=side*(jet?4.3:4.5),cy=jet?-.63:.44,cz=jet?-1.1:.25,p=add('launcher cassette '+side);p.box(cx,cy+.14,cz,jet?1.96:1.34,.19,jet?2.4:2.05,body).box(cx,cy+.37,cz,.20,.45,1.2,metal);for(let i=0;i<count;i++){const x=cx+(i%columns-(columns-1)/2)*.62,y=cy-.14-Math.floor(i/columns)*.65;p.rod([x,y-.07,cz-1.0],[x,y-.07,cz+.75],.05,edge);const round=buildMissile(scene,type,root,[x,y,cz]);round.launchIndex=i*2+(side>0?1:0);parts.push(round);}for(const z of[-.95,.95])p.box(cx,cy-.43,cz+z,jet?2.0:1.39,1.55,.13,metal);finish(p);}}
 if(slot==='weight'){const p=add('replacement monocoque', [0,0,0],.065),back=jet?-5.2:-4.8,front=jet?6.2:3.5;p.volume([-1.1,1.1,-.75,.82,back,front],(x,y,z)=>{let w=jet?(z>2.2?Math.max(.08,1.02*(6.3-z)/4.1):z<-2?.82+(z+2)*.15:1.02):(z<-1.1?.19+(z+4.8)*.15:z>2?.72-(z-2)*.16:.76),h=jet?(z>2.2?.68*Math.sqrt(Math.max(.03,(6.4-z)/4.2)):.65):(z<-1.1?.25+(z+4.8)*.08:.68),cy=!jet&&z<-1.1?-.14:0;const d=bm?Math.abs(x/w)*.42+Math.abs((y-cy)/h)*.42+Math.max(Math.abs(x/w),Math.abs((y-cy)/h))*.58:(x/w)**2+((y-cy)/h)**2;if(d>1)return null;if(!jet&&z>-.8&&z<1.5&&y>.08&&Math.abs(x)<w-.12)return null;return Math.abs(y+.19)<.10||Math.floor((z-back)*(bm?2:1+L*.25))%(bm?5:7-L)===0?edge:y<-.3?metal:body;});finish(p);const frame=add('external chassis ribs');for(const s of[-1,1])for(let i=0;i<(bm?7:L+2);i++){const z=-1.8+i*3.2/(bm?6:L+1),x=s*(jet?1.02:.76);frame.rod([x,-.32,z],[x+s*(bm?.18:.035*L),.34,z-.28],.055,metal);frame.box(x+s*.04,.08,z,.12,.12,.22,hot);}finish(frame);}
 return{root,parts,surfaces,emitters,choice,type};
}
export function installEquipment(plane,progress){plane.moduleEmitters=plane.baseEmitters||[];plane.fusionExhaust=plane.type==='ufo';plane.missileRounds=[];for(const slot of SLOTS){const choice=equipmentChoice(progress,plane.type,slot);if(!choice.level&&!choice.module)continue;const removed=plane.parts.filter(p=>(p.equipmentSlot||originalSlot(p.name))===slot);for(const p of removed){if(!p.node.isDisposed())p.node.dispose(false,false);}plane.parts=plane.parts.filter(p=>!removed.includes(p));const kit=buildEquipment(plane.root.getScene(),plane.type,choice,plane.root);plane.parts.push(...kit.parts);if(slot==='weapons')plane.missileRounds=kit.parts.filter(p=>Number.isFinite(p.launchIndex)).sort((a,b)=>a.launchIndex-b.launchIndex);if(slot==='controls')for(const k of['ailerons','flaps','elevators','rudders'])plane.surfaces[k]=kit.surfaces[k];if(slot==='engine'){plane.surfaces.props=kit.surfaces.props;plane.moduleEmitters=kit.emitters;plane.fusionExhaust=!!choice.module||plane.type==='ufo';}}
 plane.voxelCount=plane.parts.reduce((n,p)=>n+p.count,0);plane.partCount=plane.parts.length;
}
