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

let einsteinImage;
let treat;
let backgroundImage;

let goodMorningSong;

let dogPant;
let eatTreat1;
let eatTreat2;
let eatTreat3;

let goodBoy1;
let goodBoy2;
let goodBoy3;
let treat1;
let treat2;
let noMoreTreats;
let letsGo;

function preload() {
    /**IMAGES*/
    //Einstein's head
    einsteinImage = loadImage('assets/images/einsteinTwo.png');
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




// Our einstein
const einstein = {
    // The einstein's body has a position and size
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

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 60,
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
    image(backgroundImage, 0, 0, 640, 480);
}

function draw() {
    // background("#87ceeb");
    drawBackGround();
    drawFly();
    moveFly();
    moveEinstein();
    moveTongue();
    drawEinstein();
    checkTongueFlyOverlap();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.y += fly.speed;
    // Handle the fly going off the canvas
    if (fly.y > height) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    // push();
    // noStroke();
    // fill("#000000");
    // ellipse(fly.x, fly.y, fly.size);
    // pop();

    // Draw the treat 
    push();
    imageMode(CENTER);
    image(treat, fly.x, fly.y, fly.size, fly.size);
    pop();
}


/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = random(0, 640)
    fly.y = -2;
}

/**
 * Moves the einstein to the mouse position on x
 */
function moveEinstein() {
    einstein.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the einstein's x
    einstein.tongue.x = einstein.body.x;
    // If the tongue is idle, it doesn't do anything
    if (einstein.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (einstein.tongue.state === "outbound") {
        einstein.tongue.y += -einstein.tongue.speed;
        // The tongue bounces back if it hits the top
        if (einstein.tongue.y <= 0) {
            einstein.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (einstein.tongue.state === "inbound") {
        einstein.tongue.y += einstein.tongue.speed;
        // The tongue stops if it hits the bottom
        if (einstein.tongue.y >= height) {
            einstein.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the einstein (body)
 */
// function draweinstein() {
//     // Draw the tongue tip
//     push();
//     fill("#ff0000");
//     noStroke();
//     ellipse(einstein.tongue.x, einstein.tongue.y, einstein.tongue.size);
//     pop();

//     // Draw the rest of the tongue
//     push();
//     stroke("#ff0000");
//     strokeWeight(einstein.tongue.size);
//     line(einstein.tongue.x, einstein.tongue.y, einstein.body.x, einstein.body.y);
//     pop();

//     // Draw the einstein's body
//     push();
//     fill("#00ff00");
//     noStroke();
//     ellipse(einstein.body.x, einstein.body.y, einstein.body.size);
//     pop();
// }


function drawEinstein() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(einstein.tongue.x, einstein.tongue.y, einstein.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(einstein.tongue.size);
    line(einstein.tongue.x, einstein.tongue.y, einstein.body.x, einstein.body.y);
    pop();

    // Draw the einstein's body
    push();
    imageMode(CENTER);
    image(einsteinImage, einstein.body.x, einstein.body.y, einstein.body.size, einstein.body.size);
    pop();
}


/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(einstein.tongue.x, einstein.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < einstein.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        einstein.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (einstein.tongue.state === "idle") {
        einstein.tongue.state = "outbound";
    }
}