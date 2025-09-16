/**
 * Creating Variables Project
 * Amanda Stormyr
 * 
 * Experimenting with variables!
 */

"use strict";

let cheeseRed = 250;
let cheeseGreen = 250;
let cheeseBlue = 0;

let holeShade = 0;
let holeSize = 130;
let holeSizeX = 150;
let holeSizeY = 150;

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(480, 480);


}


/**
 * Draws of a hole in a piece of cheese
*/
function draw() {

    // The Cheese
    background(cheeseRed, cheeseGreen, cheeseBlue);

    // The hole
    push();
    noStroke();
    fill(holeShade);
    ellipse(holeSizeX, holeSizeY, holeSize);
    pop();

}