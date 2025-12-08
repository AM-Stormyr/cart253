/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Note how it has its own draw, blueDraw(), and its own keyPressed, blueKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

let pathPixelImg; // new
let pathPixels = []; // new

function bluePreload() {
    pathPixelImg = loadImage("assets/images/oscillate/path-pixel.png"); // new
}

/**
 * This will be called just before the blue variation starts
 */
function blueSetup() {
    // make a simple straight line path
    pathPixels = [];
    let gap = 15;
    for (let x = 0; x < width; x += gap) {
        pathPixels.push({ x: x, y: height / 2 });
    }
}

/**
 * This will be called every frame when the blue variation is active
 */
function blueDraw() {
    background(200, 225, 250);

    // draw the little pixels across the middle
    for (let p of pathPixels) {
        image(pathPixelImg, p.x, p.y);
    }
}

/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function blueKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the blue variation is active
 */
function blueMousePressed() { }
