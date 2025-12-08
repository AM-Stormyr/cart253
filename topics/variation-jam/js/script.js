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

    if (typeof redPreload === "function") redPreload();
    if (typeof greenPreload === "function") greenPreload();
    if (typeof bluePreload === "function") bluePreload();
}

function setup() {
    createCanvas(570, 570);

    if (typeof redSetup === "function") redSetup();
    if (typeof greenSetup === "function") greenSetup();
    if (typeof blueSetup === "function") blueSetup();
}

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