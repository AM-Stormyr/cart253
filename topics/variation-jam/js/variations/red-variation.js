/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the red variation starts
 */

let noiseTexture;


function redSetup() {
    generateNoiseTexture();
}

function generateNoiseTexture() {
    noiseTexture = createGraphics(width, height);
    noiseTexture.loadPixels();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            // Base grain - shifted lighter
            let grain = random(180, 240);  // bumped up brightness

            // Perlin shadows - softened + lighter
            let p = noise(x * 0.01, y * 0.01) * 50 - 25;

            // Combine
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
function redDraw() {
    image(noiseTexture, 0, 0);

}


/**
 * This will be called whenever a key is pressed while the red variation is active
 */
function redKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the red variation is active
 */
function redMousePressed() {

}