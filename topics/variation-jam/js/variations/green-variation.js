/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the green variation starts
 */
let slimePixel;
let px = 0;
let py = 0;
let step = 15;

function greenPreload() {
    slimePixel = loadImage("assets/images/forage/slime-mold-pixel.png");
}

function greenSetup() {
    // start in the middle, kinda arbitrary
    px = width / 2;
    py = height / 2;
}

/**
 * This will be called every frame when the green variation is active
 */
function greenDraw() {
    background(200, 225, 250); //bg colour

    // draw the pixel blob
    image(slimePixel, px - slimePixel.width / 2, py - slimePixel.height / 2);
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }

    // arrow keys move in 15px hops
    if (event.keyCode === UP_ARROW) {
        py -= step;
    }
    else if (event.keyCode === DOWN_ARROW) {
        py += step;
    }
    else if (event.keyCode === LEFT_ARROW) {
        px -= step;
    }
    else if (event.keyCode === RIGHT_ARROW) {
        px += step;
    }
}
/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function greenMousePressed() {

}

