"use strict";

let state = "menu";

let blobs = [];
let fontRegular;
let fontMedium;
let fontSemiBold;


/**
 * preload main stuff
 */
function preload() {

    // load dormant blobs
    for (let i = 1; i <= 9; i++) {
        blobs.push(loadImage(`assets/images/dormant/blob${i}.png`));
    }

    // fonts
    fontRegular = loadFont("assets/fonts/PixelifySans-Regular.ttf");
    fontMedium = loadFont("assets/fonts/PixelifySans-Medium.ttf");
    fontSemiBold = loadFont("assets/fonts/PixelifySans-SemiBold.ttf");

    // variation preload
    if (typeof redPreload === "function") redPreload();
    if (typeof greenPreload === "function") greenPreload();
    if (typeof bluePreload === "function") bluePreload();
}


/**
 * setup
 */
function setup() {

    createCanvas(570, 570);

    // variation setup
    if (typeof redSetup === "function") redSetup();
    if (typeof greenSetup === "function") greenSetup();
    if (typeof blueSetup === "function") blueSetup();
}


/**
 * draw
 */
function draw() {

    switch (state) {
        case "menu":
            menuDraw();
            break;

        case "red-variation":
            redDraw();
            break;

        case "green-variation":
            greenDraw();
            break;

        case "blue-variation":
            blueDraw();
            break;
    }
}


/**
 * mouse
 */
function mousePressed() {

    switch (state) {
        case "menu":
            menuMousePressed();
            break;

        case "red-variation":
            redMousePressed();
            break;

        case "green-variation":
            greenMousePressed();
            break;

        case "blue-variation":
            blueMousePressed();
            break;
    }
}


/**
 * keys
 */
function keyPressed(event) {

    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;

        case "red-variation":
            redKeyPressed(event);
            break;

        case "green-variation":
            greenKeyPressed(event);
            break;

        case "blue-variation":
            blueKeyPressed(event);
            break;
    }
}
