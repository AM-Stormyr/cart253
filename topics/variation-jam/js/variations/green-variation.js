/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// === VARIABLES ===

let slimePixel;
let timePixelImg;

let px = 0;
let py = 0;
let step = 15;

// movement direction
let dx = 0;
let dy = 0;

let oatImgs = [];
let oats = [];
let oatCount = 7;

let tail = [];
let pixelW = 15;
let pixelH = 15;

let playerSize = 15;

// game state
let score = 0;
let gameTime = 30; // seconds
let gameOver = false;

// auto movement pacing
let moveCounter = 0;
let moveInterval = 4;


// === PRELOAD ===
function greenPreload() {

    slimePixel = loadImage("assets/images/forage/slime-mold-pixel.png");
    timePixelImg = loadImage("assets/images/forage/time-pixel.png");

    // load only the oats you actually have
    const oatFiles = ["oat3.png", "oat5.png", "oat6.png", "oat8.png"];
    oatImgs = [];

    for (let f of oatFiles) {
        oatImgs.push(loadImage("assets/images/forage/" + f));
    }
}


// === SETUP ===
function greenSetup() {

    // start at grid center
    px = Math.floor(width / 2 / step) * step;
    py = Math.floor(height / 2 / step) * step;

    // reset game state
    score = 0;
    gameTime = 30;
    gameOver = false;
    dx = 0;
    dy = 0;
    tail = [];

    // create oats
    oats = [];
    for (let i = 0; i < oatCount; i++) {
        spawnOat();
    }
}


// === SPAWN A NON-OVERLAPPING OAT ===
function spawnOat() {

    let attempts = 0;
    let maxAttempts = 100;
    let uiHeight = 40;

    while (attempts < maxAttempts) {

        let gx = Math.floor(random(width / step)) * step;
        let gy = Math.floor(random(uiHeight / step, height / step)) * step;

        let img = oatImgs[Math.floor(Math.random() * oatImgs.length)];

        let overlapping = false;

        for (let o of oats) {
            if (gx < o.x + o.w &&
                gx + img.width > o.x &&
                gy < o.y + o.h &&
                gy + img.height > o.y) {

                overlapping = true;
                break;
            }
        }

        if (!overlapping) {
            oats.push({
                x: gx,
                y: gy,
                img: img,
                w: img.width,
                h: img.height,
                timer: 6.0
            });
            return;
        }

        attempts++;
    }

    // fallback
    let img = oatImgs[Math.floor(Math.random() * oatImgs.length)];
    oats.push({
        x: 0,
        y: uiHeight,
        img: img,
        w: img.width,
        h: img.height,
        timer: 6.0
    });
}


// === DRAW ===
function greenDraw() {

    background(200, 225, 250);

    if (gameOver) {
        fill(0);
        textFont(fontMedium);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(`game over`, width / 2, height / 2 - 20);
        text(`oats caught: ${score}`, width / 2, height / 2 + 20);
        return;
    }

    // update countdown
    gameTime -= deltaTime / 1000;
    if (gameTime <= 0) {
        gameTime = 0;
        gameOver = true;
    }

    // movement pacing
    moveCounter++;
    if (moveCounter >= moveInterval) {

        moveCounter = 0;

        tail.push({ x: px, y: py });

        px += dx * step;
        py += dy * step;

        // pacman wrapping
        if (px < 0) px = width - step;
        if (px >= width) px = 0;
        if (py < 0) py = height - step;
        if (py >= height) py = 0;
    }

    // update oat timers
    for (let o of oats) {

        o.timer -= deltaTime / 1000;

        if (o.timer <= 0) {

            // try to respawn in new spot
            let uiHeight = 40;
            let attempts = 0;

            while (attempts < 50) {

                let gx = Math.floor(random(width / step)) * step;
                let gy = Math.floor(random(uiHeight / step, height / step)) * step;

                let overlapping = false;

                for (let other of oats) {
                    if (other === o) continue;

                    if (gx < other.x + other.w &&
                        gx + o.w > other.x &&
                        gy < other.y + other.h &&
                        gy + o.h > other.y) {
                        overlapping = true;
                        break;
                    }
                }

                if (!overlapping) {
                    o.x = gx;
                    o.y = gy;
                    o.img = oatImgs[Math.floor(Math.random() * oatImgs.length)];
                    o.w = o.img.width;
                    o.h = o.img.height;
                    break;
                }

                attempts++;
            }

            o.timer = 6.0;
        }
    }

    // draw oats
    for (let o of oats) {
        image(o.img, o.x, o.y, o.w, o.h);
    }

    // collisions
    for (let i = oats.length - 1; i >= 0; i--) {

        let o = oats[i];

        let half = playerSize * 0.5;

        let playerLeft = px - half;
        let playerRight = px + half;
        let playerTop = py - half;
        let playerBottom = py + half;

        let oatLeft = o.x;
        let oatRight = o.x + o.w;
        let oatTop = o.y;
        let oatBottom = o.y + o.h;

        let overlap =
            playerLeft < oatRight &&
            playerRight > oatLeft &&
            playerTop < oatBottom &&
            playerBottom > oatTop;

        if (overlap) {
            score++;
            oats.splice(i, 1);
            spawnOat();
        }
    }

    // tail
    noStroke();
    fill(250, 240, 120);
    for (let t of tail) {
        rect(t.x - pixelW / 2, t.y - pixelH / 2, pixelW, pixelH);
    }

    // player
    image(slimePixel, px - slimePixel.width / 2, py - slimePixel.height / 2);


    // === UI ===

    fill(0);
    textFont(fontMedium);
    textSize(24);

    // left: score
    textAlign(LEFT, TOP);
    text(`oats: ${score}`, 10, 10);

    // center: time-pixels for FIRST oat
    let timePixelsRemaining = Math.ceil(oats.length > 0 ? oats[0].timer : 0);
    let centerX = width / 2 - (6 * 20) / 2;

    for (let i = 0; i < 6; i++) {
        if (i < timePixelsRemaining) {
            image(timePixelImg, centerX + i * 20, 10);
        }
    }

    // right: main countdown
    textAlign(RIGHT, TOP);
    text(`${Math.ceil(gameTime)}`, width - 10, 10);
}


// === KEY INPUT ===
function greenKeyPressed(event) {

    if (event.keyCode === 27) {
        state = "menu";
    }

    if (gameOver) return;

    if (event.keyCode === UP_ARROW) {
        dx = 0;
        dy = -1;
    }
    else if (event.keyCode === DOWN_ARROW) {
        dx = 0;
        dy = 1;
    }
    else if (event.keyCode === LEFT_ARROW) {
        dx = -1;
        dy = 0;
    }
    else if (event.keyCode === RIGHT_ARROW) {
        dx = 1;
        dy = 0;
    }
}


// === MOUSE INPUT ===
function greenMousePressed() {
}
