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

let gameState = "instructions";

// renamed to avoid global conflicts
let blueWinLines = [
    "Congratulations!",
    "you are fully merged.",
    "life is most beautiful when shared."
];
let blueWinIndex = 0;
let blueWinTimer = 0;
let blueWinDelay = 120;


function bluePreload() {
    leftBlobImg = loadImage("assets/images/oscillate/left-blob2.png");
    rightBlobImg = loadImage("assets/images/oscillate/right-blob1.png");
    winnerBlobImg = loadImage("assets/images/oscillate/winner-blob2.png");
}


function blueSetup() {

    gameState = "instructions";
    merged = false;

    rounds = 0;
    stepProgress = 0;
    stepGoal = int(random(35, 60));

    currentLeftKey = random(allKeys).toUpperCase();
    currentRightKey = random(allKeys).toUpperCase();

    leftPos = { x: 40, y: height - 40 - leftBlobImg.height };
    rightPos = { x: width - 40 - rightBlobImg.width, y: 40 };

    targetLeftPos = { x: leftPos.x, y: leftPos.y };
    targetRightPos = { x: rightPos.x, y: rightPos.y };

    blueWinIndex = 0;
    blueWinTimer = 0;
}


function blueDraw() {
    background(200, 225, 250);

    if (gameState === "instructions") {
        textFont(fontRegular);
        fill(0, 150);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Two players: left + right\nPress the shown keys to merge\n\nPress ENTER to start",
            width / 2, height / 2);
        return;
    }

    wobbleTime += 0.05;
    let wobbleX = sin(wobbleTime) * 6;
    let wobbleY = cos(wobbleTime) * 6;

    leftPos.x = lerp(leftPos.x, targetLeftPos.x, 0.05);
    leftPos.y = lerp(leftPos.y, targetLeftPos.y, 0.05);

    rightPos.x = lerp(rightPos.x, targetRightPos.x, 0.05);
    rightPos.y = lerp(rightPos.y, targetRightPos.y, 0.05);


    if (gameState === "win") {

        let bx = width / 2 - winnerBlobImg.width / 2 + wobbleX;
        let by = height / 2 - winnerBlobImg.height / 2 + wobbleY;
        image(winnerBlobImg, bx, by);

        textFont(fontRegular);
        fill(0, 150);
        textSize(20);
        textAlign(CENTER, CENTER);

        if (blueWinTimer > blueWinDelay && blueWinIndex < blueWinLines.length - 1) {
            blueWinIndex++;
            blueWinTimer = 0;
        } else {
            blueWinTimer++;
        }

        text(blueWinLines[blueWinIndex], width / 2, height - 120);
        return;
    }


    image(leftBlobImg, leftPos.x + wobbleX, leftPos.y + wobbleY);
    image(rightBlobImg, rightPos.x - wobbleX, rightPos.y - wobbleY);

    textFont(fontRegular);
    fill(0, 120);
    textSize(22);

    textAlign(LEFT, TOP);
    text("left: " + currentLeftKey, 40, 40);

    textAlign(RIGHT, BOTTOM);
    text("right: " + currentRightKey, width - 40, height - 40);
}


function blueKeyPressed(event) {

    if (event.keyCode === 27) {
        state = "menu";
        return;
    }

    if (gameState === "instructions") {
        if (event.keyCode === 13) gameState = "play";
        return;
    }

    if (merged) return;

    let k = event.key.toUpperCase();

    if (rounds === maxRounds - 1) {
        if (k === "G") stepProgress++;
    } else {
        if (k === currentLeftKey || k === currentRightKey) stepProgress++;
    }

    if (stepProgress >= stepGoal) {

        rounds++;
        stepProgress = 0;
        stepGoal = int(random(35, 60));

        if (rounds === maxRounds) {
            merged = true;
            gameState = "win";

            leftPos = { x: width / 2, y: height / 2 };
            rightPos = { x: width / 2, y: height / 2 };

            return;
        }

        let t = rounds / maxRounds;

        targetLeftPos = {
            x: lerp(40, width / 2 - leftBlobImg.width / 2, t),
            y: lerp(height - 40 - leftBlobImg.height, height / 2 - leftBlobImg.height / 2, t)
        };

        targetRightPos = {
            x: lerp(width - 40 - rightBlobImg.width, width / 2 - rightBlobImg.width / 2, t),
            y: lerp(40, height / 2 - rightBlobImg.height / 2, t)
        };

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
