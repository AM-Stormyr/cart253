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

let leftPixelIndex = 0;
let rightPixelIndex = 0;

// shared progress system
let stepGoal = 0;
let stepProgress = 0;

let currentLeftKey = "";
let currentRightKey = "";

let finalStep = false;

function bluePreload() {
    pathPixelImg = loadImage("assets/images/oscillate/path-pixel.png");
    leftBlobImg = loadImage("assets/images/oscillate/left-blob2.png");
    rightBlobImg = loadImage("assets/images/oscillate/right-blob1.png");
}

function blueSetup() {

    pathPixels = [];
    let margin = 15;
    let gap = 15;
    let step = pathPixelImg.width + gap;

    let y = height / 2 - pathPixelImg.height / 2;

    for (let x = margin; x < width - margin; x += step) {
        pathPixels.push({ x: x, y: y });
    }

    leftPixelIndex = 0;
    rightPixelIndex = pathPixels.length - 1;

    leftPos = {
        x: pathPixels[leftPixelIndex].x - leftBlobImg.width / 2 + pathPixelImg.width / 2,
        y: pathPixels[leftPixelIndex].y - leftBlobImg.height / 2 + pathPixelImg.height / 2
    };

    rightPos = {
        x: pathPixels[rightPixelIndex].x - rightBlobImg.width / 2 + pathPixelImg.width / 2,
        y: pathPixels[rightPixelIndex].y - rightBlobImg.height / 2 + pathPixelImg.height / 2
    };
}

function blueDraw() {
    background(200, 225, 250);

    for (let p of pathPixels) {
        image(pathPixelImg, p.x, p.y);
    }

    leftPos.x = pathPixels[leftPixelIndex].x - leftBlobImg.width / 2 + pathPixelImg.width / 2;
    leftPos.y = pathPixels[leftPixelIndex].y - leftBlobImg.height / 2 + pathPixelImg.height / 2;

    rightPos.x = pathPixels[rightPixelIndex].x - rightBlobImg.width / 2 + pathPixelImg.width / 2;
    rightPos.y = pathPixels[rightPixelIndex].y - rightBlobImg.height / 2 + pathPixelImg.height / 2;

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
        leftPixelIndex++;
        if (leftPixelIndex >= pathPixels.length) {
            leftPixelIndex = pathPixels.length - 1;
        }
    }

    if (k === rightKeys[rightIndex]) {
        rightIndex++;
        rightPixelIndex--;
        if (rightPixelIndex < 0) {
            rightPixelIndex = 0;
        }
    }
}

function blueMousePressed() { }
