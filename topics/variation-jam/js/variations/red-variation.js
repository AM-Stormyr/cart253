/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the red variation starts
 */

let noiseTexture;
let showIntro = true;
let showInstructions = false;
let introSwitchTimer = null;


let currentBlob = 0;
let nextBlob = 1;
let fadeAmount = 0;
let fading = true;
let scaleFactor = 0.4; // I can tweak this later

let dormantGameOver = false;
let holdingOption = false; // option key = staying still


function redSetup() {
    generateNoiseTexture();
    showIntro = true;
    showInstructions = false;
    introSwitchTimer = null;

    // reset game state
    currentBlob = 0;
    nextBlob = 1;
    fadeAmount = 0;
    fading = true;
    holdingOption = false;
    dormantGameOver = false;
}





////////////////////////////////////////////////////////
///////////////// BACKGROUND TEXTURE //////////////////
//////////////////////////////////////////////////////


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

    // Speckles: more white “dust”
    noiseTexture.noStroke();
    for (let i = 0; i < 2000; i++) {
        let x = random(width);
        let y = random(height);
        noiseTexture.fill(255, 50);  // translucent bright specks
        noiseTexture.rect(x, y, 1, 1);
    }
}

/**
 * This will be called every frame when the red variation is active
 */

//////////////////////////////////////////////////////
////////////////////  DRAW ///////////////////////
//////////////////////////////////////////////////////

function redDraw() {
    image(noiseTexture, 0, 0);

    // if we are in the "holding" state, check if the keys are STILL held
    if (holdingOption && !dormantGameOver) {
        // CONTROL = 17, OPTION/ALT = 18
        let ctrlDown = keyIsDown(17);
        let altDown = keyIsDown(18);
        if (!(ctrlDown && altDown)) {
            holdingOption = false;
            dormantGameOver = true;
        }
    }

    if (showIntro && !dormantGameOver) {

        // draw intro text
        textFont(fontRegular);
        fill(0, 160);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("take one slow breath.\nthen enter slime-time.", width / 2, height - 125);

        // start switch timer only once
        if (introSwitchTimer === null) {
            introSwitchTimer = setTimeout(() => {
                if (showIntro) {
                    showIntro = false;
                    showInstructions = true;
                }
            }, 2500); // 2.5 seconds
        }

        return;
    }
    if (showInstructions && !dormantGameOver) {

        textFont(fontRegular);
        fill(0, 160);
        textAlign(CENTER, CENTER);
        textSize(20);

        text("time moves differently for slime.\nhold CONTROL + OPTION till the slime is fully dormant.", width / 2, height - 125);

        // do not continue the game until CONTROL + OPTION are held
        if (!holdingOption) return;
    }

    if (dormantGameOver) { // little quiet "dead" message
        fill(0, 150);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("game over", width / 2, height - 120);
        return; // stop everything forever
    }

    if (!holdingOption) {
        // waiting for the player to hold down control + option
        return;
    }



    let imgA = blobs[currentBlob];
    let imgB = blobs[nextBlob];

    let w = imgA.width * scaleFactor;
    let h = imgA.height * scaleFactor;

    let cx = width / 2 - w / 2;
    let cy = height / 2 - h / 2;

    // old blob (fade out)
    tint(255, 255 - fadeAmount);
    image(imgA, cx, cy, w, h);

    // new blob (fade in)
    tint(255, fadeAmount);
    image(imgB, cx, cy, w, h);

    // fade logic
    if (fading) {
        fadeAmount += 1; // slow-ish

        if (fadeAmount >= 255) {
            fadeAmount = 0;
            currentBlob = nextBlob;
            nextBlob++;

            if (nextBlob >= blobs.length) {
                nextBlob = blobs.length - 1;
                fading = false; // it's fully sclerotia now
            }
        }
    }

    tint(255);
}


/**
 * This will be called whenever a key is pressed while the red variation is active
 */
function redKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }

    // control + option together
    if (event.ctrlKey && event.altKey) {
        holdingOption = true;
        showIntro = false;
        showInstructions = false; // hide all text when committed
    }
}
/**
 * This is where game over happens if the key is lifted. 
 */
function redKeyReleased(event) {
    // left empty now, we handle "release" in redDraw()
}



/**
 * This will be called whenever the mouse is pressed while the red variation is active
 */
function redMousePressed() {

}
