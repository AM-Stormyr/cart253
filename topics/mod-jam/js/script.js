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

/**
 * Here all the image and sound assets are being preloaded for the game
 */


function preload() {
    /**IMAGES*/
    //Einstein's head
    einstein = loadImage('assets/images/einsteinTwo.png');
    //Image of a dog treat
    treat = loadImage('assets/images/treatOneShadow.png');
    //Background image of floor
    backgroundImage = loadImage('assets/images/bgTwo.png');

    /**AUDIO*/
    //music track 
    goodMorningSong = loadSound('assets/sounds/goodmorning.mp3')
    //dog sounds
    dogPant = loadSound('assets/sounds/dog-panting.mp3')
    eatTreat1 = loadSound('assets/sounds/eatingSound.mp3')
    eatTreat2 = loadSound('assets/sounds/eatingSoundTwo.mp3')
    eatTreat3 = loadSound('assets/sounds/eatingSoundThree.mp3')
    //human sounds
    goodBoy1 = loadSound('assets/sounds/youGoodboy.mp3')
    goodBoy2 = loadSound('assets/sounds/Goodboy.mp3')
    goodBoy3 = loadSound('assets/sounds/GoodboyThree.mp3')
    treat1 = loadSound('assets/sounds/treat.mp3')
    treat2 = loadSound('assets/sounds/treatTwo.mp3')
    noMoreTreats = loadSound('assets/sounds/noMoreTreats.mp3')
    //reusing audio from "Doddy Doggy!" to keep the universe consistent :)
    letsGo = loadSound('assets/sounds/letsGoNew.mp3')

}




// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function drawBackGround() {
    image(backgroundImage, 0, 0, 1920, 1080);
}

function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}