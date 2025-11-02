/**
 * Vertical circles
 * Pippin Barr
 * 
 * Draws a series of circles from the top to the bottom of the canvas.
 * Arguably not in the most efficient way.
 */

"use strict";

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw circles from the top to the bottom of the canvas
 */
function draw() {
    background(0);

    // Draw a series of 50-pixel diameter circles
    // Starting at the top of the canvas
    // And ending at the bottom
    let x = 200;
    let y = 0;
    let diameter = map(mouseX, 0, width, 2, 100);

    randomSeed(2)
    while (y <= height) {
        ellipse(x, y, diameter);
        y += diameter;
        x += random(-2, 2)
    }
}