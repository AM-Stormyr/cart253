/**
 * Doggy and Me
 * AM Stormyr
 * 
 * This is a selfportrait by AM Stormyr and her dog Einstein who LOVES to puzzle!   
 */


/**
 * I can't wait to see what this will be!
*/


// Loading the images
let pic1;
let einsteinHead;
let backgroundImage;


// Loading the sounds
let ambientSound;
let soundStarted = false;
let dogPant;
let ohHey;

//Loading Cursor
let pinkCursor;

function preload() {
  // console.log("preload is running");
  //images
  pic1 = loadImage('assets/images/amandaSmall.png');
  einsteinHead = loadImage('assets/images/einsteinHead.png');
  backgroundImage = loadImage('assets/images/BG.png');

  //sounds
  ambientSound = loadSound('assets/sounds/ambient-street-sounds.mp3')
  dogPant = loadSound('assets/sounds/dog-panting.mp3')
  ohHey = loadSound('assets/sounds/oh-hey.mp3')

  pinkCursor = loadImage('assets/images/pink-cursor.png');
}



// //Function to let me see the precise coordinates in Developer. 
// document.onmousemove = function (e) {
//   console.log("X: " + e.x + ", Y: " + e.y);
// };





function setup() {
  //Canvas that fills entire laptop screen
  createCanvas(1430, 768);
  //Changing the anglemode to degrees 
  angleMode(DEGREES);
  noCursor();

}






function mousePressed() {
  if (!soundStarted) {
    ambientSound.loop();
    ambientSound.setVolume(0.05);

    dogPant.loop();
    dogPant.setVolume(0.1);
    dogPant.pan(-0.4)


    ohHey.setVolume(0.12);
    ohHey.pan(0.4)
    ohHey.play(1)

    soundStarted = true;
    console.log("sound started")
  }
}





function draw() {
  //Background image of street in Montreal.
  image(backgroundImage, 0, 0, 1920, 1080);

  //cute picture of me and my dog Einstein! 
  image(pic1, 250, 105, 826, 664);




  //
  if (!soundStarted) {
    push;
    noStroke();
    fill(20, 250, 15);
    rect(308, 270, 250, 150)
    pop;

    push;
    textFont('Press Start 2P');
    fill(250, 250, 250);
    textAlign(RIGHT);
    textSize(22);
    text("Click to say hi", 267, 319, 245);
    pop;

  }


  // Draw the human eye
  drawEye();
  // Draw the dog tungue
  drawTongue();
  // Draw Einstein's head on top to hide the base of the tongue
  image(einsteinHead, 514, 380, 111, 143);
  //pink cursor
  //Pink Cursor
  image(pinkCursor, mouseX - 10, mouseY - 10, 80, 80);
}


/**This is where the movement of the 
 * lazy-eye and the pink pendulum dog-tongue happens
 * */


//Amanda's creepy lazy-eye
function drawEye() {

  //white eyeball
  push();
  noStroke();
  fill(250, 250, 250);
  ellipse(797, 235, 25, 10);
  pop();

  //black pupil that follows the mouse
  push();
  noStroke();
  fill(0, 0, 0);

  // Calculate the direction from eye center to mouse
  let eyeCenterX = 797;
  let eyeCenterY = 235;
  let mouseDirection = atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);

  // Calculate how far the pupil can move (stay within the white eyeball)
  let maxDistance = 3.5;

  // Calculate the pupil's new position
  let pupilX = eyeCenterX + cos(mouseDirection) * maxDistance;
  let pupilY = eyeCenterY + sin(mouseDirection) * maxDistance;

  // Draw the pupil at the new position
  ellipse(pupilX, pupilY, 10);
  pop();
}



//Einstein's pink dog tongue swinging like a pendulum!
function drawTongue() {
  push();
  noStroke();
  fill(250, 160, 200);


  translate(587, 460); // This is the connection point at the mouth

  // Calculate fast pendulum motion with small swing
  // sin() naturally goes from -1 to +1 and back, creating pendulum motion
  // Multiply by smaller number for smaller swing
  // Divide frameCount by smaller number to make it swing faster
  let pendulumAngle = sin(frameCount / 0.25) * 15;

  // Rotate around the pivot point
  rotate(pendulumAngle);

  // Draw the tongue hanging down from the pivot point
  // x: -7.5 centers it horizontally, y: 0 starts it right at the pivot
  rect(-7.5, 0, 15, 40);

  pop();





}