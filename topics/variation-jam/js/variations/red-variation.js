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

// win stuff
let dormantWin = false;
let winLines = [
    "congratulations!",
    "you did it!",
    "you have entered full dormancy",
    "and shifted into a non human time scale.",
    "that is pretty amazing,",
    "it takes courage to slow down.",
    "FINAL"
];
let winIndex = 0;
let winTimer = null;
let winFrames = 0;
let winDelayFrames = 140; // slower pacing


function redSetup() {
    generateNoiseTexture();
    showIntro = true;
    showInstructions = false;
    introSwitchTimer = null;

    dormantGameOver = false;
    holdingOption = false;

    dormantWin = false;
    winIndex = 0;
    winFrames = 0;
    if (winTimer) clearInterval(winTimer);
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
    image(noiseTexture, 0, 0);

    // final ESC screen (after all win lines)
    if (dormantWin && winLines[winIndex] === "FINAL") {
        textFont(fontRegular);
        fill(0, 150);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("[esc]_ return to menu", width / 2, height / 2);
        return;
    }

    // win text sequence before final screen
    if (dormantWin) {
        textFont(fontRegular);
        fill(0, 150);
        textAlign(CENTER, CENTER);
        textSize(20);

        if (winFrames > winDelayFrames && winIndex < winLines.length - 1) {
            winIndex++;
            winFrames = 0;
        } else {
            winFrames++;
        }

        text(winLines[winIndex], width / 2, height / 2);
        return;
    }

    // intro text
    if (showIntro && !dormantGameOver) {
        textFont(fontRegular);
        fill(0, 160);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("take one slow breath.\nthen enter slime-time.", width / 2, height - 100);

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
        text("time moves differently for slime.\nhold OPTION + CONTROLtill the slime is fully dormant.",
            width / 2, height - 100);

        if (!holdingOption) return;
    }

    // game over
    if (dormantGameOver) {
        textFont(fontRegular);
        fill(0, 150);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("game over_ press [esc]", width / 2, height - 100);
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
                dormantWin = true; // slime becomes fully dormant
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
