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

let tail = [];
let pixelW = 15;
let pixelH = 15;

// storing this so both player and collision code use the same size
let playerSize = 15;


// I load the slime pixel + oat sprites
function greenPreload() {
    slimePixel = loadImage("assets/images/forage/slime-mold-pixel.png");

    // load all oat sprites
    for (let i = 1; i <= 11; i++) {
        oatImgs.push(loadImage(`assets/images/forage/oat${i}.png`));
    }
}

function greenSetup() {
    // start in the middle of the screen, snapped to the grid
    px = Math.floor(width / 2 / step) * step;
    py = Math.floor(height / 2 / step) * step;

    // spawn oats on the grid, each with its real width/height
    oats = [];
    for (let i = 0; i < oatCount; i++) {
        let gx = Math.floor(random(width / step)) * step;
        let gy = Math.floor(random(height / step)) * step;

        // random oat image
        let img = oatImgs[Math.floor(Math.random() * oatImgs.length)];

        oats.push({
            x: gx,
            y: gy,
            img: img,
            // storing the actual PNG size so collision is accurate
            w: img.width,
            h: img.height
        });
    }
}

/**
 * This will be called every frame when the green variation is active
 */
function greenDraw() {
    background(200, 225, 250);

    // draw all oats at their original resolutions
    for (let o of oats) {
        image(o.img, o.x, o.y, o.w, o.h);
    }

    // collision detection for variable-sized oats (bounding boxes)
    for (let i = oats.length - 1; i >= 0; i--) {
        let o = oats[i];

        // player's box (centered around px, py)
        let half = playerSize * 0.5;
        let playerLeft = px - half;
        let playerRight = px + half;
        let playerTop = py - half;
        let playerBottom = py + half;

        // oat's rectangle
        let oatLeft = o.x;
        let oatRight = o.x + o.w;
        let oatTop = o.y;
        let oatBottom = o.y + o.h;

        // checking overlap between the two rectangles
        let overlap =
            playerLeft < oatRight &&
            playerRight > oatLeft &&
            playerTop < oatBottom &&
            playerBottom > oatTop;

        // remove oat if hit
        if (overlap) {
            oats.splice(i, 1);
        }
    }

    // draw tail pixels
    noStroke();
    fill(250, 240, 120);
    for (let t of tail) {
        rect(
            t.x - pixelW / 2,
            t.y - pixelH / 2,
            pixelW,
            pixelH
        );
    }

    // draw the player pixel
    image(slimePixel, px - slimePixel.width / 2, py - slimePixel.height / 2);
}


/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }

    // whenever I move, I drop a tail segment
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
