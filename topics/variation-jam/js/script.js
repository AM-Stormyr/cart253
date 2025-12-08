/**
 * Variation Menu
 * Pippin Barr
 * 
 * A relatively simple example of a set of variations within a single
 * project. (When we learn Object-Oriented Programming this will be a
 * LOT easier.)
 */

"use strict";

let state = "menu";

let blobs = [];
let fontRegular;
let fontMedium;
let fontSemiBold;


function preload() {
    for (let i = 1; i <= 9; i++) {
        blobs.push(loadImage(`assets/images/dormant/blob${i}.png`));
    }
    fontRegular = loadFont('assets/fonts/PixelifySans-Regular.ttf');
    fontMedium = loadFont('assets/fonts/PixelifySans-Medium.ttf');
    fontSemiBold = loadFont('assets/fonts/PixelifySans-SemiBold.ttf');

    // forgot to preload the green stuff
    if (typeof greenPreload === "function") {
        greenPreload();
    }
}


/**
 * Create the canvas
*/
function setup() {
    createCanvas(570, 570);
}


/**
 * Display the menu or the current variation
*/
function draw() {
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "red-variation":
            redDraw();
            break
        case "green-variation":
            greenDraw();
            break;
        case "blue-variation":
            blueDraw();
            break;
    }
}

/**
 * Listen for mouse pressed and call the function for it in the
 * current state
 */
function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "red-variation":
            redMousePressed();
            break
        case "green-variation":
            greenMousePressed();
            break;
        case "blue-variation":
            blueMousePressed();
            break;
    }
}

/**
 * Listen for keypressed and call the function for it in the
 * current state
 */
function keyPressed(event) {
    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "red-variation":
            redKeyPressed(event);
            break
        case "green-variation":
            greenKeyPressed(event);
            break;
        case "blue-variation":
            blueKeyPressed(event);
            break;
    }
}
