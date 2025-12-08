/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Note how it has its own draw, blueDraw(), and its own keyPressed, blueKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

function bluePreload() {
    // will load stuff later
}

/**
 * This will be called just before the blue variation starts
 */
function blueSetup() {
    // nothing yet
}

/**
 * This will be called every frame when the blue variation is active
 */
function blueDraw() {
    background(200, 225, 250); // same bg as other variations
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
function blueMousePressed() {
    // nothing here yet
}
