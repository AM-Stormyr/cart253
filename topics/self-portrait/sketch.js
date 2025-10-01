/**
 * Doggy Doggy! 
 * AM Stormyr
/**
 * /*
Doggy Doggy is a fun simulation of bumping into Amanda in Montréal.  
Built in p5.js using functions triggered by mouse clicks and audio timing:

- First mouse click: start ambient + panting + first voice clip.  
- After first clip ends: show 2nd text box.  
- Clicking 2nd text box: play 3rd clip + show Yes/No boxes.  
- "No": play bored clip + loop back to Yes/No.  
- "Yes": play final "Yay let's go!" clip + trigger ending sequence.  

Ending sequence: Amanda + Einstein image changes to side view, slides left off canvas,  
"to be continued" appears in center, cursor disappears, game ends.
*/


//variables for images
let amandaAndEinstein;
let einsteinHead;
let backgroundImage;
let amandaSmallSide;


// variables for sounds
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


//Variable of Pink Cursor
let pinkCursor;

/**
 Here all the image and sound assets are being pre-loaded for the game
 */
function preload() {
  //images
  amandaAndEinstein = loadImage('assets/images/amandaSmall.png');
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

  //Cursor
  pinkCursor = loadImage('assets/images/pink-cursor.png');
}

/**
 * Here are the dimenstions of the canvas  
 */
function setup() {
  //Canvas that fills (my) entire laptop screen
  createCanvas(1430, 768);
  //Changing the anglemode to degrees 
  angleMode(DEGREES);
  //Removing cursor
  noCursor();
}

/**
 * The First sequence happens after first mouse-clik:
 * The ambient-street- and dog-panting sounds start playing. 
 * The first voice audio clip also starts playing  
 */

function mousePressed() {
  if (!soundStarted) {
    //The ambient street sound starts playing, after first mouse click
    ambientSound.loop();
    ambientSound.setVolume(0.05);

    //The dog panting sound panned slightly to the left, after first mouse click
    dogPant.loop();
    dogPant.setVolume(0.1);
    dogPant.pan(-0.4)

    //The first voice clip "Oh hey, I didn't see you there" panned slightly to the right, after first mouse click
    ohHey.setVolume(0.14);
    ohHey.pan(0.4)
    ohHey.play(1)

    /**
 * After the first voice audio clip ends the second text box appears saying "Not much, you?" 
 */
    // first text box appears when oh-hey.mp3 finishes playing
    ohHey.onended(function () {
      ohHeyFinished = true;
      showTextBox = true;
    });
    soundStarted = true;
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

  /**
* After the third voice audio clip ends the two text boxes appear; Yes|No and the player has to make a choice"
*/
  // first text box appears when oh-hey.mp3 finishes playing
  // Third click - handle yes/no choices
  else if (somethingFunFinished && showYesNoBoxes) {
    // Check if clicking "NO" box (left box)
    if (mouseX > 250 && mouseX < 400 && mouseY > 270 && mouseY < 370) {
      imBored.play();
      imBored.setVolume(0.2);
      showYesNoBoxes = false;

      // When im-bored finishes, show yes/no boxes again
      imBored.onended(function () {
        showYesNoBoxes = true;
      });

    }
    // Check if clicking "YES" box (right box)
    else if (mouseX > 450 && mouseX < 600 && mouseY > 270 && mouseY < 370) {
      letsGo.play();
      letsGo.setVolume(0.27);
      showYesNoBoxes = false;

      // Move setTimeout INSIDE the YES click
      setTimeout(function () {
        endingStarted = true;
        dogPant.stop();
      }, 2500);
    }

  }
}
/**
* The Background image is constant whereas the other images dissapears when the ending sequence start
*/
function draw() {
  //Background image of street in Montreal.
  image(backgroundImage, 0, 0, 1920, 1080);

  // Only show normal portrait elements if ending hasn't started
  if (!endingStarted) {
    // Cute picture of me and my dog Einstein! 
    image(amandaAndEinstein, 250, 105, 826, 664);
    // Draw the human eye
    drawEye();
    // Draw the dog tongue
    drawTongue();
    // Draw Einstein's head on top to hide the base of the tongue
    image(einsteinHead, 514, 380, 111, 143);
  }

  // ENDING SEQUENCE: The last image of me and einstein sliding from the center
  // to the left out until it's out the frame
  if (endingStarted && !showToBeContinued) {
    image(amandaSmallSide, sideImageX, 105, 826, 664);
    sideImageX -= 5;
    if (sideImageX < -826) {
      showToBeContinued = true;
    }

  }

  //First text box saying "Click to say hi"
  if (!soundStarted) {
    push;
    noStroke();
    fill(20, 250, 15);
    rect(308, 270, 250, 100)
    pop;

    push;
    textFont('Press Start 2P');
    fill(250, 250, 250);
    textAlign(RIGHT);
    textSize(22);
    text("Click to say hi", 272, 295, 245);
    pop;

  }

  // Second textbox saying "Not much! You?" 
  //which shows after oh-hey.mp3 ends
  if (showTextBox && ohHeyFinished) {
    push();
    noStroke();
    fill(255, 200, 200);
    rect(308, 270, 250, 100);
    pop();

    push();
    textFont('Press Start 2P');
    fill(100, 50, 200);
    textAlign(RIGHT);
    textSize(22);
    text("Not much! You?", 285, 297, 245);
    pop();
  }

  // The yes/no text boxes that pops up after something-fun.mp3 finishes playing
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

  // Show "To Be Continued" 
  // The text in the very end
  if (showToBeContinued) {
    push();
    textFont('Press Start 2P');
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(26);
    text("To Be Continued", width / 2, 425);
    pop();
  }

  // Pink cursor hide during ending sequence and final screen
  if (!endingStarted && !showToBeContinued) {
    image(pinkCursor, mouseX - 10, mouseY - 10, 60, 60);
  }
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