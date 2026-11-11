'use strict';
(() => {
const KEY='simple-recipes.v1', VERSION=1;
const RECURRING_PREPPER_IDS=new Set(['propane','gas-jerry-can','vehicle-half-tank','lighter','aa-batteries','aaa-batteries','fuel-source','water-purification']);
const CATEGORIES=['Grains & pasta','Canned foods','Beans & lentils','Baking','Oils & seasonings','Breakfast','Produce','Refrigerated','Freezer','Other'];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>globalThis.crypto?.randomUUID?.()||`id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const normalize=s=>s.trim().toLocaleLowerCase();
const positive=v=>Number.isFinite(Number(v))&&Number(v)>0&&Number(v)<=1000000;
const sampleBadge=x=>x.sample?'<span class="badge">Sample</span>':'';
function seedPrepper(){
 const guide={label:'Ontario emergency preparedness',url:'https://www.ontario.ca/page/be-prepared-emergency'};
 const power={label:'Canada: preparing for power outages',url:'https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/hazards-emergencies/power-outages/how-prepare.html'};
 const row=(id,name,category,inventoried,priority,note,tips,sources=[guide])=>({id,name,category,inventoried,priority,note,tips,sources,reviewEveryMonths:RECURRING_PREPPER_IDS.has(id)?3:0,reviewDueAt:null});
 return [
 row('water-purification','Water purification','Water',false,true,'',[
  'Use bottled water or obey the local advisory first. Boiling and bleach cannot remove fuel, toxic chemicals or heavy metals; use another safe source if contamination is suspected or a do-not-consume / do-not-use notice applies.',
  'First clarify cloudy water: filter through a clean cloth or coffee filter, let particles settle and pour off the clearer water. This step alone does not disinfect it.',
  'Boil: bring clarified water to a rolling boil for 1 minute (3 minutes above 2,000 metres, following CDC guidance). Cool and store covered in a clean, food-grade container. Boiling is preferred for killing germs, including parasites.',
  'Bleach chart: for plain, unscented household chlorine bleach at approximately 5.25% sodium hypochlorite only. Follow product drinking-water directions when supplied; check the strength and use a clean dropper. Do not use scented, splashless, colour-safe or cleaner-added products. Never mix bleach with other chemicals.',
  'Clear water at room temperature: use 2 drops per litre. Stir, cover and wait 30 minutes. If no slight chlorine smell remains, repeat the original dose and wait another 15 minutes. Smell alone cannot confirm water is safe.',
  'Cloudy or cold water below 10°C: clarify first, use 4 drops per litre, then stir, cover and wait 1–2 hours. If water remains very dirty, choose a safer source. This chart treats drinking water, not containers or surfaces.',
  'Filters and tablets: ordinary pitcher filters do not make unsafe water safe. Check the exact filter’s independently certified pathogen claims; many portable filters do not remove viruses. Follow water-treatment tablet directions for the organism, volume and contact time. Bleach is less effective than boiling against Giardia and Cryptosporidium.',
  'Readiness: check bleach age and label, treatment-tablet expiry dates, filter condition, a clean dropper, a pot and covered food-grade containers every 3 months. Follow the product storage and replacement instructions; bleach loses strength over time. Keep treated water separate from untreated water.'
 ],[
  {label:'HealthLink BC: disinfecting drinking water',url:'https://www.healthlinkbc.ca/healthlinkbc-files/disinfecting-drinking-water'},
  {label:'CDC: emergency water treatment',url:'https://www.cdc.gov/water-emergency/about/'},
  {label:'EPA: emergency disinfection and fresh bleach',url:'https://www.epa.gov/ground-water-and-drinking-water/emergency-disinfection-drinking-water'}
 ]),
 row('fuel-source','Fuel source','Fuel & readiness',false,true,'',[
  'Cooking and boiling water: keep fuel that matches your stove, a suitable pot with a lid and a reliable lighter. Test the complete setup before an outage; fuel needs depend on the stove, weather, water volume and cooking time.',
  'Wood and a saw: use dry, seasoned, untreated wood. Secure it on a stable support and use a suitable hand or folding saw to cut pieces short enough for the stove; sawing shortens wood but does not split thick logs into kindling. Keep hands clear of the blade and wear eye protection. Prepare small kindling in advance. Never burn painted, pressure-treated or glued wood, plywood, rubbish or plastics.',
  'Propane: a compatible outdoor camping stove or barbecue offers adjustable heat for cooking and boiling water. Match the cylinder, regulator and hose to the appliance instructions; do not improvise adapters. Check the fuel supply and connections as directed, and have cylinders refilled or exchanged by an authorised supplier. Store cylinders upright outdoors in a ventilated location away from heat and ignition sources, following local rules.',
  'Small sticks for a rocket stove: use dry twigs, kindling and small untreated wood pieces sized to the feed opening. Add small amounts as needed without blocking the air path, following the stove manual. Keep a dry reserve; wet sticks are harder to light and produce more smoke. These stoves need regular attention and a stable pot support.',
  'Solo Stove camping stove: wood-burning camp models such as Lite use dry twigs and small wood pieces. Follow the exact model manual for fuel size, loading and pot support. Prepare fuel before lighting and keep air vents clear. A gas-canister camping stove instead needs its specified gas fuel; never put sticks into it. Low smoke does not mean carbon-monoxide-free.',
  'Outdoor use only: use these portable fuel-burning stoves in open air, away from doors, windows and vents, with the clearances in the manual. Never use them inside a home, garage, tent or vehicle, even with a door or window open. Place on a stable, noncombustible surface, keep children and pets away, never leave unattended and keep an appropriate way to extinguish a fire nearby. Let the stove and ashes cool fully before handling.',
  'Check local fire rules and current restrictions before using wood or sticks; a contained flame or a cooking purpose does not automatically make burning legal. Toronto restricts open-air and solid-fuel burning: check with Toronto Fire Services before relying on a wood-burning setup at home.',
  'Boiling drinking water: follow the local health advisory. For microbiological contamination, Health Canada advises a rolling boil for at least 1 minute, then cool safely in a clean, covered container. Boiling does not remove fuel, chemicals or heavy metals; use a safe alternative water supply under a do-not-consume or do-not-use advisory.',
  'Readiness review: every 3 months, check that wood and kindling are dry, propane is available, the saw and lighter work, and the stove and pot are ready. Clear Need to acquire after preparing or replenishing your fuel; Inventoried remains a separate checkmark.'
 ],[
  {label:'Health Canada: preventing carbon monoxide exposure',url:'https://www.canada.ca/en/health-canada/services/air-quality/pollutants/carbon-monoxide/preventing-exposure.html'},
  {label:'Health Canada: boil-water guidance',url:'https://www.canada.ca/en/health-canada/services/publications/healthy-living/guidance-issuing-rescinding-boil-water-advisories-canadian-drinking-water-supplies.html'},
  {label:'Solo Stove Lite: fuel and safe use',url:'https://www.solostove.com/ca/en-ca/p/SS1-FBA'},
  {label:'Ontario: outdoor fire restrictions',url:'https://www.ontario.ca/page/outdoor-fire-restrictions'},
  {label:'Toronto: outdoor fires and solid-fuel appliances',url:'https://www.toronto.ca/home/311-toronto-at-your-service/find-service-information/article/?kb=kA06g000001cwNkCAI'},
  {label:'Ottawa Fire Services: propane safety',url:'https://ottawa.ca/en/health-and-public-safety/ottawa-fire-services/fire-safety/outdoor-fire-safety/propane-safety'}
 ]),
 row('backup-shovel','Backup shovel','Tools & cleanup',false,true,'',['Useful for clearing snow, loose soil or light debris so you can reach exits, supplies or a vehicle.','Store it where you can reach it without entering a blocked area. Wear suitable gloves and footwear; do not use it near live electrical equipment or damaged utility lines.']),
 row('duct-tape','Duct tape','Tools & cleanup',false,true,'',['Useful for temporary repairs, securing protective sheeting and labelling or bundling supplies.','Keep the roll dry and protected from extreme temperatures. It is not a substitute for proper structural, electrical or gas-line repairs.']),
 row('lighter','Lighter','Light & essentials',false,true,'',['Useful for lighting a compatible outdoor cooking appliance or emergency candle when appropriate.','Keep it away from children, heat and fuel containers. Test it periodically and check remaining fuel; follow the lighter and appliance instructions.','Battery lights avoid the fire risk of an open flame. Never use a lighter to check a gas leak.'],[{label:'Ontario fire safety',url:'https://www.ontario.ca/page/fire-safety-home'}]),
 row('candles','Candles','Light & essentials',false,true,'',['A backup light source if safer battery lighting is unavailable. Keep suitable holders with them.','Use a stable, noncombustible holder away from anything that can burn. Never leave a candle unattended or burning while sleeping.','Prefer flashlights or battery lanterns, especially around children, pets or disrupted living spaces.'],[{label:'Ontario fire safety',url:'https://www.ontario.ca/page/fire-safety-home'}]),
 row('aa-batteries','AA batteries','Power',false,true,'',['Useful spares for compatible flashlights, radios and other emergency equipment. Check each device uses AA rather than AAA.','Keep batteries in their packaging with terminals protected. Follow the package storage guidance and check dates and device operation periodically.','Do not mix old and new batteries or different types in one device. Inspect for leaks or damage and replace as directed by the manufacturer.'],[power]),
 row('aaa-batteries','AAA batteries','Power',false,true,'',['Useful spares for compatible headlamps, small lights and other emergency equipment. Keep a note of which devices need AAA.','Keep batteries in their packaging with terminals protected. Follow package storage guidance and review the dates and your spare supply periodically.','Check the device before relying on it. Do not mix old and new batteries or different types.'],[power]),
 row('contractor-bags','Contractor bags','Tools & cleanup',false,true,'',['Useful for containing debris, separating wet gear and protecting supplies during a short emergency.','Keep some with work gloves. Ordinary contractor bags are not food-grade: do not use them to store drinking water or loose food.']),
 row('toolkit','Toolkit','Tools & cleanup',false,true,'',['Useful for small repairs, opening access panels and tightening loose fittings. Include familiar hand tools, a flashlight and work gloves.','Keep it accessible and check that essential tools are present. Leave electrical, gas and structural repairs to qualified people.']),
 row('berkey-filter','Berkey filter','Water',false,true,'',['A gravity-fed filter may help with water preparation without electricity, within the capabilities of its exact filter elements.','Check independently certified contaminant-reduction claims, element condition and maintenance instructions. Do not assume a brand or filter makes any source safe.','Follow local boil-water or do-not-use advisories. Keep stored drinking water as a separate backup.'],[{label:'Health Canada: choosing water treatment',url:'https://www.canada.ca/en/health-canada/services/environment/drinking-water/treatment.html'}]),
 row('battery-small','Battery power station — small','Power',true,false,'',['Useful for keeping a phone, radio and small USB lights charged during a short outage.','Keep the correct cables together, check charge periodically and test the devices you plan to use. Follow manufacturer charging and ventilation instructions.'],[power]),
 row('battery-large','Battery power station — large','Power',false,true,'',['Useful for longer backup power or larger compatible loads when wall power is unavailable.','Check continuous output, startup load and expected runtime against your actual devices. Test in advance rather than assuming it can run a fridge or medical equipment.','Keep charged and follow the manufacturer’s temperature, charging and ventilation guidance.'],[power]),
 row('solar-panel','Solar panel','Power',true,false,'',['Useful for replenishing a compatible battery power station during an extended outage.','Store its cables and adapters with it. Verify voltage, connector and input limits, and test the complete setup before an emergency.','Output varies with sunlight, weather and shading; keep another charging plan.'],[power]),
 row('clean-water','Clean drinking water','Water',false,true,'',['Stored drinking water supports drinking, cooking and basic hygiene when normal supply is interrupted.','Ontario recommends planning 4 litres per person per day for an emergency kit. Include the people and duration you are planning for.','Use suitable food-grade containers, keep them sealed and follow label or container-cleaning guidance. Rotate stored supplies and follow local water advisories.'],[guide]),
 row('propane','Propane tank','Fuel & readiness',true,true,'Not fully filled — refill needed',['Useful for an approved outdoor cooking appliance when normal cooking arrangements are unavailable.','Check the supply before an outage and have an authorised supplier refill or exchange the cylinder as needed.','Keep the cylinder upright in a ventilated outdoor storage area away from heat and ignition sources. Use propane barbecues outdoors only.'],[{label:'Ottawa Fire Services: propane safety',url:'https://ottawa.ca/en/health-and-public-safety/ottawa-fire-services/fire-safety/outdoor-fire-safety/propane-safety'},{label:'Ontario fire safety',url:'https://www.ontario.ca/page/fire-safety-home'}]),
 row('gas-jerry-can','Fill gas jerry can','Fuel & readiness',false,true,'Fill and check safe storage',['A fuel reserve can help with transport or compatible fuel-powered equipment when stations are unavailable.','Use a tightly capped, labelled, approved gasoline container and follow local storage limits and fire-safety guidance. Store away from the home and ignition sources.','Plan safe rotation; avoid stockpiling beyond what you can legally and safely store. Never use gasoline in a propane appliance or a battery power station.'],[{label:'Brampton Fire: garage and fuel safety',url:'https://www.brampton.ca/EN/residents/Fire-Emergency-Services/Pages/Garage-Safety.aspx'}]),
 row('vehicle-half-tank','Keep gas tank at least 50%','Fuel & readiness',false,true,'Ongoing readiness check',['Keeping the vehicle at least half full leaves more flexibility for evacuation, errands or reaching help when pumps are unavailable.','Check during routine trips and before a forecast outage. This is a recurring habit, not a one-time purchase.'],[power])
 ];
}
function threeMonthsFrom(now=new Date()){
 const next=new Date(now.getTime()),day=next.getUTCDate();next.setUTCDate(1);next.setUTCMonth(next.getUTCMonth()+3);
 const end=new Date(next.getTime());end.setUTCMonth(end.getUTCMonth()+1);end.setUTCDate(0);next.setUTCDate(Math.min(day,end.getUTCDate()));return next.toISOString();
}
function refreshPrepperReviews(d,now=new Date()){
 let updated=false;const recurring=RECURRING_PREPPER_IDS;
 for(const x of d.prepperItems||[]){
  if(x.reviewEveryMonths===undefined){x.reviewEveryMonths=recurring.has(x.id)?3:0;updated=true;}
  if(x.reviewDueAt===undefined){x.reviewDueAt=null;updated=true;}
  if(!x.reviewEveryMonths||x.priority){if(x.reviewDueAt!==null){x.reviewDueAt=null;updated=true;}continue;}
  if(!x.reviewDueAt){x.reviewDueAt=threeMonthsFrom(now);updated=true;}
  else if(Date.parse(x.reviewDueAt)<=now.getTime()){x.priority=true;x.reviewDueAt=null;updated=true;}
 }
 return updated;
}
function addPrepperEssentials(d){
 const update='prepper-essentials-2026-11-02';if(d.appliedUpdates?.includes(update)||!d.prepperItems.length)return false;
 const additions=new Set(['backup-shovel','duct-tape','lighter','candles','aa-batteries','aaa-batteries']);
 for(const x of seedPrepper().filter(x=>additions.has(x.id)))if(!d.prepperItems.some(old=>old.id===x.id||normalize(old.name)===normalize(x.name)))d.prepperItems.push(x);
 d.appliedUpdates=[...(d.appliedUpdates||[]),update];return true;
}
function addWeeklyStaples(d){
 const update='weekly-staples-2026-11-02';if(d.appliedUpdates?.includes(update)||!d.ingredients.length)return false;
 const template=seed(),ids=['protein-powder','coffee-regular','coffee-decaf','vitamin-c-packets','vitamin-b-pills','multivitamin','miso-paste','chopped-olives','canned-sardines'];
 for(const id of ids){const next=template.staples.find(s=>s.id===id);if(!d.staples.some(s=>s.id===id)&&!d.ingredients.some(i=>i.id===next.ingredientId||normalize(i.name)===normalize(next.name))){d.staples.push(next);d.ingredients.push(template.ingredients.find(i=>i.id===next.ingredientId));}}
 const old=d.staples.find(s=>s.id==='green-onion'),next=template.staples.find(s=>s.id==='green-onion'),i=d.ingredients.find(i=>i.id===old?.ingredientId);
 if(old?.sample&&i?.sample){old.name=next.name;old.category=next.category;old.notes=next.notes;i.name=next.name;i.category=next.category;}
 d.appliedUpdates=[...(d.appliedUpdates||[]),update];return true;
}
function addFuelSource(d){
 const update='prepper-fuel-source-2026-11-11';if(d.appliedUpdates?.includes(update)||!d.prepperItems.length)return false;
 const next=seedPrepper().find(x=>x.id==='fuel-source');
 if(!d.prepperItems.some(x=>x.id===next.id||normalize(x.name)===normalize(next.name)))d.prepperItems.push(next);
 d.appliedUpdates=[...(d.appliedUpdates||[]),update];return true;
}
function addWaterPurification(d){
 const update='prepper-water-purification-2026-11-11';if(d.appliedUpdates?.includes(update)||!d.prepperItems.length)return false;
 const next=seedPrepper().find(x=>x.id==='water-purification');
 if(!d.prepperItems.some(x=>x.id===next.id||normalize(x.name)===normalize(next.name)))d.prepperItems.push(next);
 d.appliedUpdates=[...(d.appliedUpdates||[]),update];return true;
}
function ensurePrepper(d){let updated=false;if(d.prepperItems===undefined){d.prepperItems=seedPrepper();updated=true;}const added=addPrepperEssentials(d),fuelAdded=addFuelSource(d),waterAdded=addWaterPurification(d);return refreshPrepperReviews(d)||updated||added||fuelAdded||waterAdded;}
function reviewStatus(x){if(!x.reviewEveryMonths)return '';return `<p class="small review-status">${x.priority?'Repeats 3 months after clearing the star':`Due again: ${escape(new Date(x.reviewDueAt).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}))}`}</p>`;}

function seed(){
 const staples=[], ingredients=[];
 const add=(id,name,category,keep,unit,buy,longStorage,notes)=>{const ingredientId='i-'+id;staples.push({id,name,category,keep,unit,buy,longStorage,notes,ingredientId,sample:true});ingredients.push({id:ingredientId,name,category,purchaseQty:buy,purchaseUnit:unit,stapleId:id,sample:true});};
 add('rice','Rice bags','Grains & pasta',2,'bags',1,true,'Keep in a sealed, dry, pest-resistant container in a cool place. Rotate older packages first.');
 add('pasta','Dried pasta','Grains & pasta',4,'packs',1,true,'Keep dry in sealed packaging; protect from moisture and pests.');
 add('tuna','Tuna canned','Canned foods',6,'cans',2,true,'Store unopened cans in a cool, dry cupboard. Avoid damaged or bulging cans; follow package guidance.');
 add('black-beans','Black turtle beans','Beans & lentils',2,'bags',1,true,'Use airtight packaging in a cool, dry place. Older beans may take longer to soften.');
 add('canned-beans','Canned black beans','Canned foods',4,'cans',2,true,'Store unopened cans cool and dry; check packaging and rotate regularly.');
 add('oil','Olive oil','Oils & seasonings',1,'bottle',1,true,'Keep tightly closed away from heat and light. Storage life varies by oil and packaging.');
 add('salt','Salt','Oils & seasonings',1,'container',1,true,'Keep dry and tightly covered.');
 add('mayo','Kewpie mayo','Oils & seasonings',1,'bottle',1,false,'Follow label instructions; refrigerate after opening.');
 add('nori','Nori sheets','Grains & pasta',2,'packs',1,true,'Keep airtight and dry. Use promptly after opening for best texture.');
 add('smoked-salmon','Smoked salmon (frozen)','Freezer',2,'packs',1,false,'Keep frozen according to the label. Thaw in the refrigerator and follow package directions for use after thawing.');
 add('oat-milk','Oat milk','Breakfast',2,'cartons',1,true,'For extended storage, choose shelf-stable cartons. Keep unopened cartons as labelled and refrigerate after opening. Chilled oat milk needs refrigeration throughout.');
 add('organic-cereal','Organic cereal','Breakfast',2,'boxes',1,true,'Keep in a cool, dry cupboard. Seal the inner bag after opening to protect from moisture and pests; follow the package date.');
 add('soba-noodles','Soba buckwheat noodles','Grains & pasta',2,'packs',1,true,'Keep dried noodles sealed, cool and dry. Check the label: many soba noodles also contain wheat.');
 add('soba-sauce','Soba sauce (cold soba)','Oils & seasonings',1,'bottle',1,true,'Choose shelf-stable bottled sauce for pantry storage. Follow label directions for dilution and refrigeration after opening.');
 add('green-onion','Green onion (chopped / frozen)','Freezer',1,'bunch',1,false,'Wash, dry and chop before freezing in a sealed container or bag. Label the date and take out portions as needed, especially for cooked dishes.');
 add('frozen-blueberries','Frozen blueberries','Freezer',2,'bags',1,false,'Keep frozen according to the package. Follow any package directions for preparation and use after thawing.');
 add('pork-chops','Pork chops (bone-in)','Freezer',2,'packs',1,false,'Freeze well wrapped if not cooking soon; thaw in the refrigerator. Save clean uncooked bones separately for congee and freeze promptly if needed.');
 add('garlic-powder','Garlic powder','Oils & seasonings',1,'jar',1,true,'Keep tightly closed in a cool, dry cupboard away from steam and direct heat.');
 add('paprika','Paprika powder','Oils & seasonings',1,'jar',1,true,'Store tightly sealed away from light, moisture and heat; colour and flavour fade with time.');
 add('japanese-curry','Japanese curry cubes','Oils & seasonings',2,'boxes',1,true,'Store unopened as labelled, cool and dry. Follow package directions after opening; check ingredients for wheat or dairy if relevant.');
 add('protein-powder','Protein powder','Breakfast',1,'tub',1,true,'Keep tightly closed in a cool, dry place. Use a dry scoop and follow the package date and storage instructions.');
 add('coffee-regular','Coffee — regular','Breakfast',1,'bag',1,true,'Keep sealed away from heat, moisture and light. Rotate opened coffee for freshness.');
 add('coffee-decaf','Coffee — decaf','Breakfast',1,'bag',1,true,'Keep sealed away from heat, moisture and light. Label clearly to distinguish it from regular coffee.');
 add('vitamin-c-packets','Vitamin C packets (Costco)','Other',1,'box',1,true,'Keep packets in their original packaging, cool and dry. Check package dates and follow the product label.');
 add('vitamin-b-pills','Vitamin B pills','Other',1,'bottle',1,true,'Keep the specific product and strength labelled in its original bottle. Follow label storage and use instructions and check the expiry date.');
 add('multivitamin','Multivitamin','Other',365,'tablets per adult',365,true,'Reserve target: 365 tablets per adult; adjust for the number of adults in your household. Store in original packaging and follow the label for use.');
 const multivitamin=ingredients.find(i=>i.id==='i-multivitamin');multivitamin.purchaseQty=1;multivitamin.purchaseUnit='bottle';
 add('miso-paste','Miso paste','Refrigerated',1,'tub',1,false,'Follow the package refrigeration instructions, especially after opening. Keep covered and use a clean spoon.');
 add('chopped-olives','Chopped olives','Canned foods',2,'jars',1,true,'Store unopened jars as labelled. Refrigerate after opening and use a clean utensil.');
 add('canned-sardines','Canned sardines','Canned foods',4,'cans',2,true,'Store unopened cans cool and dry; rotate and avoid damaged cans. Follow label instructions for leftovers after opening.');
 const fresh=(id,name,category,unit)=>ingredients.push({id,name,category,purchaseQty:1,purchaseUnit:unit,stapleId:null,sample:true});
 fresh('i-tomatoes','Canned tomatoes','Canned foods','can');
 fresh('i-bread','Sandwich bread','Breakfast','loaf');fresh('i-onion','Onion','Produce','onion');fresh('i-garlic','Garlic','Produce','bulb');fresh('i-lemon','Lemon','Produce','lemon');
 const line=(ingredientId,quantity,unit)=>({id:uid(),ingredientId,quantity,unit});
 const recipes=[
 {id:'r-cold-soba',name:'Cold soba noodles',servings:2,prep:10,cook:8,tags:['Quick meals','Budget friendly'],ingredients:[line('i-soba-noodles','200','g'),line('i-soba-sauce','as labelled','for 2 servings'),line('i-green-onion','1','stalk'),line('i-nori','1','sheet')],instructions:'1. Prepare soba dipping sauce according to the bottle, diluting concentrated sauce as directed. Chill.\n2. Cook soba according to its package. Drain, rinse well under cold running water and drain again.\n3. Slice green onion and tear nori into thin strips.\n4. Serve noodles topped with nori, with sauce and green onion alongside. Dip small portions into the sauce.',notes:'The recipe amount of sauce depends on whether it is concentrated or ready to use. Purchase size remains a bottle.',sample:true},
 {id:'r-paprika-pork',name:'Air fryer boneless garlic and paprika pork chops',servings:4,prep:5,cook:12,tags:['Quick meals','Lactose free','Air fryer'],ingredients:[line('i-pork-chops','4','pork chops, bones removed'),line('i-garlic-powder','1','teaspoon'),line('i-paprika','1','teaspoon'),line('i-oil','1','tablespoon'),line('i-salt','1/2','teaspoon')],instructions:'1. Remove bones before cooking, inspect for any bone fragments, and save bones promptly in the refrigerator or freezer if making congee. Pat the boneless chops dry. No need to bring them to room temperature.\n2. Rub both sides with olive oil. Season with garlic powder, paprika, salt and black pepper if desired.\n3. Preheat the air fryer to 190°C (375°F) for about 3 minutes. Arrange chops in one layer without overlapping.\n4. Air fry at 190°C (375°F), flipping halfway: about 7–9 minutes for 1/2-inch chops, 9–12 minutes for 3/4-inch, or 12–15 minutes for 1-inch. These are estimates; start checking early.\n5. Check the thickest part with a thermometer. Cook to 63°C (145°F), then rest at least 3 minutes before serving. Cook in batches if needed.',notes:'Boneless pork loin is lean: avoid overcooking. Refrigerate leftovers within 2 hours; freeze portions for later. Reheat cooked leftovers to 74°C (165°F). Raw bones can be used for the linked pork-bone congee after careful straining.',sample:true},
 {id:'r-pork-congee',name:'Pork-bone congee',servings:4,prep:15,cook:120,tags:['Budget friendly','Lactose free'],ingredients:[line('i-pork-chops','bones from 2','pork chops'),line('i-rice','1/2','cup uncooked'),line('i-green-onion','2','stalks'),line('i-salt','to taste','')],instructions:'1. Use clean raw pork-chop bones saved during preparation, with any attached meat. Put bones in a pot, cover with water, bring to a boil and simmer gently for about 60 minutes.\n2. Lift out the bones. Strain the broth through a fine mesh sieve lined with clean food-safe cloth to catch small bone fragments. Carefully remove meat, checking for fragments; discard the bones.\n3. Return strained broth to a clean pot. Add rinsed rice and enough water for about 6 cups liquid. Simmer gently for 45–60 minutes, stirring and adding water as needed, until the rice breaks down.\n4. Add the checked meat and heat through. Season and top with sliced green onion. Cool leftovers promptly and refrigerate.',notes:'Use bones saved from the pork-chop meal rather than buying another pack if you already have them. Recipe and shopping quantities remain independent; the app does not deduct stock.',sample:true},
 {id:'r-japanese-curry',name:'Simple Japanese curry rice',servings:2,prep:10,cook:30,tags:['Budget friendly'],ingredients:[line('i-japanese-curry','as labelled','for 2 servings'),line('i-onion','1','onion'),line('i-oil','1','tablespoon'),line('i-rice','1','cup uncooked')],instructions:'1. Cook rice according to the package. Slice the onion.\n2. Soften onion in oil in a saucepan. Add the amount of water specified on the curry-cube package for two servings and simmer until the onion is tender.\n3. Turn off the heat and stir in the package-specified amount of curry cubes until dissolved.\n4. Return to low heat and stir until thickened, following the package instructions. Serve over rice.',notes:'A simple pantry base. Add cooked vegetables or meat if available. Curry cube strengths and serving sizes vary, so follow the package rather than using a fixed cube count.',sample:true},
 {id:'r-salmon-rice',name:'Rice and smoked salmon',servings:2,prep:10,cook:20,tags:['Quick meals','Lactose free'],ingredients:[line('i-rice','1','cup uncooked'),line('i-smoked-salmon','150','g'),line('i-mayo','1','tablespoon'),line('i-nori','1','sheet')],instructions:'1. Thaw the smoked salmon in the refrigerator according to its label. Check whether the product is ready to eat or requires cooking; follow the package instructions.\n2. Cook rice according to its package.\n3. Divide warm rice between bowls. Add the prepared salmon, a little Kewpie mayo and torn nori.\n4. Serve promptly. Refrigerate leftovers promptly and follow the salmon label for use after thawing.',notes:'Purchase amounts are independent of recipe amounts. Choose smoked salmon that suits your intended use and follow its storage directions.',sample:true},
 {id:'r-onigiri',name:'Tuna mayo onigiri',servings:4,prep:15,cook:20,tags:['Budget friendly','Lactose free'],ingredients:[line('i-rice','1','cup uncooked'),line('i-tuna','1','can, drained'),line('i-mayo','1','tablespoon'),line('i-nori','2','sheets'),line('i-salt','1/4','teaspoon')],instructions:'1. Cook the rice following its package instructions. Let it cool just enough to handle safely.\n2. Mix the drained tuna with mayonnaise.\n3. With damp, lightly salted hands, shape rice around small portions of filling.\n4. Wrap with nori just before eating.\n5. Refrigerate leftovers promptly; do not leave cooked rice or tuna filling at room temperature.',notes:'Makes 4 onigiri. Check mayonnaise and nori labels for dietary needs.',sample:true},
 {id:'r-sandwich',name:'Tuna sandwich',servings:2,prep:10,cook:0,tags:['Quick meals','Budget friendly','Lactose free'],ingredients:[line('i-tuna','1','can, drained'),line('i-mayo','2','tablespoons'),line('i-bread','4','slices'),line('i-lemon','1','teaspoon juice')],instructions:'1. Drain tuna thoroughly and flake with a fork.\n2. Stir in mayonnaise and lemon juice.\n3. Divide between two sandwiches. Trim crusts if you like, then cut in halves.\n4. Serve promptly or refrigerate.',notes:'Use soft dairy-free bread and check condiment labels if avoiding lactose.',sample:true},
 {id:'r-rice-beans',name:'Weeknight rice and beans',servings:4,prep:10,cook:25,tags:['Budget friendly','Lactose free','Freezer friendly'],ingredients:[line('i-rice','1','cup uncooked'),line('i-canned-beans','1','can, drained'),line('i-tomatoes','1','can'),line('i-onion','1','onion'),line('i-oil','1','tablespoon'),line('i-salt','to taste','')],instructions:'1. Cook rice according to the package.\n2. Dice onion and soften in oil in a separate pan.\n3. Add tomatoes and drained beans. Simmer for 10–15 minutes, stirring occasionally.\n4. Season to taste and serve over rice.\n5. Cool leftovers promptly and refrigerate or freeze in meal-size portions.',notes:'Add cumin or a little hot sauce if available. Water is not a shopping ingredient.',sample:true},
 {id:'r-ip-beans',name:'Costa Rican black turtle beans',servings:6,prep:10,cook:70,tags:['Instant Pot','Budget friendly','Lactose free','Freezer friendly'],ingredients:[line('i-black-beans','1','pound dried'),line('i-onion','1','onion'),line('i-garlic','2','cloves'),line('i-salt','1','teaspoon')],instructions:'1. Sort and rinse black beans. Add to the pot with onion, garlic and about 6 cups water. Stay below the appliance’s marked limit for expanding foods.\n2. Pressure cook on high for about 30–40 minutes for unsoaked black beans, following your appliance instructions. Allow natural pressure release for at least 20 minutes.\n3. Check tenderness; older beans may need another short pressure cycle. Season to taste.\n4. Drain if desired. Cool promptly and refrigerate or freeze in small portions.',notes:'Cooking time includes an approximate allowance for pressure build-up and release. Do not substitute dried kidney beans into this recipe.',sample:true}
 ];return {version:VERSION,staples,ingredients,recipes,shopping:[],prepperItems:seedPrepper()};
}
function validate(d){
 const fail=()=>{throw Error('This is not a valid Simple Recipes version 1 backup. Nothing has been replaced.');};
 if(!d||typeof d!=='object'||d.version!==VERSION||!['staples','ingredients','recipes','shopping'].every(k=>Array.isArray(d[k])&&d[k].length<=5000))fail();
 const str=(v,max=10000)=>typeof v==='string'&&v.length<=max;
 const id=v=>str(v,100)&&/^[a-zA-Z0-9_-]+$/.test(v);
 const unique=a=>new Set(a.map(x=>x.id)).size===a.length;
 if(!['staples','ingredients','recipes'].every(k=>d[k].every(x=>x&&id(x.id))&&unique(d[k])))fail();
 if(d.appliedUpdates!==undefined&&(!Array.isArray(d.appliedUpdates)||d.appliedUpdates.length>100||!d.appliedUpdates.every(x=>str(x,100))))fail();
 const ing=new Map(d.ingredients.map(x=>[x.id,x])), staples=new Map(d.staples.map(x=>[x.id,x]));
 const validName=v=>str(v,200)&&v.trim().length>0;
 const numeric=v=>typeof v==='number'&&positive(v);
 for(const x of d.ingredients)if(!validName(x.name)||!CATEGORIES.includes(x.category)||!numeric(x.purchaseQty)||!validName(x.purchaseUnit)||(x.stapleId!==null&&!staples.has(x.stapleId))||typeof x.sample!=='boolean')fail();
 if(new Set(d.ingredients.map(x=>normalize(x.name))).size!==d.ingredients.length)fail();
 for(const x of d.staples)if(!validName(x.name)||(x.weeklyStarred!==undefined&&typeof x.weeklyStarred!=='boolean')||!CATEGORIES.includes(x.category)||!numeric(x.keep)||!numeric(x.buy)||!validName(x.unit)||!str(x.notes)||typeof x.longStorage!=='boolean'||typeof x.sample!=='boolean'||!ing.has(x.ingredientId)||ing.get(x.ingredientId).stapleId!==x.id||ing.get(x.ingredientId).name!==x.name)fail();
 for(const x of d.ingredients)if(x.stapleId&&staples.get(x.stapleId).ingredientId!==x.id)fail();
 const allLines=new Set();
 for(const r of d.recipes){if(!validName(r.name)||(r.weeklyStarred!==undefined&&typeof r.weeklyStarred!=='boolean')||!numeric(r.servings)||![r.prep,r.cook].every(n=>Number.isFinite(n)&&n>=0&&n<=1000000)||!Array.isArray(r.tags)||r.tags.length>30||!r.tags.every(t=>validName(t))||!str(r.instructions,50000)||!str(r.notes)||typeof r.sample!=='boolean'||!Array.isArray(r.ingredients)||!r.ingredients.length||r.ingredients.length>200||new Set(r.ingredients.map(x=>x.ingredientId)).size!==r.ingredients.length)fail();for(const l of r.ingredients){if(!l||!id(l.id)||allLines.has(l.id)||!ing.has(l.ingredientId)||!validName(l.quantity)||!str(l.unit,200))fail();allLines.add(l.id);}}
 if(new Set(d.shopping.map(x=>x?.ingredientId)).size!==d.shopping.length)fail();
 for(const x of d.shopping)if(!x||!ing.has(x.ingredientId)||!numeric(x.quantity)||!validName(x.unit)||typeof x.checked!=='boolean')fail();
 if(d.prepperItems!==undefined){
  if(!Array.isArray(d.prepperItems)||d.prepperItems.length>1000||!unique(d.prepperItems))fail();
  for(const x of d.prepperItems)if(!x||(x.reviewEveryMonths!==undefined&&![0,3].includes(x.reviewEveryMonths))||(x.reviewDueAt!==undefined&&x.reviewDueAt!==null&&(typeof x.reviewDueAt!=='string'||!/^\d{4}-\d\d-\d\dT/.test(x.reviewDueAt)||!Number.isFinite(Date.parse(x.reviewDueAt))))||!id(x.id)||!validName(x.name)||!validName(x.category)||typeof x.inventoried!=='boolean'||typeof x.priority!=='boolean'||!str(x.note)||!Array.isArray(x.tips)||x.tips.length>30||!x.tips.every(t=>str(t)&&t.trim())||!Array.isArray(x.sources)||x.sources.length>10||!x.sources.every(v=>v&&validName(v.label)&&str(v.url,2000)&&/^https:\/\//.test(v.url)))fail();
 }
 return JSON.parse(JSON.stringify(d));
}
function retireStarterStaples(d){
 const retired=new Set(['flour','tomatoes','lentils','oats']);
 const removed=d.staples.filter(s=>s.sample&&retired.has(s.id));
 if(!removed.length)return false;
 for(const s of removed){const i=d.ingredients.find(i=>i.id===s.ingredientId);if(i)i.stapleId=null;}
 d.staples=d.staples.filter(s=>!removed.includes(s));
 return true;
}
function applyRequestedCollection(d){
 const update='collection-2026-11-02';
 if(d.appliedUpdates?.includes(update)||!d.ingredients.length)return false;
 const template=seed();
 const existingIds=['rice','tuna','black-beans','mayo','nori','oil'];
 for(const id of existingIds){const old=d.staples.find(s=>s.id===id),next=template.staples.find(s=>s.id===id);if(old?.sample){const i=d.ingredients.find(i=>i.id===old.ingredientId);if(i?.sample){old.name=next.name;i.name=next.name;}}}
 for(const id of ['smoked-salmon','oat-milk','organic-cereal']){const next=template.staples.find(s=>s.id===id);if(!d.staples.some(s=>s.id===id)&&!d.ingredients.some(i=>normalize(i.name)===normalize(next.name)||i.id===next.ingredientId)){d.staples.push(next);d.ingredients.push(template.ingredients.find(i=>i.id===next.ingredientId));}}
 for(const id of ['r-onigiri','r-sandwich','r-ip-beans']){const old=d.recipes.find(r=>r.id===id),next=template.recipes.find(r=>r.id===id);if(old?.sample)old.name=next.name;}
 const salmonRecipe=template.recipes.find(r=>r.id==='r-salmon-rice');
 if(!d.recipes.some(r=>r.id===salmonRecipe.id)&&salmonRecipe.ingredients.every(l=>d.ingredients.some(i=>i.id===l.ingredientId)))d.recipes.push(salmonRecipe);
 d.appliedUpdates=[...(d.appliedUpdates||[]),update];return true;
}
function applySobaPorkCollection(d){
 const update='soba-pork-collection-2026-11-02';
 if(d.appliedUpdates?.includes(update)||!d.ingredients.length)return false;
 const template=seed(), ids=['soba-noodles','soba-sauce','green-onion','frozen-blueberries','pork-chops','garlic-powder','paprika','japanese-curry'], links=new Map();
 for(const id of ids){const next=template.staples.find(s=>s.id===id);let i=d.ingredients.find(i=>i.id===next.ingredientId)||d.ingredients.find(i=>normalize(i.name)===normalize(next.name));
  if(!i){i={...template.ingredients.find(i=>i.id===next.ingredientId),stapleId:null};d.ingredients.push(i);}
  links.set(next.ingredientId,i.id);
  if(!d.staples.some(s=>s.id===id)&&!i.stapleId){d.staples.push({...next,ingredientId:i.id,name:i.name});i.stapleId=id;}
 }
 for(const id of ['r-cold-soba','r-paprika-pork','r-pork-congee','r-japanese-curry']){const next=template.recipes.find(r=>r.id===id);const lines=next.ingredients.map(l=>({...l,ingredientId:links.get(l.ingredientId)||l.ingredientId}));if(!d.recipes.some(r=>r.id===id||normalize(r.name)===normalize(next.name))&&lines.every(l=>d.ingredients.some(i=>i.id===l.ingredientId)))d.recipes.push({...next,ingredients:lines});}
 d.appliedUpdates=[...(d.appliedUpdates||[]),update];return true;
}
function updateAirFryerPorkRecipe(d){
 const update='air-fryer-boneless-pork-2026-11-04';if(d.appliedUpdates?.includes(update))return false;
 const old=d.recipes.find(r=>r.id==='r-paprika-pork');
 if(old?.sample){const next=seed().recipes.find(r=>r.id==='r-paprika-pork');const original=new Map(old.ingredients.map(l=>[l.ingredientId,l]));Object.assign(old,{name:next.name,servings:next.servings,prep:next.prep,cook:next.cook,tags:next.tags,instructions:next.instructions,notes:next.notes,ingredients:next.ingredients.map(l=>({...l,id:original.get(l.ingredientId)?.id||l.id}))});}
 d.appliedUpdates=[...(d.appliedUpdates||[]),update];return true;
}
let state, storageOK=true, recovery=false;
try{const raw=localStorage.getItem(KEY);state=raw===null?seed():validate(JSON.parse(raw));const retired=retireStarterStaples(state);const added=applyRequestedCollection(state);const sobaAdded=applySobaPorkCollection(state);const prepperAdded=ensurePrepper(state);const weeklyAdded=addWeeklyStaples(state);const porkUpdated=updateAirFryerPorkRecipe(state);if(raw===null||retired||added||sobaAdded||prepperAdded||weeklyAdded||porkUpdated){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{storageOK=false;}}}
catch(e){storageOK=false;recovery=true;state={version:VERSION,staples:[],ingredients:[],recipes:[],shopping:[],prepperItems:[]};}
const ui={tab:'staples',search:'',category:'All',listed:false,long:false,tag:'All',priorityOnly:false};
let modalMode=null,modalId=null,recipeBack=null,lastFocus=null,toastTimer;
const ingredient=id=>state.ingredients.find(x=>x.id===id), item=id=>state.shopping.find(x=>x.ingredientId===id);
function warn(){const el=$('#storage-warning');el.hidden=storageOK;el.textContent=recovery?'Saved data could not be read, or browser storage is blocked. Your existing stored data has not been overwritten. You can use an empty temporary workspace and export a backup, or import a valid backup to replace the saved data.':'Browser storage is unavailable or full. Changes remain in this tab only. Export a backup before closing.';}
function save(){if(recovery){storageOK=false;warn();return;}try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}warn();}
function toast(msg){$('#toast').textContent=msg;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',3000);}
function options(values,selected){return values.map(v=>`<option value="${escape(v)}"${v===selected?' selected':''}>${escape(v)}</option>`).join('');}
function counts(stapleId){const s=state.staples.find(x=>x.id===stapleId);return state.recipes.filter(r=>r.ingredients.some(l=>l.ingredientId===s.ingredientId));}
function focusAfter(fn){const a=document.activeElement;const action=a?.dataset.action,id=a?.dataset.id,scope=a?.closest('dialog')||document;fn();if(action){const n=$$('[data-action]',scope).find(x=>x.dataset.action===action&&x.dataset.id===id);n?.focus();}}
function purchase(id){const x=item(id),i=ingredient(id);if(!x)return `<button class="wide" data-action="add" data-id="${id}">+ Add to shopping list</button>`;return `<div class="buy-label">To buy${x.checked?' · purchased':''}</div><div class="buy-controls"><button data-action="minus" data-id="${id}" aria-label="Buy fewer ${escape(i.name)}" ${x.quantity<=1?'disabled':''}>−</button><span class="number">${x.quantity}</span><button data-action="plus" data-id="${id}" aria-label="Buy more ${escape(i.name)}">+</button><span class="small">${escape(x.unit)}</span><button class="remove quiet" data-action="remove" data-id="${id}">Remove</button></div>`;}
function render(){
 $('#shopping-count').textContent=state.shopping.filter(x=>!x.checked).length;
 $$('[data-tab]').forEach(b=>b.dataset.tab===ui.tab?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current'));
 const w=$('#workspace');w.setAttribute('aria-label',ui.tab==='shopping'?'Shopping List':ui.tab==='staples'?'Staples':ui.tab==='prepper'?'Prepper':'Recipes');
 if(ui.tab==='shopping'){renderShopping();return;}
 if(ui.tab==='prepper'){renderPrepper();return;}
 const staple=ui.tab==='staples';
 w.innerHTML=`<div class="section-heading"><div><h2>${staple?'Pantry staples':'Favourite recipes'}</h2></div><button class="primary" data-action="${staple?'new-staple':'new-recipe'}">+ ${staple?'Add staple':'Add recipe'}</button></div><div class="toolbar"><label class="search">Search ${staple?'staples':'recipes'}<input type="search" id="search" placeholder="${staple?'Try rice, beans, tuna…':'Find your next meal…'}" value="${escape(ui.search)}"></label>${staple?`<div class="filter-row" aria-label="Staple categories">${['All',...CATEGORIES.filter(c=>!['Produce','Refrigerated'].includes(c)||state.staples.some(s=>s.category===c))].map(c=>`<button class="chip" data-category="${escape(c)}" aria-pressed="${c===ui.category}">${escape(c)}</button>`).join('')}</div><div class="toggles"><label class="check-label"><input type="checkbox" id="listed" ${ui.listed?'checked':''}>Shopping only</label><label class="check-label"><input type="checkbox" id="long" ${ui.long?'checked':''}>Long storage</label></div>`:`<label class="small" style="display:block;margin-top:12px">Recipe tag<select id="tag">${options(['All',...new Set(state.recipes.flatMap(r=>r.tags))],ui.tag)}</select></label>`}</div><p class="small results-note" id="results-note"></p><div id="cards" class="grid"></div>`;
 renderCards();
}
function weeklyStar(x,type){return `<button class="weekly-star ${x.weeklyStarred?'starred':''}" data-action="weekly-star" data-type="${type}" data-id="${x.id}" aria-pressed="${!!x.weeklyStarred}" aria-label="Plan this week: ${escape(x.name)}" title="Plan this week">${x.weeklyStarred?'★':'☆'}</button>`;}
function renderCards(){
 const q=normalize(ui.search),staple=ui.tab==='staples';
 const rows=(staple?state.staples:state.recipes).filter(x=>normalize(staple?x.name+' '+x.notes:x.name+' '+x.tags.join(' ')).includes(q)).filter(x=>staple?(ui.category==='All'||x.category===ui.category)&&(!ui.listed||!!item(x.ingredientId))&&(!ui.long||x.longStorage):(ui.tag==='All'||x.tags.includes(ui.tag))).sort((a,b)=>Number(!!b.weeklyStarred)-Number(!!a.weeklyStarred)||a.name.localeCompare(b.name));
 $('#results-note').textContent=`${rows.length} ${staple?'staples':'recipes'} · Starred first · A–Z`;
 $('#cards').innerHTML=rows.length?rows.map(x=>staple?`<article class="card"><div class="card-head"><div><div class="category">${escape(x.category)}</div><h3>${escape(x.name)} ${sampleBadge(x)}</h3></div>${weeklyStar(x,'staple')}</div><div class="staple-meta"><p class="keep">Keep: <strong>${x.keep} ${escape(x.unit)}</strong></p>${x.longStorage?'<span class="tag">Long storage</span>':''}</div><div class="card-links">${x.notes?`<details class="storage-notes"><summary>Storage notes</summary><p class="notes">${escape(x.notes)}</p></details>`:''}<button class="used" data-action="used" data-id="${x.id}">Used in ${counts(x.id).length} recipes →</button></div><div class="card-bottom">${purchase(x.ingredientId)}</div></article>`:`<article class="card recipe-card"><div class="recipe-card-top">${sampleBadge(x)}${weeklyStar(x,'recipe')}</div><h3><button data-action="recipe" data-id="${x.id}">${escape(x.name)}</button></h3><div class="recipe-meta"><span>${x.prep+x.cook} min total</span><span>${x.servings} servings</span></div><p class="small" style="margin:0">Prep ${x.prep} min · Cook ${x.cook} min</p><div>${x.tags.map(t=>`<span class="tag">${escape(t)}</span>`).join('')}</div><div class="card-bottom"><button data-action="recipe" data-id="${x.id}">View recipe →</button></div></article>`).join(''):`<div class="empty"><h3>${staple?'No staples found':'No recipes found'}</h3><p class="small">Try another search or reset the filters, or add your own.</p><button data-action="reset">Reset filters</button></div>`;
}
function prepperControls(x){return `<div class="prepper-controls"><label class="check-label"><input type="checkbox" data-inventoried="${x.id}" ${x.inventoried?'checked':''}>Inventoried</label><button class="priority-button ${x.priority?'starred':''}" data-action="prepper-star" data-id="${x.id}" aria-pressed="${x.priority}" aria-label="Need to acquire: ${escape(x.name)}"><span aria-hidden="true">${x.priority?'★':'☆'}</span> Need to acquire</button></div>`;}
function renderPrepper(){
 const ready=state.prepperItems.filter(x=>x.inventoried).length,needed=state.prepperItems.filter(x=>x.priority).length;
 $('#workspace').innerHTML=`<div class="section-heading"><div><h2>Prepper items</h2><p class="small">${ready} inventoried · ${needed} starred to acquire or refill</p></div></div><div class="toolbar"><label class="search">Search prepper items<input type="search" id="search" placeholder="Find gear, water or readiness tasks…" value="${escape(ui.search)}"></label><label class="check-label"><input type="checkbox" id="priority-only" ${ui.priorityOnly?'checked':''}>Need to acquire only</label></div><p class="small results-note">Tap a name for instructions · ✓ Inventoried · ★ Need to acquire / refill</p><div id="prepper-cards" class="grid"></div>`;
 renderPrepperCards();
}
function renderPrepperCards(){
 const q=normalize(ui.search),rows=state.prepperItems.filter(x=>normalize(x.name+' '+x.category+' '+x.note).includes(q)&&(!ui.priorityOnly||x.priority)).sort((a,b)=>Number(b.priority)-Number(a.priority)||a.name.localeCompare(b.name));
 $('#prepper-cards').innerHTML=rows.length?rows.map(x=>`<article class="card prepper-card ${x.priority?'needs-acquisition':''}"><label class="prepper-inventory"><input type="checkbox" data-inventoried="${x.id}" ${x.inventoried?'checked':''} aria-label="Inventoried: ${escape(x.name)}"></label><h3><button class="prepper-title" data-action="prepper-details" data-id="${x.id}">${escape(x.name)} <span aria-hidden="true">›</span></button></h3><button class="priority-button ${x.priority?'starred':''}" data-action="prepper-star" data-id="${x.id}" aria-pressed="${x.priority}" aria-label="Need to acquire: ${escape(x.name)}"><span aria-hidden="true">${x.priority?'★':'☆'}</span></button></article>`).join(''):'<div class="empty"><h3>No matching prepper items</h3><p class="small">Try another search or turn off the starred filter.</p></div>';
}
function waterGuide(x){
 const text=i=>escape(x.tips[i]);
 return `<p class="water-caution">${text(0)}</p><p>${text(1)}</p><h3>1. Boil when possible</h3><p>${text(2)}</p><h3>2. Bleach when boiling is impractical</h3><p>${text(3)}</p><table class="water-chart"><caption>Drops for approximately 5.25% bleach</caption><thead><tr><th scope="col">Water</th><th scope="col">Clear</th><th scope="col">Cloudy / cold*</th></tr></thead><tbody>${[1,2,4,5,10,20].map(l=>`<tr><th scope="row">${l} L</th><td>${l*2} drops</td><td>${l*4} drops</td></tr>`).join('')}</tbody></table><p class="small">*Below 10°C or cloudy after clarification. Amounts scale HealthLink BC’s per-litre guidance; use a dropper, not an estimated spoonful.</p><p>${text(4)}</p><p>${text(5)}</p><details class="guide-more"><summary>Filters, tablets & readiness</summary><p>${text(6)}</p><p>${text(7)}</p></details>`;
}
function renderShopping(){
 const n=state.shopping.filter(x=>!x.checked).length;
 $('#workspace').innerHTML=`<div class="section-heading"><div><h2>Shopping list</h2><p class="small">${n} to buy · Purchase sizes are yours to choose.</p></div><button class="primary" data-action="manual">+ Add item</button></div><div class="shopping-actions"><button data-action="clear" ${state.shopping.some(x=>x.checked)?'':'disabled'}>Clear purchased items</button></div><p class="small">Recipe amounts and purchase amounts are separate. Nothing is added to pantry inventory.</p>${state.shopping.length?CATEGORIES.map(c=>{const rows=state.shopping.filter(x=>ingredient(x.ingredientId).category===c).sort((a,b)=>ingredient(a.ingredientId).name.localeCompare(ingredient(b.ingredientId).name));return rows.length?`<section class="shopping-group"><h3>${escape(c)}</h3>${rows.map(x=>{const i=ingredient(x.ingredientId);return `<div class="shopping-item ${x.checked?'purchased':''}"><input type="checkbox" data-check="${i.id}" aria-label="Mark ${escape(i.name)} purchased" ${x.checked?'checked':''}><div class="shopping-name"><strong>${escape(i.name)}</strong><span class="small">${i.stapleId?'Pantry staple':'Ingredient'}</span></div><div class="purchase-fields"><label><span class="small">To buy</span><input type="number" min="0.01" max="1000000" step="any" required value="${x.quantity}" data-qty="${i.id}" aria-label="Purchase quantity for ${escape(i.name)}"></label><label><span class="small">Unit</span><input class="unit" maxlength="200" required value="${escape(x.unit)}" data-unit="${i.id}" aria-label="Purchase unit for ${escape(i.name)}"></label></div><button class="quiet" data-action="remove" data-id="${i.id}" aria-label="Remove ${escape(i.name)} from shopping list">Remove</button></div>`;}).join('')}</section>`:'';}).join(''):'<div class="empty" style="margin-top:24px"><h3>A fresh list, ready for you.</h3><p class="small">Add staples, individual recipe ingredients, or something of your own.</p><button data-tab="staples">Browse staples</button></div>'}`;
}
function openModal(mode,id=null,back=null){
 if(!$('#modal').open)lastFocus=document.activeElement;
 modalMode=mode;modalId=id;recipeBack=back;
 renderModal();if(!$('#modal').open)$('#modal').showModal();$('#modal').scrollTop=0;
 requestAnimationFrame(()=>{const f=$('[autofocus]',$('#modal'))||$('#modal-title');if(f){if(f.id==='modal-title')f.tabIndex=-1;f.focus();}});
}
function closeModal(){ $('#modal').close();modalMode=null;recipeBack=null;if(lastFocus?.isConnected)lastFocus.focus();else $(`[data-tab="${ui.tab}"]`).focus(); }
function renderModal(){
 $('#modal-back').hidden=!(modalMode==='recipe'&&recipeBack);
 const b=$('#modal-body');
 if(modalMode==='prepper'){
  const x=state.prepperItems.find(x=>x.id===modalId),settingsOpen=$('#prepper-settings')?.open;
  const tips=x.id==='water-purification'?waterGuide(x):`<h3>Useful in an emergency</h3><ul class="prepper-tips">${x.tips.map(t=>`<li>${escape(t)}</li>`).join('')}</ul>`;
  b.innerHTML=`<h2 id="modal-title" tabindex="-1">${escape(x.name)}</h2><p class="small">${escape(x.category)}</p><div class="prepper-guide">${tips}</div><details id="prepper-settings" ${settingsOpen?'open':''}><summary>Checklist, review & status note</summary>${prepperControls(x)}${reviewStatus(x)}<label class="check-label"><input type="checkbox" id="prepper-repeat" ${x.reviewEveryMonths===3?'checked':''}>Repeat review every 3 months</label><p class="small">Clear the star after a readiness check to schedule the next review. Due items re-star when you open or return to the app.</p><label>Status note<textarea id="prepper-note" maxlength="10000">${escape(x.note)}</textarea></label><button data-action="save-prepper-note" data-id="${x.id}">Save note</button></details><p class="small">Guidance: ${x.sources.map(v=>`<a href="${escape(v.url)}" target="_blank" rel="noopener noreferrer">${escape(v.label)} ↗</a>`).join(' · ')}</p>`;
 }
 else if(modalMode==='used'){const s=state.staples.find(x=>x.id===modalId);const rows=counts(s.id);b.innerHTML=`<h2 id="modal-title" tabindex="-1">Recipes using ${escape(s.name)}</h2><p class="small">Linked by ingredient, even when you rename a staple.</p>${rows.length?rows.map(r=>`<button class="recipe-list-item" data-action="linked-recipe" data-id="${r.id}" data-back="${s.id}"><strong>${escape(r.name)}</strong><span class="small">${r.prep+r.cook} min · ${r.servings} servings ${r.sample?'· Sample':''}</span></button>`).join(''):'<div class="empty"><p>No recipes link to this staple yet. Add it as an ingredient when editing a recipe.</p></div>'}`;
 }else if(modalMode==='recipe'){const r=state.recipes.find(x=>x.id===modalId);b.innerHTML=`<h2 id="modal-title" tabindex="-1">${escape(r.name)}</h2>${sampleBadge(r)}<p class="recipe-meta">${r.servings} servings · Prep ${r.prep} min · Cook ${r.cook} min</p><div>${r.tags.map(t=>`<span class="tag">${escape(t)}</span>`).join('')}</div><h3 style="margin-top:24px">Ingredients</h3><p class="small">Amounts below are for cooking. Shopping quantities can be edited separately.</p>${r.ingredients.map(l=>{const i=ingredient(l.ingredientId),x=item(i.id);return `<div class="ingredient-line"><div><strong>${escape(i.name)}</strong><div class="small">${escape(l.quantity)} ${escape(l.unit)}</div>${x?`<div class="small">To buy: ${x.quantity} ${escape(x.unit)}${x.checked?' · purchased':''}</div>`:''}</div><button data-action="${x?'remove':'add'}" data-id="${i.id}">${x?'Remove from list':'+ Add to list'}</button></div>`;}).join('')}<h3 style="margin-top:26px">Instructions</h3><p class="instructions">${escape(r.instructions)}</p>${r.notes?`<h3>Personal notes</h3><p class="instructions">${escape(r.notes)}</p>`:''}`;
 }else if(modalMode==='staple-edit'){stapleForm();}else if(modalMode==='recipe-edit'){recipeForm();}else if(modalMode==='manual'){manualForm();}else if(modalMode==='backup'){backupView();}
}
function stapleForm(){const x=state.staples.find(s=>s.id===modalId)||{name:'',category:'Other',keep:1,unit:'cans',buy:1,notes:'',longStorage:false};$('#modal-body').innerHTML=`<h2 id="modal-title">${modalId?'Edit staple':'New staple'}</h2><form id="staple-form"><div class="form-grid"><label class="span2">Staple name<input name="name" maxlength="200" required value="${escape(x.name)}" autofocus></label><label class="span2">Category<select name="category">${options(CATEGORIES,x.category)}</select></label><label>Keep quantity<input name="keep" type="number" min="0.01" max="1000000" step="any" required value="${x.keep}"></label><label>Unit<input name="unit" maxlength="200" required placeholder="cans, bags, bottles" value="${escape(x.unit)}"></label><label class="span2">Default purchase quantity<input name="buy" type="number" min="0.01" max="1000000" step="any" required value="${x.buy}"></label><label class="check-label span2"><input name="longStorage" type="checkbox" ${x.longStorage?'checked':''}>Long storage</label><label class="span2">Storage notes (optional)<textarea name="notes" maxlength="10000">${escape(x.notes)}</textarea></label></div><p class="small">Keep is your preferred reserve target, independent of what you buy. Storage suitability depends on packaging and conditions.</p><p class="form-error" role="alert"></p><div class="form-actions">${modalId?'<button type="button" class="danger" data-action="delete-staple">Delete staple</button>':''}<button type="button" data-action="cancel">Cancel</button><button class="primary" type="submit">Save staple</button></div></form>`;}
function ingredientRow(l={id:uid(),ingredientId:'',quantity:'1',unit:''}){return `<div class="ingredient-edit" data-line-id="${l.id}"><label>Ingredient<select name="ingredientId"><option value="">New ingredient…</option>${state.ingredients.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(i=>`<option value="${i.id}" ${l.ingredientId===i.id?'selected':''}>${escape(i.name)}${i.stapleId?' · staple':''}</option>`).join('')}</select></label><label class="new-name" ${l.ingredientId?'hidden':''}>New ingredient name<input name="newName" maxlength="200" ${l.ingredientId?'':'required'} placeholder="For example, carrots"></label><div class="form-grid"><label>Recipe quantity<input name="quantity" maxlength="200" required value="${escape(l.quantity)}" placeholder="1/2 or to taste"></label><label>Recipe unit<input name="unit" maxlength="200" value="${escape(l.unit)}" placeholder="cups, tablespoons"></label></div><button type="button" class="quiet" data-action="remove-line">Remove ingredient</button></div>`;}
function recipeForm(){const r=state.recipes.find(x=>x.id===modalId)||{name:'',servings:2,prep:10,cook:0,tags:[],instructions:'',notes:'',ingredients:[]};$('#modal-body').innerHTML=`<h2 id="modal-title">${modalId?'Edit recipe':'New recipe'}</h2><form id="recipe-form"><div class="form-grid"><label class="span2">Recipe name<input name="name" maxlength="200" required value="${escape(r.name)}" autofocus></label><label>Servings<input name="servings" type="number" step="any" min="0.01" max="1000000" required value="${r.servings}"></label><div></div><label>Prep time (min)<input name="prep" type="number" min="0" max="1000000" required value="${r.prep}"></label><label>Cook time (min)<input name="cook" type="number" min="0" max="1000000" required value="${r.cook}"></label><label class="span2">Tags, separated by commas<input name="tags" maxlength="1000" value="${escape(r.tags.join(', '))}" placeholder="Budget friendly, Quick meals"></label></div><p class="small">Ideas: Budget friendly, Quick meals, Lactose free, Instant Pot, Air fryer, Freezer friendly.</p><h3>Ingredients</h3><p class="small">Choose an existing ingredient to share its shopping state. Ingredients marked “staple” link to your pantry cards. New ingredients default to buying 1 item; edit their purchase size in the shopping list.</p><div id="ingredient-rows">${(r.ingredients.length?r.ingredients:[{id:uid(),ingredientId:'',quantity:'1',unit:''}]).map(ingredientRow).join('')}</div><button type="button" data-action="add-line">+ Add ingredient</button><div class="form-grid"><label class="span2">Cooking instructions<textarea name="instructions" required maxlength="50000">${escape(r.instructions)}</textarea></label><label class="span2">Personal notes<textarea name="notes" maxlength="10000">${escape(r.notes)}</textarea></label></div><p class="form-error" role="alert"></p><div class="form-actions">${modalId?'<button type="button" class="danger" data-action="delete-recipe">Delete recipe</button>':''}<button type="button" data-action="cancel">Cancel</button><button class="primary" type="submit">Save recipe</button></div></form>`;}
function manualForm(){ $('#modal-body').innerHTML=`<h2 id="modal-title">Add a shopping item</h2><form id="manual-form"><div class="form-grid"><label class="span2">Item name<input name="name" list="ingredient-names" required maxlength="200" autofocus><datalist id="ingredient-names">${state.ingredients.map(i=>`<option value="${escape(i.name)}"></option>`).join('')}</datalist></label><label>To buy<input name="quantity" type="number" min="0.01" max="1000000" step="any" value="1" required></label><label>Purchase unit<input name="unit" value="item" maxlength="200" required></label><label class="span2">Category<select name="category">${options(CATEGORIES,'Other')}</select></label></div><p class="small">An exact existing name reuses the same ingredient. Already-listed items are kept as they are.</p><p class="form-error" role="alert"></p><div class="form-actions"><button type="button" data-action="cancel">Cancel</button><button class="primary">Add to shopping list</button></div></form>`;}
function backupView(){$('#modal-body').innerHTML=`<h2 id="modal-title" tabindex="-1">Backups & help</h2><p>Your recipes, staples and shopping list stay in <strong>this browser on this device</strong>. They do not automatically sync. Clearing browser data can remove them. Private browsing may not keep them after you close it.</p><p class="small">Items labelled Sample are editable starting points. Editing one makes it your own. Samples are seeded only on first use and never restored over your changes.</p><div class="backup-options"><section><h3>Take your kitchen with you</h3><p class="small">Export a JSON backup, then import it in another browser or device. The backup includes your entire collection and shopping list.</p><div class="backup-buttons"><button class="primary" data-action="export">Download JSON file</button><button data-action="copy-backup">Copy backup text</button></div><div id="backup-text-panel" hidden><label>Backup text<textarea id="backup-text" readonly spellcheck="false" rows="6"></textarea></label><button data-action="select-backup">Select all text</button><p class="small" id="copy-status" role="status"></p></div></section><section><h3>Restore a backup</h3><p class="small">Import replaces this browser’s current app data after validation and confirmation. Export first if you want to keep it.</p><label>Choose JSON file<input id="import-file" type="file" accept="application/json,.json"></label><div class="paste-backup"><label>Or paste JSON backup text<textarea id="backup-paste" spellcheck="false" rows="6" maxlength="10000000" placeholder="Paste your full backup here…"></textarea></label><button data-action="restore-paste">Restore pasted backup</button></div><p id="import-error" class="form-error" role="alert"></p></section><section><h3>Keeping staples well</h3><p class="small">“Long storage” is a planning tag, not a guaranteed shelf life. Follow product labels, protect food from moisture, heat and pests, and rotate older packages. Keep targets and shopping amounts are independent; this app does not track inventory.</p></section></div>`;}
function changed(){save();render();if(modalMode==='recipe'||modalMode==='used'||modalMode==='prepper')renderModal();}
function add(id,qty,unit){if(item(id)){toast('Already on your list. Quantity unchanged.');return;}const i=ingredient(id);state.shopping.push({ingredientId:id,quantity:qty??i.purchaseQty,unit:unit??i.purchaseUnit,checked:false});changed();toast('Added to shopping list');}
function formError(f,msg){$('.form-error',f).textContent=msg;}
function persistForm(f){
 const get=n=>f.elements.namedItem(n).value.trim();
 if(f.id==='staple-form'){
  const old=state.staples.find(x=>x.id===modalId),name=get('name');if(!name){formError(f,'Enter a staple name.');return;}
  const match=state.ingredients.find(x=>normalize(x.name)===normalize(name)&&x.id!==old?.ingredientId);
  if(match?.stapleId){formError(f,'A staple already uses this name. Edit that staple instead.');return;}
  if(old&&match){formError(f,'Another ingredient already uses this name. Choose a distinct name to preserve its existing links.');return;}
  const i=old?ingredient(old.ingredientId):match||{id:uid(),name,stapleId:null};
  const x={id:old?.id||uid(),name,category:get('category'),keep:Number(get('keep')),unit:get('unit'),buy:Number(get('buy')),longStorage:f.elements.longStorage.checked,notes:get('notes'),ingredientId:i.id,sample:false};
  Object.assign(i,{name,category:x.category,purchaseQty:x.buy,purchaseUnit:x.unit,stapleId:x.id,sample:false});
  if(!state.ingredients.includes(i))state.ingredients.push(i);if(old)Object.assign(old,x);else state.staples.push(x);
 }else if(f.id==='recipe-form'){
  const old=state.recipes.find(x=>x.id===modalId),newIngredients=[],lines=[];
  if(!get('name')||!get('instructions')){formError(f,'Add a name and cooking instructions.');return;}
  const tags=[...new Set(get('tags').split(',').map(t=>t.trim()).filter(Boolean))];if(tags.length>30||tags.some(t=>t.length>200)){formError(f,'Use at most 30 tags, each up to 200 characters.');return;}
  const rows=$$('.ingredient-edit',f);if(!rows.length){formError(f,'Add at least one ingredient.');return;}
  for(const row of rows){let id=$('[name=ingredientId]',row).value;const quantity=$('[name=quantity]',row).value.trim(),unit=$('[name=unit]',row).value.trim();if(!quantity){formError(f,'Each ingredient needs a quantity or “to taste”.');return;}
   if(!id){const name=$('[name=newName]',row).value.trim();if(!name){formError(f,'Name each new ingredient.');return;}let i=[...state.ingredients,...newIngredients].find(x=>normalize(x.name)===normalize(name));if(!i){i={id:uid(),name,category:'Other',purchaseQty:1,purchaseUnit:'item',stapleId:null,sample:false};newIngredients.push(i);}id=i.id;}
   if(lines.some(l=>l.ingredientId===id)){formError(f,'Use one row per ingredient. This ingredient is already in the recipe.');return;}
   lines.push({id:row.dataset.lineId,ingredientId:id,quantity,unit});
  }
  const x={id:old?.id||uid(),name:get('name'),servings:Number(get('servings')),prep:Number(get('prep')),cook:Number(get('cook')),tags,ingredients:lines,instructions:get('instructions'),notes:get('notes'),sample:false};state.ingredients.push(...newIngredients);if(old)Object.assign(old,x);else state.recipes.push(x);
 }else if(f.id==='manual-form'){
  const name=get('name');if(!name){formError(f,'Enter an item name.');return;}let i=state.ingredients.find(x=>normalize(x.name)===normalize(name));
  if(i&&item(i.id)){closeModal();toast('Already on your list. Quantity unchanged.');return;}
  if(!i){i={id:uid(),name,category:get('category'),purchaseQty:Number(get('quantity')),purchaseUnit:get('unit'),stapleId:null,sample:false};state.ingredients.push(i);}
  state.shopping.push({ingredientId:i.id,quantity:Number(get('quantity')),unit:get('unit'),checked:false});
 }
 closeModal();changed();toast('Saved');
}
function exportData(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`simple-recipes-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Backup exported');}
async function copyBackup(){
 const text=JSON.stringify(state,null,2),field=$('#backup-text');
 $('#backup-text-panel').hidden=false;field.value=text;field.focus();field.select();
 try{if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(text);$('#copy-status').textContent='Copied. Paste this text into a note or another device’s Restore field.';toast('Backup text copied');}
 catch{$('#copy-status').textContent='Automatic copying is unavailable. The text is selected: use Copy in your device menu, or Ctrl/Cmd+C.';toast('Select and copy the backup text manually');}
}
async function importData(file){if(!file)return;try{if(file.size>10000000)throw Error('Choose a backup smaller than 10 MB.');const next=validate(JSON.parse(await file.text()));retireStarterStaples(next);applyRequestedCollection(next);applySobaPorkCollection(next);ensurePrepper(next);addWeeklyStaples(next);if(!confirm(`Replace all current app data with ${next.staples.length} staples, ${next.recipes.length} recipes and ${next.shopping.length} shopping items and ${next.prepperItems.length} prepper items? Export a backup first if you need the current data.`))return;state=next;recovery=false;save();ui.search='';ui.category='All';ui.tag='All';closeModal();render();toast(storageOK?'Backup restored':'Restored in this tab only — export before closing');}catch(e){$('#import-error').textContent=e instanceof SyntaxError?'This file is not valid JSON. Nothing has been replaced.':e.message;}finally{if($('#import-file'))$('#import-file').value='';}}
document.addEventListener('click',e=>{
 const tab=e.target.closest('[data-tab]');if(tab){ui.tab=tab.dataset.tab;ui.search='';render();return;}
 const category=e.target.closest('[data-category]');if(category){ui.category=category.dataset.category;render();$$('[data-category]').find(x=>x.dataset.category===ui.category)?.focus();return;}
 const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action,id=b.dataset.id;
 if(['add','remove','minus','plus'].includes(a)){const inModal=!!b.closest('dialog');const oldAction=a;focusAfter(()=>{if(a==='add')add(id);else if(a==='remove'){state.shopping=state.shopping.filter(x=>x.ingredientId!==id);changed();toast('Removed from shopping list');}else{const x=item(id);x.quantity=Math.min(1000000,Math.max(1,x.quantity+(a==='plus'?1:-1)));changed();}});if(inModal){const next=$$('[data-action]',$('#modal')).find(x=>x.dataset.id===id&&(x.dataset.action===oldAction||['add','remove'].includes(x.dataset.action)));next?.focus();}else if(!document.activeElement||document.activeElement===document.body){const next=$$('[data-action]',$('#workspace')).find(x=>x.dataset.id===id);(next||$(`[data-tab="${ui.tab}"]`))?.focus();}return;}
 if(a==='weekly-star'){const collection=b.dataset.type==='staple'?state.staples:state.recipes;const x=collection.find(x=>x.id===id);x.weeklyStarred=!x.weeklyStarred;focusAfter(changed);}
 else if(a==='prepper-details')openModal('prepper',id);
 else if(a==='prepper-star'){const x=state.prepperItems.find(x=>x.id===id);x.priority=!x.priority;x.reviewDueAt=x.reviewEveryMonths===3&&!x.priority?threeMonthsFrom():null;focusAfter(changed);}
 else if(a==='save-prepper-note'){const x=state.prepperItems.find(x=>x.id===id);x.note=$('#prepper-note').value.trim();changed();toast('Status note saved');}
 else if(a==='new-staple'||a==='edit-staple')openModal('staple-edit',id);
 else if(a==='new-recipe'||a==='edit-recipe')openModal('recipe-edit',id);
 else if(a==='recipe')openModal('recipe',id);
 else if(a==='linked-recipe')openModal('recipe',id,b.dataset.back);
 else if(a==='used')openModal('used',id);
 else if(a==='manual')openModal('manual');
 else if(a==='cancel')closeModal();
 else if(a==='export')exportData();
 else if(a==='copy-backup')copyBackup();
 else if(a==='select-backup'){const field=$('#backup-text');field.focus();field.select();}
 else if(a==='restore-paste'){const text=$('#backup-paste').value.trim();if(!text){$('#import-error').textContent='Paste a JSON backup before restoring.';return;}importData({size:new Blob([text]).size,text:async()=>text});}
 else if(a==='add-line'){$('#ingredient-rows').insertAdjacentHTML('beforeend',ingredientRow());$$('.ingredient-edit').at(-1).querySelector('select').focus();}
 else if(a==='remove-line'){const row=b.closest('.ingredient-edit'),next=row.nextElementSibling||row.previousElementSibling;row.remove();(next?.querySelector('select')||$('[data-action=add-line]')).focus();}
 else if(a==='reset'){ui.search='';ui.category='All';ui.listed=false;ui.long=false;ui.tag='All';render();$('#search')?.focus();}
 else if(a==='delete-staple'){const s=state.staples.find(x=>x.id===modalId);if(confirm(`Delete ${s.name}? Recipes and shopping items will remain, with the staple link removed.`)){ingredient(s.ingredientId).stapleId=null;state.staples=state.staples.filter(x=>x.id!==s.id);closeModal();changed();toast('Staple deleted; ingredient links preserved');}}
 else if(a==='delete-recipe'){const r=state.recipes.find(x=>x.id===modalId);if(confirm(`Delete ${r.name}? Shopping items will remain.`)){state.recipes=state.recipes.filter(x=>x.id!==r.id);closeModal();changed();toast('Recipe deleted');}}
 else if(a==='clear'&&confirm('Remove all purchased items? Unpurchased items will stay.')){state.shopping=state.shopping.filter(x=>!x.checked);changed();toast('Purchased items cleared');}
});
document.addEventListener('input',e=>{if(e.target.id==='search'){ui.search=e.target.value;if(ui.tab==='prepper')renderPrepperCards();else renderCards();}});
document.addEventListener('change',e=>{const t=e.target;
 if(t.id==='prepper-repeat'){const x=state.prepperItems.find(x=>x.id===modalId);x.reviewEveryMonths=t.checked?3:0;x.reviewDueAt=t.checked&&!x.priority?threeMonthsFrom():null;changed();$('#prepper-repeat')?.focus();}
 else if(t.dataset.inventoried){const id=t.dataset.inventoried;state.prepperItems.find(x=>x.id===id).inventoried=t.checked;changed();$$('[data-inventoried]').find(x=>x.dataset.inventoried===id&&(!!x.closest('dialog')===!!modalMode))?.focus();}
 else if(t.id==='priority-only'){ui.priorityOnly=t.checked;renderPrepperCards();}
 else if(t.id==='listed'||t.id==='long'){ui[t.id]=t.checked;renderCards();}
 else if(t.id==='tag'){ui.tag=t.value;renderCards();}
 else if(t.dataset.check){item(t.dataset.check).checked=t.checked;focusAfter(changed);$$('[data-check]').find(x=>x.dataset.check===t.dataset.check)?.focus();}
 else if(t.dataset.qty){const x=item(t.dataset.qty);if(positive(t.value)){x.quantity=Number(t.value);save();}else{t.value=x.quantity;toast('Enter a purchase quantity greater than zero.');}}
 else if(t.dataset.unit){const x=item(t.dataset.unit);if(t.value.trim()){x.unit=t.value.trim();save();}else{t.value=x.unit;toast('Enter a purchase unit.');}}
 else if(t.name==='ingredientId'){const row=t.closest('.ingredient-edit'),label=$('.new-name',row),input=$('input',label);label.hidden=!!t.value;input.required=!t.value;}
 else if(t.id==='import-file')importData(t.files[0]);
});
document.addEventListener('submit',e=>{if(['staple-form','recipe-form','manual-form'].includes(e.target.id)){e.preventDefault();persistForm(e.target);}});
$('#backup-button').onclick=()=>openModal('backup');$('#footer-backup').onclick=()=>openModal('backup');
$('#modal-close').onclick=closeModal;$('#modal-back').onclick=()=>openModal('used',recipeBack);
$('#modal').addEventListener('cancel',e=>{e.preventDefault();closeModal();});
$('#modal').addEventListener('keydown',e=>{if(e.key!=='Tab')return;const f=$$('button,input,select,textarea,[tabindex="0"]',$('#modal')).filter(x=>!x.disabled&&!x.closest('[hidden]')&&x.getClientRects().length);if(!f.length)return;const first=f[0],last=f.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement.id==='modal-title')){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
function checkPrepperReviews(){if(refreshPrepperReviews(state)){save();if(ui.tab==='prepper')render();if(modalMode==='prepper')renderModal();}}
window.addEventListener('focus',checkPrepperReviews);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)checkPrepperReviews();});
setInterval(checkPrepperReviews,60000);
warn();render();
})();
