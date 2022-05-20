const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var sharktype = urlParams.get("sharktype");
if (sharktype == null) {
  sharktype = "shark1";
}

var shark;
var wreck;
var infos = ["A shark’s sense of smell is 10,000 times better than a human’s.", 
"The myth that sharks need to swim to breathe is false. Some breathe easily while motionless or resting.",
"Bony fishes are like blimps.They use their swim bladder to rise and sink in the water. Sharks are like airplanes. They use pectoral fins like wings to gain lift in the water.", 
"Cartilage, not bones. Sharks and rays have skeletons made of cartilage, a light connective tissue.", 
"Exposed gills, no covering. Sharks and rays have gill slits open to the water.", 
"Denticles, not scales. Shark skin is covered with tiny tooth-like structures called denticles.", 
"A sixth sense. Like us, sharks can see, hear, smell and feel touch. But they also have a sixth sense. Receptors on their heads can detect faint electric signals produced by the muscle contractions of other animals.", 
"No shark has human on its menu. They only attack human in rare conditions.", 
"Sharks have different teeth: (1) Conical teeth. Eating seals and seal lions require triangular serrated teeth to cut through muscle and bone. (2) Flat teeth. Sharks that eat hard-shelled prey like crabs or clams have flat teeth built for crushing. (3) Filters and tiny teeth. Some sharks eat tiny drifting plants and animals. Rather than using their teeth, they filter food through sieve-like gills. (4) Pointy Teeth. Sharks that eat fish or squids have sharp, pointed teeth to sng their slippery prey, which they swallow whole.", 
"Some sharks are oviparious. oviparious sharks lay eggs, which they attach to coral or algae. As the baby develop, it's nourished by the egg's rich yolk. Eventually, the pup breaks free of its egg case and swims away.",
"Some sharks are viviparous. This means the young are fed through a placenta-like connection that delivers food directly to pup. The pups are born free-swimming. ",
"Some sharks are ovoviviparous. This means the mother produces eggs that develop and hatch inside her. The young are nourished by the egg yolk. The pups are born free-swimming.",
"Sharks grow slowly, reproduce late, and have few pups. It can take up to 20 years for some species to reach sexual maturity. Even then, mothers may give birth to just a few pups once every other year.",
"Sharks breed differently. For instance, swell sharks lay their eggs in the water. Shortfin mako sharks keep their eggs inside until they hatch. Lemon sharks develop their pups through a placenta-like connection.",
"Sharks can have extreme sibling rivalry. In sand tiger sharks, the first embryo to hatch eats its siblings while still in uterus.",
"Sharks, in some form or another, have been around for over 400 million years, making an incredible evolutionary achievement. ",
"Sharks are dangerous if we eat them. Mercury makes sharks a bad choice for dinner table.",
"Not all sharks need to swim to breathe. Some, like these nurse sharks, can rest on the sea floor. They use strong muscles in their mouths to pump oxygen-rich water over their gills."];
var envinfo = "Plastic is trashing our ocean. They are one of the main culprits of the global trash gyres. These giant whirlpools of trash can be twice the size of Texas.";
var wreckinfo = "Wrecks become reefs. Just like natural reefs, shiprecks and other manmade structures serve as homes for marine life. Algae and small animals attach themselves to the surface of the wreck. Small fishes come to eat the algae. Large fishes, including sharks, come to eat the smaller fishes. The wreck becomes home to a rich community of marine life.";

var shark1_info = "Blue shark. It has countershading protects from above and below. The shortfin mako shark is able to elevate its body temperature almost 20°F above the surrounding water.";
var shark2_info = "Hammerhead shark. Why they school is still mystery. Their unique eye position allows for 360 degree vision.";
var shark3_info = "Epaulette Shark. Their protective coloration means safety. Their fins work as feet.";

//the scene is twice the size of the canvas
var SCENE_W = 3000;
var SCENE_H = 3000;

var knowledgeboxL;
var knowledgeboxW; 

var img1, im2, img3;

var isKeyboard = false;
var fontKanit;

function preload() {
  fontKanit = loadFont('./fonts/Kanit/Kanit-ExtraLight.ttf');
  img1 = loadImage("assets/shark1_stretching0001.png");
  img2 = loadImage("assets/shark2_stretching0001.png");
  img3 = loadImage("assets/shark3_stretching0001.png");
}

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  // fullscreen(myCanvas);

//   button1 = createButton('Bob')
//   .mousePressed(()  => {
//     sharktype = 'shark1';
//     console.log('debug button: ', sharktype);
//     setup_sharktype(sharktype);
//   });
  
//   button2 = createButton('Jack')
//   .mousePressed(()  => {sharktype = 'shark2'
//   console.log('debug button: ', sharktype);
//   setup_sharktype(sharktype);
// });

//   button3 = createButton('Lucy')
//   .mousePressed(()  => {sharktype = 'shark3'
//   console.log('debug button: ', sharktype);
//   setup_sharktype(sharktype);
// });

  // button1.position(0.2*windowWidth, 10);
  // button2.position(0.4*windowWidth, 10);
  // button3.position(0.6**windowWidth, 10);


  // button1.style('background-image', 'assets/shark1_stretching0001.png');
  // button2.style('background-image', 'assets/shark1_stretching0001.png');
  // button3.style('background-image', 'assets/shark1_stretching0001.png');

  // button1.id('button1');
  // button2.id('button2');
  // button3.id('button3');

  // document.getElementById("button1").innerHTML = '<img src="assets/shark1_stretching0001.png" />';
  // document.getElementById("button2").innerHTML = '<img src="assets/shark2_stretching0001.png" />';
  // document.getElementById("button3").innerHTML = '<img src="assets/shark3_stretching0001.png" />';

  // document.getElementById("button1").style.width = '50px';
  // document.getElementById("button1").style.height = 'auto';
  // document.getElementById("button2").style.width = '50px';
  // document.getElementById("button2").style.height = 'auto';
  // document.getElementById("button3").style.width = '50px';
  // document.getElementById("button3").style.height = 'auto';

  setup_sharktype(sharktype);
  knowledgeboxL= height * 0.5;
  knowledgeboxW = width * 0.8; 

  // time = millis();
  // button1.mouseOver(showImg(img1, 0, 0));
  // button2.mouseOver(showImg(img2, 0, 0));
  // button3.mouseOver(showImg(img3, 0, 0));

}

function showImg(img, posX, posY) {
  image(img, posX, posY);
  console.log("mouseOver debug");
}

function setup_sharktype(sharktype) {

  // // choose shark
  // let shark1_btn = document.getElementById("shark1");
  // let shark2_btn = document.getElementById("shark2");
  // let shark3_btn = document.getElementById("shark3");
  // let shark4_btn = document.getElementById("shark4");

  // shark1_btn.className = "active";

  // function clearActive() {
  //   //  sets active to false on all buttons
  //   shark1_btn.className = "";
  //   shark2_btn.className = "";
  //   shark3_btn.className = "";
  // }
  // function changeShark() {
  //   test = 1;
  //   console.log(test);
  //   sharktype = "shark1";
  //   clearActive();
  //   shark1_btn.className = "active";
  //   sharkSelect;
  // }
  // var test = 0;
  // shark1_btn.addEventListener("click", function () {
  //   test = 1;
  //   console.log(test);
  //   sharktype = "shark1";
  //   clearActive();
  //   shark1_btn.className = "active";
  //   sharkSelect;
  // });

  // console.log(test);
  // shark2_btn.addEventListener("click", function () {
  //   test = 2;
  //   console.log(test);
  //   sharktype = "shark2";
  //   clearActive();
  //   shark2_btn.className = "active";
  //   sharkSelect;
  // });
  // console.log(test);
  // shark3_btn.addEventListener("click", function () {
  //   test = 3;
  //   console.log(test);
  //   sharktype = "shark3";
  //   clearActive();
  //   shark3_btn.className = "active";
  //   sharkSelect;
  // });
  // console.log(test);
  
  // shark4_btn.addEventListener("click", function () {
  //   test = 4;
  //   console.log(test);
  // });
  // console.log(test);

  // let isMoving = false;
  
  // function sharkSelect () {
  //   if (isMoving === false) {
  //     console.log("false");
  //     return;
  //   }
  //   console.log("oh yeah");
  // }


  // create sprites and add animations
  shark = createSprite(SCENE_W/2, SCENE_H/2, 50, 100);

  var myAnimation = shark.addAnimation('floating', 'assets/'+sharktype+'_standing0001.png', 'assets/'+sharktype+'_standing0003.png');
  // myAnimation.offY = 18;
  shark.addAnimation('moving', 'assets/'+sharktype+'_walk0001.png', 'assets/'+sharktype+'_walk0003.png');
  shark.addAnimation('spinning', 'assets/'+sharktype+'_spin0001.png', 'assets/'+sharktype+'_spin0003.png');
  shark.addAnimation('stretching', 'assets/'+sharktype+'_stretching0001.png', 'assets/'+sharktype+'_stretching0002.png');

  shadow = createSprite(SCENE_W/2, SCENE_H/2+90, 80, 30);
  shadow.scale = 0.1;
  shadow.addAnimation('normal', 'assets/shadow0001.png', 'assets/shadow0002.png');
  shark.mouseActive = true;

  wreck = createSprite(SCENE_W/5, SCENE_H/5,50,50);
  wreck.addAnimation('normal', 'assets/wreck1.png', 'assets/wreck2.png');
  wreck.scale = 2;
  // wreck.immovable = true;

  // create groups
  bg = new Group();
  obstacles = new Group();
  infospots = new Group();
  jellyfishes = new Group();
  fishes = new Group();
  seals = new Group();
  moresharks = new Group();
  trashspots = new Group();
  trashes = new Group();

  for(var i=0; i<30; i++)
  {
    var jellyfish = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
    jellyfish.addAnimation('normal', 'assets/jellyfish1.png', 'assets/jellyfish4.png');
    jellyfish.setCollider('circle', -2, 2, 55);
    jellyfish.setSpeed(random(2, 3), random(0, 360));
    jellyfish.scale = random(0.5, 1);
    jellyfish.mass = jellyfish.scale;
    jellyfish.restitution = 0.9;
    jellyfishes.add(jellyfish);
  }

  for(var i=0; i<5; i++)
  {
    var moreshark = createSprite(SCENE_W/2+random(-100,100), SCENE_H/2+random(-100,100), 50, 100);
    var moreAnimation = moreshark.addAnimation('floating', 'assets/'+sharktype+'_standing0001.png', 'assets/'+sharktype+'_standing0003.png');
    // moreAnimation.offY = 18;
    jellyfish.scale = random(0.5, 1.5);
    moreshark.addAnimation('moving', 'assets/'+sharktype+'_walk0001.png', 'assets/'+sharktype+'_walk0003.png');
    moreshark.addAnimation('spinning', 'assets/'+sharktype+'_spin0001.png', 'assets/'+sharktype+'_spin0003.png');
    moreshark.addAnimation('stretching', 'assets/'+sharktype+'_stretching0001.png', 'assets/'+sharktype+'_stretching0002.png');
    moresharks.add(moreshark);
  }
  
  for(var i=0; i<20; i++)
  {
    var seal = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
    seal.addAnimation('normal', 'assets/seal1.png', 'assets/seal5.png');
    seal.setCollider('circle', -2, 2, 55);
    seal.setSpeed(random(2, 3), random(0, 360));
    seal.scale = random(0.5, 1);
    seal.mass = seal.scale;
    seal.restitution = 0.9;
    seals.add(seal);
  }

  fish_center_x = random(0, SCENE_W);
  fish_center_y = random(0, SCENE_H);
  fish_center_speed = random(5, 10);
  fish_center_direction = random(0, 360);
  for(var i=0; i<200; i++)
  {
    var fish = createSprite(fish_center_x+random(-50,50), fish_center_y+random(-20,20));
    fish.addAnimation('normal', 'assets/fish1.png', 'assets/fish5.png');
    fish.setCollider('circle', -2, 2, 55);
    fish.setSpeed(fish_center_speed+random(-1,1), fish_center_direction+random(-3,3));
    fish.scale = random(0.5, 1);
    fish.mass = fish.scale;
    fish.restitution = 0.9;
    fishes.add(fish);
  }

  // create some background for visual reference
  for(var i=0; i<100; i++)
  {
    //create a sprite and add the 3 animations
    var rock = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
    //cycles through rocks 0 1 2
    rock.addAnimation('normal', 'assets/seabed'+i%5+'.png');
    bg.add(rock);
  }

  for(var j=0; j<4; j++)
  {
    random_x = random(10, SCENE_W-10);
    random_y = random(10, SCENE_H-10);
    var trashspot = createSprite(random_x, random_y);
    trashspot.addAnimation('normal', 'assets/danger1.png', 'assets/danger1.png');
    trashspots.add(trashspot);
      // create trash spots
  for(var i=0; i<10; i++) {
    var trash = createSprite(random_x, random_y, 20, 20);
    trash.addAnimation('normal', 'assets/trash1.png', 'assets/trash3.png');
    trashes.add(trash)
  }
  }

    // create knowledge boards
    for(var j=0; j<infos.length; j++)
    {
      var random_x = random(10, SCENE_W-10); 
      var random_y = random(10, SCENE_H-10);
      infospot = createSprite(random_x, random_y);
      infospot.addAnimation('normal', 'assets/infodot1.png', 'assets/infodot3.png');
      infospot.addAnimation('discovered', 'assets/infoflag1.png', 'assets/infoflag4.png');
      infospots.add(infospot);
    }

    // function createInfo(infoTag) {
    //   var infoid = ''+infoTag;
    //   document.getElementById(infoid).style.display = 'inline';
    //   document.getElementById(infoid).style.visibility = "visible";
    //   $('#'+infoid).delay(3200).fadeOut(300);
    // }

  // frame = loadImage('assets/frame.png');
}

function collect(collector, collected)
{
  
  collector.changeAnimation('stretching');
  collector.animation.rewind();
  collected.changeAnimation('discovered');

  console.log("here");
  for(var i=0; i<infos.length; i++) {
    // console.log("in here");
    if (Math.abs(infospots[i].position.x-collector.position.x)<50 && Math.abs(infospots[i].position.y-collector.position.y)<50) {

      // draw rec panel
      fill('rgba(251, 250, 218)');
      noStroke();
      // strokeWeight(2);
      // rect(infospotArr[i].position.x+20, infospotArr[i].position.y-100, knowledgeboxW, knowledgeboxL, 20);
      
      // draw text
      textSize(20);
      textFont(fontKanit);
      text(infos[i], infospots[i].position.x-knowledgeboxW/2, infospots[i].position.y+100, knowledgeboxW, knowledgeboxL);

    }
  }


  // // show info
  // document.getElementById('info_01').style.display = 'inline';
  // document.getElementById("info_01").style.visibility = "visible";
  // $("#info_01").delay(3200).fadeOut(300);
}


function trashout(collector, collected) {
  collected.velocity.x = random(-50, 50);
  collected.velocity.y = random(-50, 50);
}

function destroy(collector, collected)
{
  collected.remove();
}

function envinfo_display(collector, collected) {
  if (Math.abs(collected.position.x-collector.position.x)<50 && Math.abs(collected.position.y-collector.position.y)<50) {
    fill('rgba(251, 250, 218)');
    noStroke();
    textSize(20);
    textFont(fontKanit);
    // if( millis() < time + 5000){
      text(envinfo, collected.position.x-knowledgeboxW/2, collected.position.y+100, knowledgeboxW, knowledgeboxL);
    // }
  }
}

function wreckinfo_display(collector, collected) {
  if (Math.abs(collected.position.x-collector.position.x)<50 && Math.abs(collected.position.y-collector.position.y)<50) {
    fill('rgba(251, 250, 218)');
    noStroke();
    textSize(20);
    textFont(fontKanit);
    text(wreckinfo, collected.position.x-knowledgeboxW/2, collected.position.y+100, knowledgeboxW, knowledgeboxL);
  }
}

function track_shark(shark) {
    // limit the shark movements
    if(shark.position.x < 0)
    shark.position.x = 0;
  if(shark.position.y < 0)
    shark.position.y = 0;
  if(shark.position.x > SCENE_W)
    shark.position.x = SCENE_W;
  if(shark.position.y > SCENE_H)
    shark.position.y = SCENE_H;

    // console.log(camera.mouseX, shark.position.x)
    threshold = 30;
    keyboard_speed = 5;
    xflip = 1;
    yflip = 1;
    shark_status = 'floating';
    if (isKeyboard) {
      if (keyIsDown(LEFT_ARROW)) {
        shark_status = 'moving';
        shark.changeAnimation(shark_status);
        xflip = -1;
        shark.velocity.x = -keyboard_speed;
      }
      if(keyIsDown(RIGHT_ARROW)) {
        shark_status = 'moving';
        shark.changeAnimation(shark_status);
        shark.velocity.x = keyboard_speed;
        xflip = 1;
      }
      if (keyIsDown(DOWN_ARROW)) {
        shark_status = 'moving';
        shark.changeAnimation(shark_status);
        shark.velocity.y = -keyboard_speed;
        yflip = 1
      }
      if(keyIsDown(UP_ARROW)) {
        shark_status = 'moving';
        shark.changeAnimation(shark_status);
        yflip = -1
        shark.velocity.y = keyboard_speed;
      }
      shark.mirrorX(xflip);
      shark.mirrorY(yflip);
    }
    else {
          //mouse trailer, the speed is inversely proportional to the mouse distance
    var speedfactor = 25;
    shark.velocity.x = (camera.mouseX-shark.position.x)/speedfactor;
    shark.velocity.y = (camera.mouseY-shark.position.y)/speedfactor;
    if (camera.mouseX < shark.position.x + threshold && camera.mouseX > shark.position.x - threshold && camera.mouseY < shark.position.y + threshold && camera.mouseY > shark.position.y - threshold) {
      //if close to the mouse, don't move
      shark_status = 'floating';
      shark.changeAnimation(shark_status);
      shark.velocity.x = 0;
      shark.velocity.y = 0; 
    }
    else {
      if (camera.mouseX < shark.position.x - threshold || keyIsDown(LEFT_ARROW)) {
        shark_status = 'moving';
        shark.changeAnimation(shark_status);
        xflip = -1;
      }
      if(camera.mouseX > shark.position.x + threshold || keyIsDown(RIGHT_ARROW)) {
        shark_status = 'moving';
        shark.changeAnimation(shark_status);
        xflip = 1;
      }
      if (camera.mouseY < shark.position.y - threshold || keyIsDown(DOWN_ARROW)) {
        shark_status = 'moving';
        shark.changeAnimation(shark_status);
        yflip = 1;
      }
      if(camera.mouseY > shark.position.y + threshold || keyIsDown(UP_ARROW)) {
        shark_status = 'moving';
        shark.changeAnimation(shark_status);
        yflip = -1;
      }
      shark.mirrorX(xflip);
      shark.mirrorY(yflip);
    } 
  }
}



function draw() {
  background(0,94,184);

  //a camera is created automatically at the beginning

  //.5 zoom is zooming out (50% of the normal size)
  if(mouseIsPressed) 
    camera.zoom = 0.5;
  else
    camera.zoom = 1;

  // set the camera position to the shark position
  camera.position.x = shark.position.x;
  camera.position.y = shark.position.y;

  track_shark(shark);
    
    // for(var i=0; i<moresharks.length; i++)
    // {
    //   track_shark(moresharks[i]);
    //   // moresharks[i].changeAnimation(shark_status);
    //   // // if (shark_status == 'moving') {
    //   //   moresharks[i].velocity.x = shark.velocity.x+random(-1, 1);
    //   //   moresharks[i].velocity.y = shark.velocity.y+random(-1, 1);
    //   //   // moresharks[i].position.x = shark.position.x+random(0, 0);
    //   //   // moresharks[i].position.y = shark.position.y+random(0, 0);
    //   //   moresharks[i].mirrorX(xflip);
    //   //   moresharks[i].mirrorY(yflip);
    //   // // }
    // }

    shadow.position.x = shark.position.x;
    shadow.position.y = shark.position.y+90;
   
   shark.overlap(infospots, collect);    
    
    if(shark.getAnimationLabel() == 'stretching' && shark.animation.getFrame() == shark.animation.getLastFrame())
  {
    shark.changeAnimation('floating');
  }


  shark.overlap(trashspots, envinfo_display);
  // shark.overlap(trashspots, destroy);
  shark.overlap(trashes, trashout);
  jellyfishes.bounce(jellyfishes);
  jellyfishes.bounce(shark);
  shark.overlap(seals, destroy);
  shark.overlap(fishes, destroy);
  shark.overlap(wreck, wreckinfo_display);

  seals.bounce(seals);

    if(mouseIsPressed) {
      //the rotation is not part of the spinning animation
      shark.rotation -= 10;
      shark.changeAnimation('spinning');

      // pop up rectangle
      // noStroke();
      // fill(204, 153, 255);
      // ellipse(shark.position.x, shark.position.y, 200, 400);

    }
    else
      shark.rotation = 0;

    //all sprites bounce at the screen edges
    for(var i=0; i<allSprites.length; i++) {
      var s = allSprites[i];
      if(s.position.x<-width) {
        s.position.x = -width+1;
        s.velocity.x = abs(s.velocity.x);
      }
  
      if(s.position.x>SCENE_W+width) {
        s.position.x = SCENE_W+width-1;
        s.velocity.x = -abs(s.velocity.x);
      }
  
      if(s.position.y<-height) {
        s.position.y = -height+1;
        s.velocity.y = abs(s.velocity.y);
      }
  
      if(s.position.y>SCENE_H+height) {
        s.position.y = SCENE_H+height-1;
        s.velocity.y = -abs(s.velocity.y);
      }
    }  

  // rocks first
  drawSprites(bg);
  drawSprite(wreck);

  // trashes and trash spots
  drawSprites(trashes);
  drawSprites(trashspots);

  // jellyfishes, fishes and seals
  drawSprites(jellyfishes);
  drawSprites(fishes);
  drawSprites(seals);

  // shadow
  drawSprite(shadow);
  // noStroke();
  // fill(0, 0, 0, 20);  // ellipse(shark.position.x, shark.position.y+90, 80, 30);

  // knowledge boards
  drawSprites(infospots);

  //character on the top
  // if (sharktype == "shark2") {
  //   drawSprites(moresharks);
  // }
  drawSprite(shark);

  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at
  //the absolute 0,0 (try to see what happens if you don't turn it off
  camera.off();
  // image(frame, 0, 0);


  
}

