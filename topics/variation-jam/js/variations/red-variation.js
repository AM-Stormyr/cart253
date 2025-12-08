/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

let noiseTexture;
let showIntro = true;
let showInstructions = false;
let introSwitchTimer = null;

let currentBlob = 0;
let nextBlob = 1;
let fadeAmount = 0;
let fading = true;
let scaleFactor = 0.5;

let dormantGameOver = false;
let holdingOption = false;

let noiseAlpha = 0;

let dormantWin = false;
let redWinLines = [
    "congratulations!",
    "you did it!",
    "you have entered full dormancy",
    "and shifted into a non human time scale.",
    "that is pretty amazing,",
    "it takes courage to slow down.",
    "FINAL"
];
let redWinIndex = 0;
let redWinTimer = null;
let redWinFrames = 0;
let redWinDelayFrames = 140;

function redSetup() {
    generateNoiseTexture();
    showIntro = true;
    showInstructions = false;
    introSwitchTimer = null;

    currentBlob = 0;
    nextBlob = 1;
    fadeAmount = 0;
    fading = true;
    scaleFactor = 0.5;

    dormantGameOver = false;
    holdingOption = false;

    noiseAlpha = 0;

    dormantWin = false;
    redWinIndex = 0;
    redWinFrames = 0;
    if (redWinTimer) clearInterval(redWinTimer);
}

/*****************************************************
 **************** BACKGROUND TEXTURE *****************
 *****************************************************/
function generateNoiseTexture() {
    noiseTexture = createGraphics(width, height);
    noiseTexture.loadPixels();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            let grain = random(180, 240);
            let p = noise(x * 0.01, y * 0.01) * 50 - 25;
            let c = constrain(grain + p, 0, 255);

            noiseTexture.set(x, y, color(c));
        }
    }
    noiseTexture.updatePixels();

    noiseTexture.noStroke();
    for (let i = 0; i < 2000; i++) {
        let x = random(width);
        let y = random(height);
        noiseTexture.fill(255, 50);
        noiseTexture.rect(x, y, 1, 1);
    }
}

/*****************************************************
 ************************ DRAW ************************
 *****************************************************/
function redDraw() {

    background(200, 225, 250);

    // fade noise texture in slowly
    push();
    tint(255, noiseAlpha);
    image(noiseTexture, 0, 0);
    pop();

    // final ESC screen
    if (dormantWin && redWinLines[redWinIndex] === "FINAL") {
        textFont(fontRegular);
        fill(0, 150);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("return to menu [esc]", width / 2, height / 2);
        return;
    }

    // win text sequence
    if (dormantWin) {
        textFont(fontRegular);
        fill(0, 150);
        textAlign(CENTER, CENTER);
        textSize(20);

        if (redWinFrames > redWinDelayFrames && redWinIndex < redWinLines.length - 1) {
            redWinIndex++;
            redWinFrames = 0;
        } else {
            redWinFrames++;
        }

        text(redWinLines[redWinIndex], width / 2, height / 2);
        return;
    }

    // intro text
    if (showIntro && !dormantGameOver) {
        textFont(fontRegular);
        fill(0, 160);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("take one slow breath.\nthen enter slime-time.", width / 2, height / 2);

        if (introSwitchTimer === null) {
            introSwitchTimer = setTimeout(() => {
                if (showIntro) {
                    showIntro = false;
                    showInstructions = true;
                }
            }, 2500);
        }
        return;
    }

    // instructions
    if (showInstructions && !dormantGameOver) {
        textFont(fontRegular);
        fill(0, 160);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("time moves differently for slime.\nhold OPTION + CONTROL \ntill the slime is fully dormant.",
            width / 2, height / 2);

        if (!holdingOption) return;
    }

    // game over
    if (dormantGameOver) {
        textFont(fontRegular);
        fill(0, 150);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("game over // menu [esc]", width / 2, height / 2);
        return;
    }

    if (!holdingOption) {
        return;
    }

    // continuous check for release (game over)
    if (holdingOption) {
        if (!keyIsDown(CONTROL) || !keyIsDown(ALT)) {
            holdingOption = false;
            dormantGameOver = true;
        }
    }

    // fade noise in while holding ctrl+opt
    if (holdingOption) {
        noiseAlpha += 0.4;
        if (noiseAlpha > 255) noiseAlpha = 255;
    }

    // ---------------- blob fading ----------------
    let imgA = blobs[currentBlob];
    let imgB = blobs[nextBlob];

    let w = imgA.width * scaleFactor;
    let h = imgA.height * scaleFactor;

    let cx = width / 2 - w / 2;
    let cy = height / 2 - h / 2;

    tint(255, 255 - fadeAmount);
    image(imgA, cx, cy, w, h);

    tint(255, fadeAmount);
    image(imgB, cx, cy, w, h);

    if (fading) {
        fadeAmount += 1;

        if (fadeAmount >= 255) {
            fadeAmount = 0;
            currentBlob = nextBlob;
            nextBlob++;

            if (nextBlob >= blobs.length) {
                nextBlob = blobs.length - 1;
                fading = false;
                dormantWin = true;
            }
        }
    }

    tint(255);
}

/*****************************************************
 ******************** KEY INPUTS *********************
 *****************************************************/
function redKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu"; // esc back to menu
    }

    if (event.altKey && event.ctrlKey) {
        holdingOption = true;
        showIntro = false;
        showInstructions = false;
    }
}

function redMousePressed() { }
