# Endless Frontier

An endless Babylon.js flight game with four detailed voxel aircraft: the Kestrel ST–6, Meridian T–9, Peregrine X–2 and Astra Ω–1.

Serve `dist/` over HTTP. Babylon.js 9.25.0 is bundled; Google Fonts have system fallbacks. The game runs entirely in the browser.

## Gameplay

Fly north to extend the run's greatest distance. Earn $1 per 5 meters ($200/km), plus one-time near-miss bonuses of $60 for bird encounters and $150 for aircraft encounters. Safe landings after 500 meters earn $750 plus a match of the run's distance, close-pass and low-flying earnings. Crashes preserve earned money. Abandoning a run earns nothing.

Flying below 80 m above the local ground or water surface builds a continuous low-flying bonus. The rate rises smoothly toward $20/second at 5 m clearance or lower. Grounded, stopped, paused and ended runs earn no low-flying credit. The HUD shows the current rate and accumulated bonus.

Fuel powers the engines. Empty tanks cut thrust and exhaust effects; the aircraft remains controllable while gliding. Touching down safely ends the run. Terrain, water, buildings, trees, rock formations, power cables, birds, and aircraft can cause crashes.

The Kestrel is owned from the start. The Peregrine costs $2,500 and can be inspected in the hangar before purchase. Existing balances, records and aircraft upgrades are preserved; the Peregrine requires a purchase before its first flight after this update. Ownership and upgrades persist on this device.

Stock tuning separates a rugged utility propeller aircraft from a fast jet. At full forward power, stock fuel lasts about 75 seconds in the Kestrel and 45 seconds in the Peregrine, or 20 seconds with afterburner. Lower power extends endurance. Both aircraft support up to 40% reverse thrust, with engine spool through idle and fuel consumption while reversing. Reverse ground speed is limited to approximately 5 m/s.

Every crash breaks the exact struck obstacle into solid voxel fragments and detaches every modeled aircraft part, preserves its world transform, and gives it velocity, angular motion, gravity, and ground bounce. The camera follows the wreckage and widens to frame the debris for at least four active seconds before displaying results. Terrain impacts excavate a crater at 2 m local resolution with exposed walls, earth chunks and a raised rim. Paving and paint are cut out of the crater. Large wreck pieces can create up to two smaller secondary craters. The visible surface and ground collision use the same crater heights. Terrain scars, destroyed scenery and cables, individual destroyed traffic objects and simplified settled wreckage persist between runs and device reloads. The terrain and traffic seed remain stable. Runway surfaces automatically regenerate on each reset; the off-runway portions of the same blast remain damaged. A free Repair environment button in the hangar and results clears world damage and rebuilds the scenery without affecting the bank or upgrades. Aircraft are always repaired and reloaded automatically for each run, including saves from the prior version that recorded aircraft loss. Input cannot skip the sequence. Losing focus freezes this countdown. Earnings settle once before the sequence, so refreshing cannot double a payout.

## Content

- Eight biome families: meadows, farms, pine forests, alpine passes, redrock canyons, wetlands, coastal islands, cities.
- Twenty scenery archetypes, including tree varieties, cactus, boulders, rock spires and arches, houses, barns, silos, windmills, varied buildings, pylons, clouds, and service trucks.
- Eight bird types: gulls, geese, ravens, eagles, pelicans, parrots, cranes, ducks. Animated flock wings.
- Ten traffic types: gliders, biplanes, bush planes, twin turboprops, business jets, fighters, cargo aircraft, airliners, helicopters, airships.
- Six upgrade categories with five levels each, separately equipped per aircraft: fuel capacity, fuel efficiency, engine power, aerodynamics, controls, airframe weight. Each of the 120 aircraft/level combinations replaces a visible assembly: tanks, cooling manifolds, engine drives, main wings, every control surface, or fuselage. Replacement control surfaces keep animating.

## Controls

W/S or Up/Down pitch down/up. A/D or Left/Right roll. Q/E rudder. Shift increases throttle; Left Alt decreases throttle. Continue below idle to engage reverse thrust. Space afterburner or ground brakes. G landing gear. F flaps. C camera. P, Escape or R pause. Drag the scene to look/orbit; the hangar supports wheel zoom.

Touch controls and gamepads are supported. Gamepad left stick flies, right stick looks, triggers adjust throttle, shoulders control the rudder, A boosts, and B brakes.

Landing gear remains visible while retracting, hides when fully stowed, and becomes visible before its lowering animation. Gear is included in the actual-part crash breakup even when it was stowed at impact.

## Architecture

- `aircraft.js`, `voxels.js`: retained high-detail voxel aircraft and exposed-face part meshing.
- `catalog.js`: instanced scenery and animated sky-model catalogs at finer voxel resolution, with added tree branches and roots, building trim and roof equipment, pylons and insulators, vehicle wheels and lights, bird eyes and feathers, aircraft windows, seams, intakes and navigation lights.
- `terrain.js`, `terrain-worker.js`, `world.js`: deterministic terrain and crater height sampling, transferable worker-generated geometry, frame-budgeted scene assembly and retirement, reused scenery/surface instances, shared runway/road/crop/cable templates and six-second directional corridor preloading, capped at 10,240 m ahead to support extreme module speeds. A core 30-chunk window expands along the projected route. Epoch/request/revision checks reject stale work; colliders and visible geometry become active together. Without workers, terrain generation yields between rows. Initial loading waits for committed chunks, and streaming continues through crash and landing views.
- `traffic.js`: encounter generation, animation, swept air collision probes, and one-time completed-pass tracking.
- `physics.js`: force-based flight, fuel use, touchdown rules, static collision probes and power-line intersection checks.
- `progression.js`: validated local persistence, purchases, distance high-water mark, atomic run settlement and cinematic time gate.
- `fracture.js`: partitions original solid voxel cells into closed fragments without mutating shared catalog geometry.
- `crash.js`, `effects.js`: actual model-part and obstacle breakup, ground bounces, crater ejecta, billboard fireballs and smoke, impact flashes, ballistic sparks, dust and water spray, with synthesized engine and explosion audio. Particle layers use bounded reusable pools and remaining fuel affects the fireball.
- `game.js`: scene, camera, game states, responsive UI, inputs and origin changes.
- `controls.js`, `markers.js`: keyboard state, frame-rate-independent instrument smoothing and independently tracked markers for every nearby sky object. Offscreen contacts get direction arrows; distant bird labels collapse to compact symbols. Numeric HUD fields have fixed layouts.

Progress is saved in localStorage on the current device. The physics are designed for a flight game: aerodynamic translational forces with damped angular controls and optional stability assistance. Collisions use swept probes and model-sized volumes rather than simulating every voxel independently.

## Validation

Validated all JavaScript modules, local assets and DOM bindings. Babylon NullEngine checks covered all scenery and sky archetypes, runway takeoff for both aircraft, actual part breakup and rendering, stable debris motion, all 18 sky-model swept collision cases, one-time near-miss rewards, fuel cut-off, controlled landings, power-line collision, landing bonuses, upgrade persistence, duplicate payout protection, the four-second crash gate, bounded terrain streaming, and floating-origin height continuity.

Retune checks covered signed engine spooling, reverse braking, reverse fuel use, afterburner interlocks, aircraft purchase persistence, input chord debouncing, instrument smoothing, and gear visibility through retraction, extension and breakup. Runway surface geometry is now 0.5 m above the terrain pad, with a dedicated depth bias. Markings are embedded voxel colors in the asphalt itself. The centered 44 × 570 m footprint and collision height match the mesh, and the chase/hangar camera uses a larger near clip for depth precision.

In stock, assisted flight starting at 900 m, measured peak speeds before fuel exhaustion were approximately 175 knots for the Kestrel, 547 knots for the Peregrine, and 620 knots for the Peregrine with afterburner. These are game simulation checks, not certified aircraft performance figures; altitude, maneuvering and upgrades affect results.

Impact checks additionally covered voxel conservation across all 19 solid scenery archetypes and 18 sky models, untouched shared source geometry, runway crater cuts, ray intersection agreement with crater collision height, persistent damage through streaming and rebasing, first-hit preservation, and finite debris motion. Particle systems rendered using Babylon NullEngine. Reward checks covered the higher payouts, matched landing bonus, altitude-dependent accrual, ground/stopped guards and duplicate settlement prevention. Worker integration checks covered reset during pending generation, rebasing during staged assembly, crater revision invalidation and destruction after unload/reload. Twelve simultaneous contacts, including an offscreen object, received separate UI markers. WebGL visuals and browser interactions were not manually tested in this build.

Babylon.js is distributed under Apache License 2.0. The retained flight model draws on NASA's lift, angle-of-attack and induced-drag equations; aircraft specifications and game tuning are fictional.

Explosion billboards use a generated soft opacity texture and Babylon particle color, size and drag gradients; see the [Babylon particle documentation](https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/particles_tuning/). No external particle texture downloads are required.

The stock Kestrel now contains 118,816 voxels and the Peregrine 247,917 voxels, before upgrades. Player voxel pitch is 20% finer; scenery pitch is 30% finer and sky-model pitch 35% finer, with additional modeled detail. Catalog source geometry and solid voxel metadata remain shared between instances and support impact fragmentation.

## Black Market — Flight Update 5

A separate dark shop offers seven exclusive modules for each aircraft. The Kestrel Sunbird set uses emerald fusion ducts, forked wings, Helios cell banks, heat recyclers, servo feathers and a ceramic exoskeleton. The Peregrine Wraith set uses violet ram reactors, double-delta phase wings, antimatter vaults, a cryogenic spine, split vector blades and a faceted shell. Reactor circuits use separate emissive voxel geometry and selective glow; custom exhaust anchors follow replacement drives, including reverse thrust.

Every workshop and black-market card selects a live, orbitable Babylon 3D part inspection before purchase. Preview and installed geometry use the same assembly factory. Purchases have explicit prices, aircraft ownership checks, duplicate-purchase protection and separate per-aircraft inventories. Modules can be removed/reinstalled freely; buying a workshop level reinstalls standard hardware in that slot while retaining the owned module. Equipped modules multiply workshop performance benefits. Fusion drives burn three times as much fuel and ram drives 3.2 times as much, retaining fuel pressure despite their speed.

`equipment.js` owns the module catalog and replacement geometry; `preview.js` owns the independent rotating inspection scene. `damage.js` preserves world/traffic damage under a separate validated device-storage key, keeping existing progression intact. `supersonic.js` calculates Mach from airspeed and altitude-dependent sound speed, debounces Mach 1 crossings, and renders a condensation cone and expanding shock front. Sonic boom synthesis respects the Sound toggle.

Update 5 headless checks covered all 60 distinct workshop assemblies, the original 12 module purchase paths, saved ownership and installation, identical preview/installed voxel counts, control and gear animation, complete upgraded-aircraft breakup, stable damage across reset/reload/rebase, intact runway recovery beside a retained crater, individual traffic destruction with stable flock randomness, explicit full repair, and Mach crossing/cone/audio-trigger behavior. These are simulation and source checks; browser visuals were not manually inspected.

## Guided missiles — Flight Update 6

The Kestrel can buy $5,400 Firefly seeker racks (8 missiles, 0.75-second lock); the Peregrine can buy the $8,500 Nightjar strike array (12 missiles, 0.5-second lock). Both have matching live 3D shop previews and individual visible carried rounds that disappear when fired. T selects/cycles moving targets and then clears lock; X fires. Touch controls expose both actions, and gamepad Y selects / gamepad X fires. Unlocked shots follow the aircraft nose. Ammunition replenishes with the repaired aircraft every run.

`weapons.js` handles line-of-sight acquisition, lock loss, bounded seeker turning and predictive interception, swept relative-motion target collisions, static obstacle/cable collision, and terrain/water interception. Narrow terrain ridges and buildings block acquisition. Launch orientation uses a tested positive-Z nose basis. Selected targets retain their marker outside ordinary traffic-marker range. Missiles and debris follow floating-origin rebasing, pause with gameplay, and leave persistent world destruction. Spent carried rounds stay absent from aircraft crash breakup.

Hits add $300 for aircraft, $90 for birds, $100 for scenery, $150 for cables and $35 for terrain strikes. A run rewards each target/terrain cell once. Hit credits appear in the run total and results, settle with other run earnings, and contribute to the matched landing bonus. Impact breakup, fireballs, smoke, sparks and crater ejecta reuse the existing explosion system without ending the player's run.

Aircraft clearance now samples the belly, nose, tail and both wing tips against the actual local surface, including mountains, raised runways and water. Low-altitude pay and HUD AGL use the same clearance. Gear alerts no longer require a steep descent; separate forward terrain samples warn about rising ground.

Reset progress in the hangar opens an explicit new-game confirmation and clears bank, records, aircraft ownership, normal upgrades, black-market inventory, run history and all damage. Repair environment only resets world damage. Both operate on the game's own device-local records.

Update 6 headless checks cover old damaged-aircraft saves, independent missile purchases and reloads, launcher and flight-mesh alignment, moving-target guided interception, line-of-sight blocking/loss, swept collisions, original target fragmentation, static destruction persistence, terrain cratering at elevation, ammunition/cooldown limits, duplicate rewards, environment-only repair, full progress reset, integrated runway geometry and clearance across mountains and origin changes. Browser visuals were not manually tested.


## Expanded fleet — Flight Update 7

The Meridian T–9 costs $1,700 and sits between the Kestrel and Peregrine: twin turboprops, a swept low wing, twin tail booms, animated coaxial rotors and Fowler flaps. Its stock model contains 196,903 voxels across 40 parts. The $15,000 Astra Ω–1 is a stock UFO with a lenticular hull, eight radial lifting petals, four ion chambers, a ventral gravitic ring, distributed steering vanes and four retracting landing pads: 179,844 voxels across 66 parts. Powered gravitic lift supports low-speed flight and takeoff; it fades with speed and disappears when fuel runs out. Both remain fuel-limited.

Each of the four aircraft has six workshop categories with five unique purchased assemblies per category, plus seven exclusive black-market modules. Meridian's amber Tempest set includes arc turbines, split wings, capacitor tanks, heat recovery, servo feathers, Comet seeker combs and a lattice fuselage. Astra's magenta Paradox set includes warp chambers, phase petals, energy reservoirs, entropy matrices, vector lattices, Nova hunter arrays and a phase hull. Comet carries 10 missiles; Nova carries 16. The same geometry factory supplies each installed assembly and its live 3D inspection.

All purchased workshop levels remain owned. The workshop inspector lets players select Stock, every owned Mk level and the next purchasable level. Equipping an owned assembly is free; it replaces the active black-market module in that slot without losing that module. Modules can be removed and reinstalled freely. Per-aircraft equipped levels persist separately from the highest purchased level, and old saves migrate to their previously active highest levels. Balances, existing ownership, modules and world damage are preserved.

The flight integrator now rotates velocity for aerodynamic lift using an implicit midpoint step, so lift does no artificial numerical work. Gravity trades speed for altitude during climbs and altitude for speed during dives; thrust and drag determine the net change. Engine spool, fuel burn, boost eligibility, pitch authority and cockpit placement support aircraft-specific specs. Nose and tail terrain, clearance and collision probes match the longer new models.

Terrain streaming looks six seconds ahead, capped at 10.24 km, through a continuous corridor. Worker buffering and main-thread assembly throughput scale to Mach 5. Cleanup is interleaved with assembly so old cities do not delay the terrain being flown into. The scheduler uses a 3–4.5 ms budget and up to 512 small operations per frame. Worker jobs receive only craters that can affect their chunk; the persistent damage ledger remains complete. The visible fog range remains bounded to the detailed terrain corridor.

Cyan missile reload caches spawn randomly ahead of armed aircraft. Fly through the 36 m beacon ring to refill all missile rounds, including their visible carried models, while already launched missiles continue flying. Swept pickup checks prevent skipping caches at high speed. Full ammunition leaves a cache available. Each cache has its own smooth direction/distance marker, and caches support origin rebasing, pause and run reset.

Standard controllers: left-stick click (L3 / button 10) extends or retracts gear; right-stick click (R3 / button 11) cycles flaps through 0°, 15° and 30°. Presses are edge-triggered so holding a stick down performs one action. Existing stick, trigger, shoulder and missile controls remain available.

Validation: all JavaScript syntax, imports, 93 UI bindings and four selectors in each menu passed. NullEngine checks covered all 172 stock/workshop/black-market assemblies, distinct geometry at every level, ownership migration, all owned equip/remove paths, live-projectile reloads, swept pickups, stick-click debouncing, gear animation and full reset. All four aircraft passed matched unpowered climb/level/dive comparisons. Meridian runway takeoff measured 10.39 s at 47.21 m/s; Astra 1.17 s at 10.57 m/s. Powered Astra low-speed lift and fuel-off descent passed. A real-worker 15-second Mach 5 test with a 90° turn and origin rebases had zero missing current or next chunks; scheduler p95 was 4.65 ms. Filtered-crater worker buffers matched complete-history generation exactly. Existing missile guidance, target breakup, persistent destruction, runway, mountain-clearance and reward checks also passed. These are headless simulation and source checks; browser visuals and controller hardware were not manually tested.


## Balanced flight and smooth rotors — Update 8

Current rated Mach limits replace the previous uncapped speed balance:

| Aircraft | Stock | All Mk V | Full black market |
|---|---:|---:|---:|
| Kestrel ST–6 | 0.26 | 0.38 | 0.85 |
| Meridian T–9 | 0.46 | 0.66 | 1.35 |
| Peregrine X–2 | 0.90 | 1.30 | 2.60 |
| Astra Ω–1 | 1.35 | 2.10 | 5.00 |

Engine, aerodynamic and airframe assemblies contribute 60%, 30% and 10% of each tier's speed-rating improvement. Every standard level improves its contribution. Black-market parts replace their slot's standard statistics; they no longer multiply underlying workshop bonuses. Existing purchases and equipped levels remain saved and selectable. The stats, descriptions, comparison previews and hangar speed rating use the same calculation. Ordinary prices scale with aircraft tier and grow by 1.55 per level. Each black-market set retains all seven unique modules and actual replacement geometry.

Standard upgrades now add 8% propulsion, 10% capacity and 6% control authority per level, or reduce drag by 4%, fuel consumption by 4% and mass by 3% per level. Black-market propulsion, aerodynamics, mass, controls, fuel reserves, efficiency and missile capabilities are retuned as a coherent tier. Jet/UFO top ratings use boost. Full-throttle stock endurance is approximately 63/54/40/33 seconds (Kestrel/Meridian/Peregrine/Astra), and maximum-standard endurance is 117/101/75/63 seconds. Full black-market endurance is approximately 94/81/60/47 seconds; continuous boost divides jet/UFO duration by 2.25. Fast modules still consume fuel quickly.

`balance.js` owns the rating table, standard increments, atmosphere model and smooth speed governor. Gravity still trades altitude and airspeed below the limit. The governor only removes excess speed and approaches the rated limit smoothly. A final local-temperature cap prevents dives, low atmospheric density or boost from exceeding the rating: Astra cannot exceed Mach 5 even at high altitude. At 1 km with level trim and maximum power, all twelve stock/standard/black-market builds reached 99.5% of their ratings before fuel exhaustion. The full Astra reached that threshold in about 9.8 seconds with 20.7 seconds of continuous boosted fuel.

`animation.js` advances rotor RPM and phase using exact exponential integration at every display refresh; the render loop remains uncapped and flight physics still run at 120 Hz. Translucent annular exposure meshes blend in at high blade-passage rates to prevent frozen/backward strobing. Intricate original blades remain fully visible at low RPM and during slow shop inspection, and are restored to opaque original parts before crash breakup. Blur helpers never count as physical parts or debris. Control-surface interpolation is exponential, and rotors wind down during successful landing cinematics.

Rendering adapts pixel and shadow-map resolution toward a 60 FPS budget without reducing voxel geometry, upgrade detail, traffic diversity or collision simulation. The counter reports measured FPS. Open part-preview shops suspend the obscured hangar rendering so only the active preview scene is drawn. Actual display rate still depends on the screen, GPU, browser and scene load; headless tests do not certify browser FPS.

Validation: 12 finite-fuel speed stages, 288 speed-ceiling cases across aircraft/tiers/altitudes/climb/dive/fuel states, 3,528 mixed-loadout progression comparisons, and all four unpowered climb/dive checks passed. Rotor checks cover six propeller assemblies including luminous nested blades, geometry bounds, blur exclusion from actual parts, crash opacity restoration, zero-time pause, and matching RPM/phase at 60/120/240 Hz. Adaptive-resolution checks cover steady 60 Hz, sustained 30 and 8.3 FPS overload, and recovery. Existing guided-missile, terrain damage, runway and reward regression checks remain applicable. Browser visuals and hardware FPS were not manually tested.
