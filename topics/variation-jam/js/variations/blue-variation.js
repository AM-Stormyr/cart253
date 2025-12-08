/**
 * BLUE VARIATION — Oscillate
 */

let pathPixelImg;
let pathPixels = [];

let leftBlobImg;
let rightBlobImg;

let leftPos;
let rightPos;

let leftKeys = ["a", "s", "d", "f", "g"];
let rightKeys = ["l", "k", "j", "h", "g"];

let currentLeftKey = "";
let currentRightKey = "";

let leftPixelIndex = 0;
let rightPixelIndex = 0;

let stepGoal = 0;
let stepProgress = 0;

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

    currentLeftKey = leftKeys[int(random(leftKeys.length))];
    currentRightKey = rightKeys[int(random(rightKeys.length))];

    stepGoal = int(random(35, 60));
    stepProgress = 0;
    finalStep = false;

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

    //wobble (blobs movement)
    let wobble = sin(frameCount * 0.1) * 2;

    for (let p of pathPixels) {
        image(pathPixelImg, p.x, p.y);
    }

    leftPos.x = pathPixels[leftPixelIndex].x - leftBlobImg.width / 2 + pathPixelImg.width / 2;
    leftPos.y = pathPixels[leftPixelIndex].y - leftBlobImg.height / 2 + pathPixelImg.height / 2;

    rightPos.x = pathPixels[rightPixelIndex].x - rightBlobImg.width / 2 + pathPixelImg.width / 2;
    rightPos.y = pathPixels[rightPixelIndex].y - rightBlobImg.height / 2 + pathPixelImg.height / 2;

    image(leftBlobImg, leftPos.x, leftPos.y + wobble);
    image(rightBlobImg, rightPos.x, rightPos.y - wobble);

    textFont(fontRegular);
    fill(0, 120);
    textSize(20);

    textAlign(LEFT, TOP);
    text("left: [" + currentLeftKey + "]", 20, 20);

    textAlign(RIGHT, TOP);
    text("right: [" + currentRightKey + "]", width - 20, 20);
}


function blueKeyPressed(event) {

    if (event.keyCode === 27) {
        state = "menu";
        return;
    }

    let k = event.key.toLowerCase();

    // FINAL SHARED STEP
    if (finalStep) {
        if (k === "g") {
            stepProgress++;
        }

        if (stepProgress >= stepGoal) {
            // NEXT: merge + winner blob in next increment
            finalStep = "done";
        }

        return;
    }

    // NORMAL STEPS
    let moved = false;

    if (k === currentLeftKey) {
        stepProgress++;
        moved = true;
    }

    if (k === currentRightKey) {
        stepProgress++;
        moved = true;
    }

    if (!moved) return;

    if (stepProgress >= stepGoal) {

        leftPixelIndex++;
        rightPixelIndex--;

        // check if they meet
        if (leftPixelIndex >= rightPixelIndex) {
            leftPixelIndex = rightPixelIndex;

            finalStep = true; // activate final shared press mode
            currentLeftKey = "g";
            currentRightKey = "g";

            stepProgress = 0;
            stepGoal = 15;
            return;
        }

        // new normal step
        stepProgress = 0;
        stepGoal = int(random(35, 60));

        currentLeftKey = leftKeys[int(random(leftKeys.length))];
        currentRightKey = rightKeys[int(random(rightKeys.length))];
    }
}


function blueMousePressed() { }
