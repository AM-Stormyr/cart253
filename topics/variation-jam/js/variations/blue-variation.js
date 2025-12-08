/**
 * This file contains the code to run only the blue variation part of the program.
 */

let pathPixelImg;
let pathPixels = [];

let leftBlobImg;
let rightBlobImg;

let leftPos;
let rightPos;
let leftKeys = ["a", "s", "d", "f", "g"];
let rightKeys = ["l", "k", "j", "h", "g"];

let leftIndex = 0;
let rightIndex = 0;


function bluePreload() {
    pathPixelImg = loadImage("assets/images/oscillate/path-pixel.png");
    leftBlobImg = loadImage("assets/images/oscillate/left-blob2.png");
    rightBlobImg = loadImage("assets/images/oscillate/right-blob1.png");
}

function blueSetup() {

    // dotted path
    pathPixels = [];
    let margin = 15;
    let gap = 15;
    let step = pathPixelImg.width + gap;

    let y = height / 2 - pathPixelImg.height / 2;

    for (let x = margin; x < width - margin; x += step) {
        pathPixels.push({ x: x, y: y });
    }

    leftPos = { x: margin, y: height / 2 - leftBlobImg.height / 2 };
    rightPos = { x: width - margin - rightBlobImg.width, y: height / 2 - rightBlobImg.height / 2 };
}

function blueDraw() {
    background(200, 225, 250);

    for (let p of pathPixels) {
        image(pathPixelImg, p.x, p.y);
    }

    image(leftBlobImg, leftPos.x, leftPos.y);
    image(rightBlobImg, rightPos.x, rightPos.y);
}

function blueKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
        return;
    }

    let k = event.key.toLowerCase();

    if (k === leftKeys[leftIndex]) {
        leftIndex++;
    }

    if (k === rightKeys[rightIndex]) {
        rightIndex++;
    }
}


function blueMousePressed() { }
