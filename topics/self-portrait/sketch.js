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
function preload() {
  pic1 = loadImage('/assets/images/amandaSmall.png');
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
}

//Amanda's creepy lazy-eye
function drawEye() {

  //white eyeball
  push();
  noStroke();
  fill(250, 250, 250);
  ellipse(797, 235, 25, 10);
  pop();

  //green iris
  push();
  noStroke();
  fill(20, 170, 46);
  ellipse(797, 235, 10);
  pop();


  //black pupil
  push();
  noStroke();
  fill(0, 0, 0);
  ellipse(797, 235, 7);
  pop();
}


//Einstein's pink dog tongue
function drawTongue() {

  push();

  noStroke();
  fill(250, 194, 194);
  translate(50, 50);
  rect(532, 419, 15, 23)

  pop();

}
