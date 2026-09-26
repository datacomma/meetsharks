/* The world keeps its original p5 artwork. UI and input use browser APIs. */
const params = new URLSearchParams(location.search);
const sharktype = ['shark1','shark2','shark3'].includes(params.get('sharktype')) ? params.get('sharktype') : 'shark1';
const names = {shark1:'Bob',shark2:'Jack',shark3:'Lucy'};
const SCENE_W = 3000, SCENE_H = 3000;
const animations = {};
let shark, shadow, wreck, scenery, creatures, trash, markers;
let pointer = null, spinUntil = 0, ready = false;
let worldTime = 0, encounterUntil = 0;
let completionPending = false;
const recoil = {x:0,y:0};
const keys = new Set(), nearby = new Set(), discovered = new Set();
const dialog = document.getElementById('fact-dialog');
const music = document.getElementById('music');
let soundWanted = true;
try {soundWanted = sessionStorage.getItem('sharks-sound') !== 'off';} catch (_) {}
music.autoplay = soundWanted;
if(!soundWanted) music.pause();
try {
  const saved = JSON.parse(localStorage.getItem('sharks-discoveries-v1') || '[]');
  if (Array.isArray(saved)) saved.filter(i => Number.isInteger(i) && i >= 0 && i < sharkFacts.length).forEach(i => discovered.add(i));
} catch (_) { /* Exploration also works when browser storage is unavailable. */ }
function preload() {
  for (const [label, action, count] of [['floating','standing',3],['moving','walk',3],['spinning','spin',3],['stretching','stretching',2]]) {
    animations[label] = loadAnimation(...Array.from({length:count}, (_,i) => 'assets/' + sharktype + '_' + action + '000' + (i+1) + '.png'));
  }
  for (const [name, count] of [['shadow',2],['wreck',2],['jellyfish',4],['fish',5],['seal',5],['trash',3],['infodot',3],['infoflag',4]]) {
    animations[name] = loadAnimation(...Array.from({length:count}, (_,i) => 'assets/' + name + (name === 'shadow' ? '000' : '') + (i+1) + '.png'));
  }
  for (let i=0;i<5;i++) animations['seabed'+i] = loadAnimation('assets/seabed'+i+'.png');
  animations.danger = loadAnimation('assets/danger1.png');
}
function sprite(x,y,name,scale=1) {
  const item = createSprite(x,y);
  item.addAnimation('normal',animations[name]);
  item.scale = scale;
  return item;
}
function setup() {
  pixelDensity(Math.min(window.devicePixelRatio || 1,2));
  const canvas = createCanvas(window.innerWidth,window.innerHeight);
  canvas.parent('ocean');
  canvas.elt.tabIndex = 0;
  canvas.elt.setAttribute('aria-label','Swim using arrow keys, WASD, or drag on the ocean. Open the field guide to read discoveries.');
  updateSprites(false); // Explicit updates let reading and background tabs pause the world.
  // This bundled p5 version runs pre-hooks on window in global mode, while
  // bound updateSprites calls use the p5 instance. Disable both auto-updates.
  window.spriteUpdate = false;
  scenery = new Group(); creatures = new Group(); trash = new Group(); markers = new Group();
  for (let i=0;i<80;i++) scenery.add(sprite(random(0,SCENE_W),random(0,SCENE_H),'seabed'+i%5));
  wreck = sprite(600,600,'wreck',1.6);
  for (const [name,count] of [['jellyfish',20],['seal',14],['fish',70]]) {
    for(let i=0;i<count;i++) {
      const animal=sprite(random(60,SCENE_W-60),random(60,SCENE_H-60),name,random(.45,.85));
      animal.kind=name;
      animal.setSpeed(random(.6,1.7),random(0,360));
      creatures.add(animal);
    }
  }
  for(let j=0;j<4;j++) {
    const x=400+(j%2)*2100,y=1100+Math.floor(j/2)*1400;
    const sign=sprite(x,y,'danger',.7); sign.factKey='trash'; markers.add(sign);
    for(let i=0;i<7;i++) trash.add(sprite(x+random(-65,65),y+random(-65,65),'trash',.7));
  }
  sharkFacts.forEach((fact,i) => {
    const x=i===0?1720:250+(i%5)*570, y=i===0?1500:250+Math.floor(i/5)*760;
    const marker=sprite(x,y,'infodot',.7);
    marker.addAnimation('discovered',animations.infoflag);
    marker.factIndex=i;
    if(discovered.has(i)) marker.changeAnimation('discovered');
    markers.add(marker);
  });
  shadow=sprite(1500,1550,'shadow',.1);
  shark=createSprite(1500,1500);
  for(const name of ['floating','moving','spinning','stretching']) shark.addAnimation(name,animations[name]);
  shark.changeAnimation('floating');
  shark.setCollider('circle',0,0,40);
  bindInput(canvas.elt);
  windowResized();
  updateProgress();
  document.getElementById('loading').hidden=true;
  ready=true;
  // Include returning players who completed their collection before this screen existed.
  if(discovered.size===sharkFacts.length) {
    let seen=false;
    try {seen=localStorage.getItem('sharks-completion-seen-v1')==='yes';} catch (_) {}
    if(!seen) showCompletion();
  }
  if(soundWanted) playMusic();
  else updateSoundButton();
}
function clearInput() {pointer=null;keys.clear();recoil.x=recoil.y=0;if(shark) shark.velocity.mult(0);}
function bindInput(canvas) {
  canvas.addEventListener('pointerdown',event => {
    if(dialog.open || !event.isPrimary || event.button!==0) return;
    canvas.focus({preventScroll:true});
    pointer={id:event.pointerId,x:event.clientX,y:event.clientY};
    canvas.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  canvas.addEventListener('pointermove',event => {
    if(pointer && event.pointerId===pointer.id) {pointer.x=event.clientX;pointer.y=event.clientY;}
  });
  for(const name of ['pointerup','pointercancel','lostpointercapture']) canvas.addEventListener(name,event => {
    if(pointer && event.pointerId===pointer.id) pointer=null;
  });
  window.addEventListener('keydown',event => {
    if(dialog.open || document.activeElement?.matches('button,a,input,textarea,select')) return;
    const key=event.key.toLowerCase();
    if(['arrowleft','arrowright','arrowup','arrowdown','w','a','s','d'].includes(key)) {
      event.preventDefault();pointer=null;keys.add(key);
    }
    if(key===' ' && !event.repeat) {event.preventDefault();spinUntil=millis()+700;}
  });
  window.addEventListener('keyup',event => keys.delete(event.key.toLowerCase()));
  window.addEventListener('blur',clearInput);
  document.addEventListener('visibilitychange',() => {
    clearInput();
    if(document.hidden) music.pause();
    else if(soundWanted) playMusic();
  });
  if(window.visualViewport) window.visualViewport.addEventListener('resize',windowResized);
}
function windowResized() {
  clearInput();
  resizeCanvas(window.innerWidth,window.innerHeight);
  // Bound the artwork by BOTH screen dimensions, including phone landscape.
  if(shark) shark.scale=Math.min(1, Math.min(width*.32,height*.30)/Math.max(animations.floating.getWidth(),animations.floating.getHeight()));
}
function playerScreenY() {
  const top=document.querySelector('.game-header').getBoundingClientRect().bottom;
  const bottom=document.querySelector('.game-footer').getBoundingClientRect().top;
  return (top+bottom)/2;
}
function movePlayer(step) {
  let dx=Number(keys.has('arrowright')||keys.has('d'))-Number(keys.has('arrowleft')||keys.has('a'));
  let dy=Number(keys.has('arrowdown')||keys.has('s'))-Number(keys.has('arrowup')||keys.has('w'));
  if(pointer) {dx=pointer.x-width/2;dy=pointer.y-playerScreenY();if(Math.hypot(dx,dy)<18) dx=dy=0;}
  const length=Math.hypot(dx,dy);
  if(length) {
    const speed=pointer?Math.min(5,length/22):5;
    shark.position.x=constrain(shark.position.x+dx/length*speed*step,45,SCENE_W-45);
    shark.position.y=constrain(shark.position.y+dy/length*speed*step,45,SCENE_H-45);
    if(Math.abs(dx)>.1) shark.mirrorX(dx<0?-1:1);
  }
  shark.position.x=constrain(shark.position.x+recoil.x*step,45,SCENE_W-45);
  shark.position.y=constrain(shark.position.y+recoil.y*step,45,SCENE_H-45);
  recoil.x*=Math.pow(.82,step);recoil.y*=Math.pow(.82,step);
  if(Math.hypot(recoil.x,recoil.y)<.05) recoil.x=recoil.y=0;
  shark.changeAnimation(length?'moving':'floating');
  if(millis()<spinUntil) {shark.changeAnimation('spinning');shark.rotation+=12*step;}
  else shark.rotation=0;
}
function checkDiscoveries() {
  const spots=[...markers,wreck];
  for(const item of spots) {
    const distance=Math.hypot(item.position.x-shark.position.x,item.position.y-shark.position.y);
    if(distance>150) nearby.delete(item);
    if(distance<95 && !nearby.has(item)) {
      nearby.add(item);
      if(item.factIndex!==undefined) {
        const index=item.factIndex;
        const alreadyFound=discovered.has(index);
        discovered.add(index);item.changeAnimation('discovered');
        if(!alreadyFound && discovered.size===sharkFacts.length) completionPending=true;
        try {localStorage.setItem('sharks-discoveries-v1',JSON.stringify([...discovered]));} catch (_) {}
        updateProgress();showFact(sharkFacts[index], 'Discovery '+(index+1)+' / '+sharkFacts.length, alreadyFound);
      } else showFact(oceanFacts[item===wreck?'wreck':'trash'],'Ocean field notes');
      break; // Never replace a fact with another in the same frame.
    }
  }
}
function updateProgress() {document.getElementById('progress').textContent=discovered.size+' / '+sharkFacts.length+' discoveries';}
function showFact(fact,category,alreadyFound=false) {
  clearInput();
  dialog.classList.remove('completion-screen');
  document.getElementById('continue').textContent=completionPending?'Celebrate →':'Keep exploring →';
  document.getElementById('fact-category').textContent=category;
  document.getElementById('fact-title').textContent=fact.title;
  document.getElementById('fact-body').textContent=fact.body;
  document.getElementById('found-status').hidden=sharkFacts.indexOf(fact)<0;
  document.getElementById('found-hint').textContent=alreadyFound?'You’ve found this fact before. Its flag stays in the ocean so you can return any time.':'This fluffy bubble is now a flag. Swim back to the flag to read this fact again.';
  const source=document.getElementById('fact-source');source.hidden=!fact.source;if(fact.source) source.href=fact.source;
  document.getElementById('fact-count').textContent=discovered.size===sharkFacts.length?'All shark facts discovered!':discovered.size+(discovered.size===1?' discovery collected':' discoveries collected');
  document.getElementById('guide-list').hidden=true;
  if(!dialog.open) dialog.showModal();
  dialog.scrollTop=0;
  document.getElementById('continue').focus();
}
function showCompletion() {
  completionPending=false;
  showFact({title:'Congratulations, ocean explorer!',body:'You’ve found all '+sharkFacts.length+' shark facts! We hope you enjoyed your journey through the ocean. There’s always more to discover—visit your local aquarium to meet marine life and learn even more fascinating facts about sharks.'},'A whole ocean of discoveries');
  dialog.classList.add('completion-screen');
  document.getElementById('fact-count').textContent=sharkFacts.length+' / '+sharkFacts.length+' facts found';
  try {localStorage.setItem('sharks-completion-seen-v1','yes');} catch (_) {}
}
function closeFact() {
  // Let players finish reading their final discovery before celebrating it.
  if(completionPending) {showCompletion();return;}
  dialog.close();clearInput();document.querySelector('canvas')?.focus({preventScroll:true});
}
for(const id of ['close-fact','continue']) document.getElementById(id).addEventListener('click',closeFact);
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeFact();});
 dialog.addEventListener('close',clearInput);
 document.getElementById('field-guide').addEventListener('click',() => {
  showFact({title:'Your ocean field guide',body:discovered.size?'Revisit the things you’ve learned. Find more fluffy white bubbles to grow your collection. Found bubbles become flags—swim back to a flag to read its fact again.':'Your discoveries start here. Swim into a fluffy white bubble to find your first shark fact. It will become a flag you can revisit.'},'Collected along the way');
  const list=document.getElementById('guide-list');list.replaceChildren();list.hidden=false;
  [...discovered].sort((a,b)=>a-b).forEach(i => {const button=document.createElement('button');button.textContent=sharkFacts[i].title;button.onclick=()=>showFact(sharkFacts[i],'Discovery '+(i+1)+' / '+sharkFacts.length,true);list.append(button);});
});
 document.getElementById('spin').addEventListener('click',() => {if(ready) {spinUntil=millis()+700;document.querySelector('canvas').focus({preventScroll:true});}});
function updateSoundButton() {
  document.getElementById('sound').textContent=soundWanted?'Sound on':'Sound off';
  document.getElementById('sound').setAttribute('aria-pressed',String(soundWanted));
}
async function playMusic() {
  if(!soundWanted) return;
  try {await music.play();if(!soundWanted) music.pause();} catch (_) {
    // Autoplay may need a first tap/key. Keep the user's preference and retry
    // on that gesture instead of silently turning their music setting off.
  }
  updateSoundButton();
}
for(const eventName of ['pointerdown','keydown']) document.addEventListener(eventName,event => {
  if(!event.target.closest('#sound') && soundWanted && music.paused) playMusic();
},true);
 document.getElementById('sound').addEventListener('click',async () => {
  soundWanted=!soundWanted;
  try {sessionStorage.setItem('sharks-sound',soundWanted?'on':'off');} catch (_) {}
  if(soundWanted) await playMusic();
  else music.pause();
  updateSoundButton();
});
function encounter(message) {
  const toast=document.getElementById('encounter');
  toast.textContent=message;toast.hidden=false;encounterUntil=worldTime+2300;
}
function interactWith(animal) {
  if(animal.respawnAt) {
    if(worldTime>=animal.respawnAt) {
      animal.position.x=(shark.position.x+1200)%SCENE_W;
      animal.position.y=random(50,SCENE_H-50);
      animal.visible=true;animal.respawnAt=0;
    }
    return;
  }
  const dx=shark.position.x-animal.position.x,dy=shark.position.y-animal.position.y;
  const distance=Math.hypot(dx,dy);
  const playerRadius=animations.floating.getWidth()*shark.scale*.28;
  const animalRadius=animations[animal.kind].getWidth()*animal.scale*.3;
  const reach=playerRadius+animalRadius;
  if(distance>=reach) return;
  if(animal.kind==='jellyfish' || animal.kind==='seal') {
    const nx=distance?dx/distance:1,ny=distance?dy/distance:0;
    const separation=reach-distance+2;
    // Separate bodies immediately, then ease out a short recoil impulse.
    shark.position.x=constrain(shark.position.x+nx*separation*.55,45,SCENE_W-45);
    shark.position.y=constrain(shark.position.y+ny*separation*.55,45,SCENE_H-45);
    animal.position.x-=nx*separation*.55;animal.position.y-=ny*separation*.55;
    if(worldTime>=(animal.bumpUntil||0)) {
      recoil.x=nx*7;recoil.y=ny*7;
      animal.velocity.x=-nx*2;animal.velocity.y=-ny*2;
      animal.bumpUntil=worldTime+1600;
      encounter(animal.kind==='seal'?'Boop! A seal gave you a playful nudge!':'Boing! You body-bumped a jellyfish!');
    }
  } else {
    animal.visible=false;animal.respawnAt=worldTime+4000;
    encounter('Chomp! A little fish snack!');
  }
}
function draw() {
  if(!ready) return;
  // p5.play applies its camera before draw. Reset it before moving so this
  // frame's transform always follows this frame's player position.
  camera.off();background(0,94,184);
  const step=Math.min(deltaTime || 16.67,40)/16.67;
  if(!dialog.open && !document.hidden) {
    worldTime+=step*16.67;
    updateSprites(true);updateSprites(false);
    movePlayer(step);
    for(const animal of creatures) {
      if(animal.position.x<30 || animal.position.x>SCENE_W-30) {animal.position.x=constrain(animal.position.x,30,SCENE_W-30);animal.velocity.x*=-1;}
      if(animal.position.y<30 || animal.position.y>SCENE_H-30) {animal.position.y=constrain(animal.position.y,30,SCENE_H-30);animal.velocity.y*=-1;}
      interactWith(animal);
    }
    if(worldTime>=encounterUntil) document.getElementById('encounter').hidden=true;
    checkDiscoveries();
  }
  camera.zoom=1;
  camera.position.x=shark.position.x;
  camera.position.y=shark.position.y+height/2-playerScreenY();
  camera.on();
  drawSprites(scenery);drawSprite(wreck);drawSprites(trash);drawSprites(creatures);
  drawSprites(markers);
  shadow.position.x=shark.position.x;shadow.position.y=shark.position.y+50*shark.scale;drawSprite(shadow);
  drawSprite(shark);
  camera.off();
  const labelY=playerScreenY()-Math.max(35,animations.floating.getHeight()*shark.scale/2)-20;
  noStroke();fill('#ffffff');textFont('sans-serif');textSize(12);textAlign(CENTER,CENTER);text('YOU · '+names[sharktype],width/2,labelY);
  // A small compass points toward the nearest undiscovered fact.
  const remaining=[...markers].filter(s=>s.factIndex!==undefined && !discovered.has(s.factIndex));
  remaining.sort((a,b)=>Math.hypot(a.position.x-shark.position.x,a.position.y-shark.position.y)-Math.hypot(b.position.x-shark.position.x,b.position.y-shark.position.y));
  if(remaining.length) {
    const target=remaining[0],dx=target.position.x-shark.position.x,dy=target.position.y-shark.position.y;
    const angle=Math.atan2(dy,dx),radius=Math.min(width*.34,height*.25,170);
    push();translate(width/2+Math.cos(angle)*radius,playerScreenY()+Math.sin(angle)*radius);rotate(angle);fill('#ffde86');triangle(9,0,-5,-6,-5,6);pop();
  }
}
