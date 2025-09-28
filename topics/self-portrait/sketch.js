/**
 * Doggy and Me
 * AM Stormyr
 * 
 * This is a selfportrait by AM Stormyr and her dog Einstein who LOVES to puzzle!   
 */


/**
 * This is a simulation of meeting in the street. 
*/


// Loading the images
let pic1;
let einsteinHead;
let backgroundImage;
let amandaSmallSide;


// Loading the sounds
let ambientSound;
let soundStarted = false;
let dogPant;
let ohHey;
let somethingFun;
let ohHeyFinished = false;
let showTextBox = false;
let imBored;
let letsGo;
let somethingFunFinished = false;
let showYesNoBoxes = false;


// Ending sequence variables
let endingStarted = false;
let sideImageX = 250;
let showToBeContinued = false;


//Loading Cursor
let pinkCursor;

function preload() {
  // console.log("preload is running");
  //images
  pic1 = loadImage('assets/images/amandaSmall.png');
  einsteinHead = loadImage('assets/images/einsteinHead.png');
  backgroundImage = loadImage('assets/images/BG.png');
  amandaSmallSide = loadImage('assets/images/amandaSmallSide.png');

  //sounds
  ambientSound = loadSound('assets/sounds/ambient-street-sounds.mp3')
  dogPant = loadSound('assets/sounds/dog-panting.mp3')
  ohHey = loadSound('assets/sounds/oh-hey.mp3')
  somethingFun = loadSound('assets/sounds/something-fun.mp3')
  imBored = loadSound('assets/sounds/im-bored.mp3')
  letsGo = loadSound('assets/sounds/letsGo.mp3')

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


    ohHey.setVolume(0.14);
    ohHey.pan(0.4)
    ohHey.play(1)

    // Set up callback for when ohHey finishes
    ohHey.onended(function () {
      ohHeyFinished = true;
      showTextBox = true;
      console.log("ohHey finished, showing text box");
    });

    soundStarted = true;
    console.log("sound started")
  }
  // Separate condition for text box clicks
  else if (ohHeyFinished && showTextBox) {
    // Check if mouse is over the text box area
    if (mouseX > 308 && mouseX < 558 && mouseY > 270 && mouseY < 420) {
      somethingFun.play();
      somethingFun.setVolume(0.28);
      somethingFun.pan(0.4);
      showTextBox = false;
      console.log("Text box clicked, playing next sound");
      // Set up callback for when somethingFun finishes
      somethingFun.onended(function () {
        somethingFunFinished = true;
        showYesNoBoxes = true;
        console.log("somethingFun finished, showing yes/no boxes");
      });

      console.log("Text box clicked, playing somethingFun");
    }
  }
  // Third click - handle yes/no choices
  else if (somethingFunFinished && showYesNoBoxes) {
    // Check if clicking "NO" box (left box)
    if (mouseX > 250 && mouseX < 400 && mouseY > 270 && mouseY < 370) {
      imBored.play();
      imBored.setVolume(0.22);
      showYesNoBoxes = false;

      // When im-bored finishes, show yes/no boxes again
      imBored.onended(function () {
        showYesNoBoxes = true;
        console.log("im-bored finished, showing yes/no boxes again");
      });

      console.log("NO clicked, playing im-bored");
    }
    // Check if clicking "YES" box (right box)
    else if (mouseX > 450 && mouseX < 600 && mouseY > 270 && mouseY < 370) {
      letsGo.play();
      letsGo.setVolume(0.3);
      showYesNoBoxes = false;

      // Move setTimeout INSIDE the YES click
      setTimeout(function () {
        endingStarted = true;
        dogPant.stop();
        console.log("2.5 seconds elapsed, starting ending sequence");
      }, 2500);

      console.log("YES clicked, playing letsGo");
    }

  }
}








function draw() {
  //Background image of street in Montreal.
  image(backgroundImage, 0, 0, 1920, 1080);

  //cute picture of me and my dog Einstein! 
  image(pic1, 250, 105, 826, 664);

  // Only show normal portrait elements if ending hasn't started
  if (!endingStarted) {
    // Cute picture of me and my dog Einstein! 
    image(pic1, 250, 105, 826, 664);

    // Draw the human eye
    drawEye();
    // Draw the dog tongue
    drawTongue();
    // Draw Einstein's head on top to hide the base of the tongue
    image(einsteinHead, 514, 380, 111, 143);
  }



  // ENDING SEQUENCE: Show side image moving left
  if (endingStarted && !showToBeContinued) {
    image(amandaSmallSide, sideImageX, 105, 826, 664);
    sideImageX -= 5;
    if (sideImageX < -826) {
      showToBeContinued = true;
    }

  }


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

  // Show new text box after ohHey finishes
  if (showTextBox && ohHeyFinished) {
    push();
    noStroke();
    fill(255, 200, 200); // Different color for the new box
    rect(308, 270, 250, 150);
    pop();

    push();
    textFont('Press Start 2P');
    fill(100, 50, 200);
    textAlign(RIGHT);
    textSize(22);
    text("Not much! You?", 280, 319, 245);
    pop();
  }

  // Show yes/no boxes after somethingFun finishes
  if (showYesNoBoxes && somethingFunFinished) {
    // NO box (left)
    push();
    noStroke();
    fill(0, 0, 0); // black for NO
    rect(250, 270, 150, 100);
    pop();

    push();
    textFont('Press Start 2P');
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    text("NO", 325, 330);
    pop();

    // YES box (right)
    push();
    noStroke();
    fill(244, 194, 194); //pink for yes
    rect(450, 270, 150, 100);
    pop();

    push();
    textFont('Press Start 2P');
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    text("YES", 525, 330);
    pop();
  }


  // Show "To Be Continued" text box at the end
  if (showToBeContinued) {
    push();
    noStroke();
    fill(255, 150, 200); // Pink text box
    rectMode(CENTER);
    rect(width / 2, height / 2, 400, 150);
    pop();

    push();
    textFont('Press Start 2P');
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(24);
    text("To Be Continued", width / 2, height / 2);
    pop();
  }



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