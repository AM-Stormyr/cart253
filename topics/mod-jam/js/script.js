/**
 * Fun Part I: Einstein's Treat Frenzy
 * Amanda Stormyr
 * 
 * Help Einstein catch as many treats before time runs out.!
 * 
 * Instructions:
 * - Move the Einstein with your mouse
 * - Click to launch the tongue
 * - Catch as many treats before the music ends 
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";


///////////////////////////////////////////////////
//                     IMAGES                   //
/////////////////////////////////////////////////


let einsteinImage;
let treat;
let backgroundImage;
let titleTreat; // white bone with title (button you click to start game)


///////////////////////////////////////////////////
//                    AUDIO                     //
/////////////////////////////////////////////////


let goodMorningSong; // background song
let eatTreat1; // dog eating sound
let eatTreat2; // dog eating sound
let goodBoy1; // human voice saying "Goodboy"
let goodBoy2; // human voice saying "Goodboy"
let goodBoy3; // human voice saying "Goodboy"
let treat1; // human voice saying "Do you want a treat?"
let treat2; // human voice saying "Do you want a treat?"
let noMoreTreats; // human voice saying "No! no more treats."


///////////////////////////////////////////////////
//              GAME STATE VARIABLES            //
/////////////////////////////////////////////////


let gameOver = false;
let gameStarted = false;
let noMoreTreatsPlayed = false;
let difficulty = 1; //difficulty Speed
let timeRemaining = 0;


///////////////////////////////////////////////////
//            COUNTERS AND TIMERS               //
/////////////////////////////////////////////////


let score = 0; //score counter
let gameTime; // amount of time in game only
let timeLimit = 18; // how much time do you have to succeed (eating doggy-treats)
let startTime; // track when game begins
let lastVoiceTime = 0;
let voiceInterval = 5000;


///////////////////////////////////////////////////
//              GAME OBJECTS                    //
/////////////////////////////////////////////////


//========EINSTEIN========//
const einstein = {
    body: {
        x: 320,
        y: 451,
        size: 150
    },
    // The einstein's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

//========TREAT========//
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 60,
    speed: 3
};

//========Start button (white dog bone image)========//
const startButton = {
    x: 320,
    y: 240,
    width: 200,
    height: 60,
    text: "fun part I" // text displayed on the 'Start button'
};

//========New game button========//
const playAgainButton = {
    x: 320,
    y: 150,  // above "game over"
    width: 200,
    height: 30,
    text: "new game" // text displayed on the 'new game button'
};


///////////////////////////////////////////////////
//                    PRELOADS                  //
/////////////////////////////////////////////////


function preload() {
    //========IMAGES========//
    einsteinImage = loadImage('assets/images/einsteinTwo.png'); //Einstein's head
    treat = loadImage('assets/images/treatOneShadow.png'); //Image of a dog treat
    titleTreat = loadImage('assets/images/titleTreat.png');
    backgroundImage = loadImage('assets/images/bgTwo.png');  //Background image of floor

    //========BACKGROUND MUSIC TRACK========//
    goodMorningSong = loadSound('assets/sounds/goodmorning.mp3');
    goodMorningSong.setVolume(0.09); // audio volume

    //========DOG EATING SOUNDS========//
    eatTreat1 = loadSound('assets/sounds/eatingSound.mp3');
    eatTreat1.setVolume(0.1); // audio volume
    eatTreat2 = loadSound('assets/sounds/eatingSoundTwo.mp3');
    eatTreat2.setVolume(0.08); // audio volume

    //========HUMAN TALKING SOUNDS========//
    goodBoy1 = loadSound('assets/sounds/youGoodboy.mp3');
    goodBoy1.setVolume(0.29); // audio volume
    goodBoy2 = loadSound('assets/sounds/goodboy.mp3');
    goodBoy2.setVolume(0.21) // audio volume
    goodBoy3 = loadSound('assets/sounds/GoodboyThree.mp3');
    goodBoy3.setVolume(0.21); // audio volume
    treat1 = loadSound('assets/sounds/treat.mp3');
    treat1.setVolume(0.21); // audio volume
    treat2 = loadSound('assets/sounds/treatTwo.mp3');
    treat2.setVolume(0.21); // audio volume
    noMoreTreats = loadSound('assets/sounds/noMoreTreats.mp3');
    noMoreTreats.setVolume(0.3); // audio volume
}


///////////////////////////////////////////////////
//                     SETUP                    //
/////////////////////////////////////////////////


function setup() {
    createCanvas(640, 480); //canvas dimentions
    frameRate(30); //setting frame rate to 30 instead of 60
    resetFly(); // Give the fly its first random position
    textAlign(CENTER);
    startTime = millis();
}
//========BACKGROUND IMAGE========//
function drawBackGround() {
    image(backgroundImage, 0, 0, 640, 480);
}


///////////////////////////////////////////////////
//                MAIN GAME LOOP                //
/////////////////////////////////////////////////


function draw() {
    drawBackGround();

    if (!gameStarted) { //if game has not started display Einstein and the Title
        drawEinstein();
        drawStartScreen();
        return;  // Don't run the rest of the game yet (before mouse clicked)
    }

    if (!gameOver) { // if game has started (before gameover) display and move treat and display and move treat
        drawFly(); //display treat
        moveFly(); // move treat
        moveEinstein(); // move einstein (who is already displayed)
        moveTongue(); // move tounge
        difficulty += 0.009; //increasing the speed of the treats falling
        if (millis() - lastVoiceTime > voiceInterval) {
            const voiceSounds = [goodBoy1, goodBoy2, goodBoy3, treat1, treat2];
            const randomVoice = random(voiceSounds);
            randomVoice.play();
            lastVoiceTime = millis();
        }
    }
    else {
        drawGameOver(); // if the game is over display game over screen
    }

    //========GAME OBJECTS========//
    drawEinstein();

    //========CHECK COLLISION========//
    checkTongueFlyOverlap();

    //========UI ELEMENTS========//
    drawScoreBar();
    drawDisplayCounter()

    //========CHECK TIMER (IF GAME SHOULD END?)========//
    gameTime = int((millis() - startTime) / 1000);
    timeRemaining = max(0, timeLimit - gameTime);


    if (timeRemaining <= 0) {   // Check if time is up (when reaching 0)
        timeRemaining = 0;


        if (!gameOver) {  // First time game ends
            goodMorningSong.stop(); //music stops
            gameOver = true;
        }
        if (gameOver && !noMoreTreatsPlayed) { // if game is over and noMoreTreats hasn't played
            setTimeout(() => {
                noMoreTreats.play(); // then noMoreTreats should play
            }, 700);
            noMoreTreatsPlayed = true;
        }
    }
}


///////////////////////////////////////////////////
//                DRAW FUNCTIONS                //
/////////////////////////////////////////////////


//========TREAT========//
function drawFly() {
    // Draw the treat 
    push();
    imageMode(CENTER);
    image(treat, fly.x, fly.y, fly.size, fly.size);
    pop();
}

//========DRAW EINSTEIN========//
function drawEinstein() {
    // Draw the tongue tip
    push();
    fill(250, 160, 200); //same colour tongue as "Doggy doggy!"
    noStroke();
    ellipse(einstein.tongue.x, einstein.tongue.y, einstein.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke(250, 160, 200);
    strokeWeight(einstein.tongue.size);
    line(einstein.tongue.x, einstein.tongue.y, einstein.body.x, einstein.body.y);
    pop();

    // Draw the einstein's body
    push();
    imageMode(CENTER);
    image(einsteinImage, einstein.body.x, einstein.body.y, einstein.body.size, einstein.body.size);
    pop();
}

//========SCORE BAR========//
function drawScoreBar() {   //score bar (just text no background)
    push();
    fill(250);
    textSize(19);
    text('score', 500, 60);
    text(score, 550, 60);
    pop();
}

//========TIME DISPLAY========//
function drawDisplayCounter() { // Showing numbers counting down from 18-0 in left corner of canvas
    push();
    fill(250);
    textSize(19);
    text(timeRemaining, 110, 60); // Display countdown
    pop();
}

//========START SCREEN DISPLAY========//
function drawStartScreen() {
    push();
    imageMode(CENTER);
    image(titleTreat, startButton.x, startButton.y, 152, 81);
    pop();

    // Draw button text
    fill(250, 160, 200);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text(startButton.text, startButton.x, startButton.y);
}

//========GAME OVER DISPLAY========//
function drawGameOver() {  //TEXT: GAME OVER + SCORE
    push();
    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2); //white text "GAME OVER"
    text("Score: " + score, width / 2, height / 2 + 80); // displays "Score" + the actual score of the player
    pop();

    //========PLAY AGAIN BUTTON========//
    push();
    noFill();
    fill(250, 160, 200);
    stroke(255);
    strokeWeight(3);
    rectMode(CENTER);
    rect(playAgainButton.x, playAgainButton.y, playAgainButton.width, playAgainButton.height, 10);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text(playAgainButton.text, playAgainButton.x, playAgainButton.y);
    pop();
}


///////////////////////////////////////////////////
//                MOVE FUNCTIONS                //
/////////////////////////////////////////////////


//========MOVE TREAT========//
/**
 * Moves the treat according to its speed
 * 
 */
function moveFly() {
    fly.y += fly.speed * difficulty; // Move the fly on y-axsis

    if (fly.y > height) {  // Handle the fly going off the canvas
        resetFly(); //Resets the treat if it gets all the way to the right
    }
}


//========POSITION OF NEW TREATS========//

function resetFly() {
    fly.x = random(100, 540);//Resets the treat randomly on X-axis in the space between 100-540px 
    fly.y = random(-50, 5); //Resets the treat randomly on Y-axis in the space between -50-5px  (so either outside the canvas or right in the top)
}

//========MOVE EINSTEIN========//

function moveEinstein() { //Moves the einstein to the mouse position on x
    einstein.body.x = mouseX;
}

//========MOVE TONGUE========//

function moveTongue() { //Handles moving the tongue based on its state
    // Tongue matches the einstein's x
    einstein.tongue.x = einstein.body.x;
    // If the tongue is idle, it doesn't do anything
    if (einstein.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (einstein.tongue.state === "outbound") {
        //difficulty is added here for the pace of the tongue movement to keep up with the treats.
        einstein.tongue.y += -einstein.tongue.speed * difficulty;
        // The tongue bounces back if it hits the top
        if (einstein.tongue.y <= 0) {
            einstein.tongue.state = "inbound";
        }
    }

    else if (einstein.tongue.state === "inbound") {
        einstein.tongue.y += einstein.tongue.speed * difficulty;
        if (einstein.tongue.y >= height) {
            einstein.tongue.state = "idle";
        }
    }
}




///////////////////////////////////////////////////
//                  GAME LOGIC                  //
/////////////////////////////////////////////////

//========OVERLAP========//

//Handles the tongue overlapping the treat
function checkTongueFlyOverlap() {
    const d = dist(einstein.tongue.x, einstein.tongue.y, fly.x, fly.y);  // Get distance from tongue to fly
    const eaten = (d < einstein.tongue.size / 2 + fly.size / 2);    // Check if it's an overlap
    if (eaten) {
        // if theres an overlap: score increases with 1
        score = score + 1; //Adds points

        // if theres an overlap: audio plays
        const eatSounds = [eatTreat1, eatTreat2]; //dog chewing sound when treat is caught
        const randomEatSound = random(eatSounds); // played randomly between the two audio clips
        randomEatSound.play();

        // if theres an overlap: reset the treat
        resetFly();

        // if theres an overlap: Bring back the tongue
        einstein.tongue.state = "inbound";
    }
}

//========RESET AFTER GAME OVER (AND NEW GAME IS PRESSED)========//

function resetGame() {
    // Reset all game variables
    score = 0;
    difficulty = 1;
    gameOver = false;
    gameStarted = true;
    noMoreTreatsPlayed = false;
    startTime = millis();
    lastVoiceTime = 0;

    // Reset Einstein
    einstein.body.x = 320;
    einstein.tongue.state = "idle";
    einstein.tongue.y = 480;

    // Reset fly
    resetFly();

    // Start music again
    goodMorningSong.play();
}


///////////////////////////////////////////////////
//                INPUT FUNCTIONS               //
/////////////////////////////////////////////////


/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    // Check if clicking the start button (titleTreat image)
    if (!gameStarted) {
        const treatWidth = 152;
        const treatHeight = 81;

        const clickedButton = (mouseX > startButton.x - treatWidth / 2 &&
            mouseX < startButton.x + treatWidth / 2 &&
            mouseY > startButton.y - treatHeight / 2 &&
            mouseY < startButton.y + treatHeight / 2);

        if (clickedButton) {
            goodMorningSong.play();
            gameStarted = true;
            startTime = millis();
        }
    }
    // Check if clicking play again button
    else if (gameOver) {
        const clickedPlayAgain = (mouseX > playAgainButton.x - playAgainButton.width / 2 &&
            mouseX < playAgainButton.x + playAgainButton.width / 2 &&
            mouseY > playAgainButton.y - playAgainButton.height / 2 &&
            mouseY < playAgainButton.y + playAgainButton.height / 2);

        if (clickedPlayAgain) {
            resetGame();
        }
    }
    // Normal tongue launch during game
    else if (einstein.tongue.state === "idle" && gameStarted && !gameOver) {
        einstein.tongue.state = "outbound";
    }
}
