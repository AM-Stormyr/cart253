/**
 * BLUE VARIATION — Oscillate
 */

let leftBlobImg;
let rightBlobImg;
let winnerBlobImg;

let leftPos;
let rightPos;

let targetLeftPos;
let targetRightPos;

let wobbleTime = 0;

let rounds = 0;
let maxRounds = 5;

let stepProgress = 0;
let stepGoal = 0;

let currentLeftKey = "";
let currentRightKey = "";

let merged = false;

let allKeys = "abcdefghijklmnopqrstuvwxyz".split("");


function bluePreload() {
    leftBlobImg = loadImage("assets/images/oscillate/left-blob2.png");
    rightBlobImg = loadImage("assets/images/oscillate/right-blob1.png");
    winnerBlobImg = loadImage("assets/images/oscillate/winner-blob2.png");
}


function blueSetup() {

    rounds = 0;
    merged = false;

    stepProgress = 0;
    stepGoal = int(random(35, 60));

    currentLeftKey = random(allKeys).toUpperCase();
    currentRightKey = random(allKeys).toUpperCase();

    // STARTING POSITIONS (updated)
    leftPos = { x: 40, y: height - 40 - leftBlobImg.height }; // bottom-left
    rightPos = { x: width - 40 - rightBlobImg.width, y: 40 }; // top-right

    targetLeftPos = { x: leftPos.x, y: leftPos.y };
    targetRightPos = { x: rightPos.x, y: rightPos.y };
}


function blueDraw() {
    background(200, 225, 250);

    wobbleTime += 0.05;
    let wobbleX = sin(wobbleTime) * 6; // bigger wobble
    let wobbleY = cos(wobbleTime) * 6;

    // smoother slide
    leftPos.x = lerp(leftPos.x, targetLeftPos.x, 0.05);
    leftPos.y = lerp(leftPos.y, targetLeftPos.y, 0.05);

    rightPos.x = lerp(rightPos.x, targetRightPos.x, 0.05);
    rightPos.y = lerp(rightPos.y, targetRightPos.y, 0.05);

    if (!merged) {
        image(leftBlobImg, leftPos.x + wobbleX, leftPos.y + wobbleY);
        image(rightBlobImg, rightPos.x - wobbleX, rightPos.y - wobbleY);
    } else {
        image(
            winnerBlobImg,
            width / 2 - winnerBlobImg.width / 2 + wobbleX,
            height / 2 - winnerBlobImg.height / 2 + wobbleY
        );
        return;
    }

    // TEXT (bigger + swapped)
    textFont(fontRegular);
    fill(0, 120);
    textSize(26);

    // left player → TOP LEFT
    textAlign(LEFT, TOP);
    text("left: " + currentLeftKey, 40, 40);

    // right player → BOTTOM RIGHT
    textAlign(RIGHT, BOTTOM);
    text("right: " + currentRightKey, width - 40, height - 40);
}


function blueKeyPressed(event) {

    if (event.keyCode === 27) {
        state = "menu";
        return;
    }

    if (merged) return;

    let k = event.key.toUpperCase();

    // FINAL ROUND
    if (rounds === maxRounds - 1) {
        if (k === "G") stepProgress++;
    } else {
        if (k === currentLeftKey || k === currentRightKey) stepProgress++;
    }

    if (stepProgress >= stepGoal) {

        rounds++;
        stepProgress = 0;
        stepGoal = int(random(35, 60));

        // MERGE
        if (rounds === maxRounds) {
            merged = true;
            leftPos = { x: width / 2, y: height / 2 };
            rightPos = { x: width / 2, y: height / 2 };
            return;
        }

        // movement fraction
        let t = rounds / maxRounds;

        // left blob goes toward center
        targetLeftPos = {
            x: lerp(40, width / 2 - leftBlobImg.width / 2, t),
            y: lerp(height - 40 - leftBlobImg.height, height / 2 - leftBlobImg.height / 2, t)
        };

        // right blob goes toward center
        targetRightPos = {
            x: lerp(width - 40 - rightBlobImg.width, width / 2 - rightBlobImg.width / 2, t),
            y: lerp(40, height / 2 - rightBlobImg.height / 2, t)
        };

        // NEXT KEY
        if (rounds === maxRounds - 1) {
            currentLeftKey = "G";
            currentRightKey = "G";
        } else {
            currentLeftKey = random(allKeys).toUpperCase();
            currentRightKey = random(allKeys).toUpperCase();
        }
    }
}


function blueMousePressed() { }
