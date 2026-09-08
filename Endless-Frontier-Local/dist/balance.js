// Shared balance, atmosphere and flight-envelope data. Mach ratings apply at local air temperature.
export const FLEET_BALANCE={
 prop:{stock:.26,workshop:.38,blackMarket:.85,priceScale:1,fuelIdle:.30,fuelRate:1.30},
 swift:{stock:.46,workshop:.66,blackMarket:1.35,priceScale:1.35,fuelIdle:.35,fuelRate:1.50},
 jet:{stock:.90,workshop:1.30,blackMarket:2.60,priceScale:1.8,fuelIdle:.40,fuelRate:2.10},
 ufo:{stock:1.35,workshop:2.10,blackMarket:5.00,priceScale:2.5,fuelIdle:.60,fuelRate:2.40}
};
export const STANDARD_GAIN={fuel:.10,efficiency:.04,engine:.08,aero:.04,controls:.06,weight:.03};
const SPEED_WEIGHT={engine:.6,aero:.3,weight:.1};
export function soundSpeed(altitude){return Math.sqrt(1.4*287.05*Math.max(216.65,288.15-.0065*Math.max(0,altitude)));}
export function ratedMach(type,choice){const b=FLEET_BALANCE[type];let mach=b.stock;for(const[slot,weight]of Object.entries(SPEED_WEIGHT)){const c=choice(slot),level=Math.max(0,Math.min(5,c.level||0));mach+=weight*(c.module?b.blackMarket-b.stock:(b.workshop-b.stock)*level/5);}return Math.min(5,b.blackMarket,Math.round(mach*1e6)/1e6);}
export function envelopeSpeed(spec,altitude){return (spec.maxMach??FLEET_BALANCE.ufo.blackMarket)*soundSpeed(altitude);}
// Smoothly approach the rated envelope. This only removes excess energy; it never adds speed.
export function governedSpeed(next,previous,limit,dt){if(next<=previous)return Math.min(next,limit);const approach=previous+Math.max(0,limit-previous)*(1-Math.exp(-Math.max(0,dt)*4));return Math.min(next,limit,approach);}
