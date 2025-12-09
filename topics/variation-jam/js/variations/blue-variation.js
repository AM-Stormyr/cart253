/**
 * BLUE VARIATION — Oscillate
 * (two players press keys and slowly merge)
 */

// images
let leftBlobImg;
let rightBlobImg;
let winnerBlobImg;

// positions
let leftPos;
let rightPos;
let targetLeftPos;
let targetRightPos;

// wobble
let wobbleTime = 0;

// rounds + key presses
let rounds = 0;
let maxRounds = 5;
let stepProgress = 0;
let stepGoal = 0;

let currentLeftKey = "";
let currentRightKey = "";

let merged = false;
let allKeys = "abcdefghijklmnopqrstuvwxyz".split("");

// local state only for this variation
let blueState = "instructions";

// win text
let blueWinLines = [
    "Congratulations!",
    "you are fully merged.",
    "life is most beautiful when shared.",
    "return to menu [esc]"
];
let blueWinIndex = 0;
let blueWinTimer = 0;
let blueWinDelay = 120;

// audio
let osc1, osc2, slurp;


/**
 * preload blue stuff
 */
function bluePreload() {

    // images
    leftBlobImg = loadImage("assets/images/oscillate/left-blob2.png");
    rightBlobImg = loadImage("assets/images/oscillate/right-blob1.png");
    winnerBlobImg = loadImage("assets/images/oscillate/winner-blob2.png");

    // sounds
    osc1 = loadSound("assets/sounds/oscillate/oscillation1.mp3");
    osc2 = loadSound("assets/sounds/oscillate/oscillation2.mp3");
    slurp = loadSound("assets/sounds/oscillate/slurp-edit.mp3");
}


/**
 * setup blue stuff
 */
function blueSetup() {

    // stop leftover audio
    if (osc1 && osc1.isPlaying()) osc1.stop();
    if (osc2 && osc2.isPlaying()) osc2.stop();
    if (slurp && slurp.isPlaying()) slurp.stop();

    blueState = "instructions";
    merged = false;

    rounds = 0;
    stepProgress = 0;
    stepGoal = int(random(35, 60));

    // first keys
    currentLeftKey = random(allKeys).toUpperCase();
    currentRightKey = random(allKeys).toUpperCase();

    // positions
    leftPos = { x: 40, y: height - 40 - leftBlobImg.height };
    rightPos = { x: width - 40 - rightBlobImg.width, y: 40 };

    targetLeftPos = { x: leftPos.x, y: leftPos.y };
    targetRightPos = { x: rightPos.x, y: rightPos.y };

    blueWinIndex = 0;
    blueWinTimer = 0;
}


/**
 * draw loop
 */
function blueDraw() {

    background(200, 225, 250);

    // instructions
    if (blueState === "instructions") {

        textFont(fontRegular);
        fill(0, 150);
        textSize(20);
        textAlign(CENTER, CENTER);

        text(
            "Two players: left + right\nPress the shown keys to merge\n\nPress ENTER to start",
            width / 2,
            height / 2
        );

        return;
    }

    // wobble movement
    wobbleTime += 0.05;
    let wobbleX = sin(wobbleTime) * 6;
    let wobbleY = cos(wobbleTime) * 6;

    // easing toward target positions
    leftPos.x = lerp(leftPos.x, targetLeftPos.x, 0.05);
    leftPos.y = lerp(leftPos.y, targetLeftPos.y, 0.05);

    rightPos.x = lerp(rightPos.x, targetRightPos.x, 0.05);
    rightPos.y = lerp(rightPos.y, targetRightPos.y, 0.05);


    // WIN
    if (blueState === "win") {

        let bx = width / 2 - winnerBlobImg.width / 2 + wobbleX;
        let by = height / 2 - winnerBlobImg.height / 2 + wobbleY;

        image(winnerBlobImg, bx, by);

        textFont(fontRegular);
        fill(0, 150);
        textSize(20);
        textAlign(CENTER, CENTER);

        // cycle messages
        if (blueWinTimer > blueWinDelay && blueWinIndex < blueWinLines.length - 1) {
            blueWinIndex++;
            blueWinTimer = 0;
        } else {
            blueWinTimer++;
        }

        text(blueWinLines[blueWinIndex], width / 2, height - 120);

        return;
    }


    // main play
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


/**
 * key input
 */
function blueKeyPressed(event) {

    // ESC to menu
    if (event.keyCode === 27) {
        if (osc1 && osc1.isPlaying()) osc1.stop();
        if (osc2 && osc2.isPlaying()) osc2.stop();
        if (slurp && slurp.isPlaying()) slurp.stop();
        state = "menu";
        return;
    }

    // start game
    if (blueState === "instructions") {
        if (event.keyCode === 13) {
            blueState = "play";
            if (osc1) osc1.loop();
        }
        return;
    }

    if (merged) return;

    let k = event.key.toUpperCase();

    // last round uses G
    if (rounds === maxRounds - 1) {
        if (k === "G") stepProgress++;
    } else {
        if (k === currentLeftKey || k === currentRightKey) stepProgress++;
    }

    // reached step goal
    if (stepProgress >= stepGoal) {

        rounds++;
        stepProgress = 0;
        stepGoal = int(random(35, 60));

        // MERGE
        if (rounds === maxRounds) {

            merged = true;
            blueState = "win";

            if (osc1 && osc1.isPlaying()) osc1.stop();
            if (osc2) osc2.play();
            if (slurp) setTimeout(() => slurp.play(), 150);

            leftPos = { x: width / 2, y: height / 2 };
            rightPos = { x: width / 2, y: height / 2 };

            return;
        }

        // move toward center
        let t = rounds / maxRounds;

        targetLeftPos = {
            x: lerp(40, width / 2 - leftBlobImg.width / 2, t),
            y: lerp(height - 40 - leftBlobImg.height, height / 2 - leftBlobImg.height / 2, t)
        };

        targetRightPos = {
            x: lerp(width - 40 - rightBlobImg.width, width / 2 - rightBlobImg.width / 2, t),
            y: lerp(40, height / 2 - rightBlobImg.height / 2, t)
        };

        // next round keys
        if (rounds === maxRounds - 1) {
            currentLeftKey = "G";
            currentRightKey = "G";
        } else {
            currentLeftKey = random(allKeys).toUpperCase();
            currentRightKey = random(allKeys).toUpperCase();
        }
    }
}


function blueMousePressed() {
    // no mouse here
}
