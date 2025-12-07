/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the green variation starts
 */

let slimePixel;
let px = 0;
let py = 0;
let step = 15;

let oatImgs = [];
let oats = [];
let oatCount = 7;
let oatSize = 20;

let tail = [];
let pixelW = 15;
let pixelH = 15;



// todo: redraw oats later so they match the scale
function greenPreload() {
    slimePixel = loadImage("assets/images/forage/slime-mold-pixel.png");

    // load all 7 oat sprites
    for (let i = 1; i <= 7; i++) {
        oatImgs.push(loadImage(`assets/images/forage/oat${i}.png`));
    }
}

function greenSetup() {
    // start in the middle, kinda arbitrary
    px = Math.floor(width / 2 / step) * step;
    py = Math.floor(height / 2 / step) * step;

    // spawn oats on the grid
    oats = [];
    for (let i = 0; i < oatCount; i++) {
        let gx = Math.floor(random(width / step)) * step;
        let gy = Math.floor(random(height / step)) * step;

        // random oat image
        let img = oatImgs[Math.floor(Math.random() * oatImgs.length)];

        oats.push({
            x: gx,
            y: gy,
            img: img
        });
        console.log("pixel size:", slimePixel.width, slimePixel.height);

    }
}

/**
 * This will be called every frame when the green variation is active
 */
function greenDraw() {
    background(200, 225, 250); // bg colour

    // draw oats
    for (let o of oats) {
        image(o.img, o.x, o.y, oatSize, oatSize);
    }

    // eat oats if touching them
    for (let i = oats.length - 1; i >= 0; i--) {
        let o = oats[i];
        if (px === o.x && py === o.y) {
            oats.splice(i, 1);
        }
    }

    // draw tail (continuous, aligned with head)
    noStroke();
    fill(250, 240, 120, 200);
    for (let t of tail) {
        rect(
            t.x - pixelW / 2,
            t.y - pixelH / 2,
            pixelW,
            pixelH
        );
    }


    // draw the pixel blob
    image(slimePixel, px - slimePixel.width / 2, py - slimePixel.height / 2);
}


/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }

    // arrow keys move in 15px hops
    if (event.keyCode === UP_ARROW) {
        tail.push({ x: px, y: py });
        py -= step;
    }
    else if (event.keyCode === DOWN_ARROW) {
        tail.push({ x: px, y: py });
        py += step;
    }
    else if (event.keyCode === LEFT_ARROW) {
        tail.push({ x: px, y: py });
        px -= step;
    }
    else if (event.keyCode === RIGHT_ARROW) {
        tail.push({ x: px, y: py });
        px += step;
    }
}

/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function greenMousePressed() {

}
