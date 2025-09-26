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
function preload() {
  pic1 = loadImage('/assets/images/amandaSmall.png');
  einsteinHead = loadImage('/assets/images/einsteinHead.png');
}

//Function to let me see the precise coordinates in Developer. 
document.onmousemove = function (e) {
  console.log("X: " + e.x + ", Y: " + e.y);
};






function setup() {
  //Canvas that fills entire laptop screen
  createCanvas(1430, 768);
  //Changing the anglemode to degrees 
  angleMode(DEGREES);
}

function draw() {
  //beautiful background colour goes here
  background(250, 200, 120);

  //cute picture of me and my dog Einstein! 
  image(pic1, 250, 105, 826, 664);


  // Draw the human eye
  drawEye();
  // Draw the dog tungue
  drawTongue();
  // Draw Einstein's head on top to hide the base of the tongue
  image(einsteinHead, 514, 380, 111, 143);
}

//Amanda's creepy lazy-eye
function drawEye() {

  //white eyeball
  push();
  noStroke();
  fill(250, 250, 250);
  ellipse(797, 235, 25, 10);
  pop();

  // //green iris
  // push();
  // noStroke();
  // fill(20, 170, 46);
  // ellipse(797, 235, 10);
  // pop();


  //black pupil
  push();
  noStroke();
  fill(0, 0, 0);
  ellipse(797, 235, 7);
  pop();
}


//Einstein's pink dog tongue swinging like a pendulum!
function drawTongue() {
  push();
  noStroke();
  fill(250, 194, 194);

  // Move to the pivot point (center-top of where the tongue should be)
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