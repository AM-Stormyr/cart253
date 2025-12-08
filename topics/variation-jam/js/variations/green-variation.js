// green variation
// trying to keep this kinda simple and not break the menu stuff

let slimePixel;
let mainBlob;
let timePixelImg;

let px = 0;
let py = 0;
let step = 15;

// direction
let dx = 0;
let dy = 0;

let oatImgs = [];
let oats = [];
let oatCount = 7;

let tail = [];
let pixelW = 15;
let pixelH = 15;

let playerSize = 15;

// game stuff
let score = 0;
let gameTime = 60;
let gameOver = false;

let moveCounter = 0;
let moveInterval = 3;

let blobAlpha = 255;
let hasStartedMoving = false;

// preload
function greenPreload() {
    slimePixel = loadImage("assets/images/forage/slime-mold-pixel.png");
    mainBlob = loadImage("assets/images/forage/main-blob.png");
    timePixelImg = loadImage("assets/images/forage/time-pixel.png");

    // just these oat sprites I’m using
    let oatNumbers = [3, 5, 6, 8];
    for (let num of oatNumbers) {
        oatImgs.push(loadImage("assets/images/forage/oat" + num + ".png"));
    }
}

function greenSetup() {
    //to make sure the blob and the pixel are the same colours
    noSmooth();

    // sorta center it on the grid
    px = Math.floor((width / 2) / step) * step;
    py = Math.floor((height / 2) / step) * step;

    score = 0;
    gameTime = 60;
    gameOver = false;

    dx = 0;
    dy = 0;

    tail = [];
    blobAlpha = 255;
    hasStartedMoving = false;

    oats = [];
    for (let i = 0; i < oatCount; i++) {
        spawnOat();
    }
}

// putting oats down but trying not to hit edges
function spawnOat() {
    let tries = 0;
    let maxTries = 80;

    // since canvas is 570 I just guessed these margins
    let margin = 45;      // keep away from the sides a bit
    let uiH = 40;         // leave room for the top text stuff

    while (tries < maxTries) {
        // kinda sloppy grid placement but it works
        let gx = Math.floor(random(margin / step, (width - margin) / step)) * step;
        let gy = Math.floor(random(uiH / step, (height - margin) / step)) * step;

        let img = oatImgs[int(random(oatImgs.length))];

        // check overlap (simple)
        let bad = false;
        for (let o of oats) {
            if (
                gx < o.x + o.w &&
                gx + img.width > o.x &&
                gy < o.y + o.h &&
                gy + img.height > o.y
            ) {
                bad = true;
                break;
            }
        }

        if (!bad) {
            oats.push({
                x: gx,
                y: gy,
                img: img,
                w: img.width,
                h: img.height,
                // made this 6 sec now
                timer: 6,
                eaten: false
            });
            return;
        }

        tries++;
    }

    // fallback if it keeps failing
    let img = oatImgs[int(random(oatImgs.length))];
    oats.push({
        x: margin,
        y: uiH,
        img: img,
        w: img.width,
        h: img.height,
        timer: 6,
        eaten: false
    });
}

function greenDraw() {
    background(200, 225, 250);

    if (gameOver) {
        fill(0);
        textFont(fontMedium);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("game over", width / 2, height / 2 - 15);
        text("oats caught: " + score, width / 2, height / 2 + 15);
        return;
    }

    // timer
    gameTime -= deltaTime / 1000;
    if (gameTime <= 0) {
        gameOver = true;
        gameTime = 0;
    }

    // movement tick
    moveCounter++;
    if (moveCounter >= moveInterval) {
        moveCounter = 0;

        if (dx !== 0 || dy !== 0) {
            hasStartedMoving = true;
        }

        // tail
        tail.push({ x: px, y: py, alpha: 255 });

        px += dx * step;
        py += dy * step;

        // wrapping
        if (px < 0) px = width - step;
        if (px >= width) px = 0;
        if (py < 0) py = height - step;
        if (py >= height) py = 0;
    }

    // fade blob
    if (hasStartedMoving && blobAlpha > 0) {
        blobAlpha -= 1.3;
        if (blobAlpha < 0) blobAlpha = 0;
    }

    // oat timer (just using the first oat again)
    if (oats.length > 0) {
        oats[0].timer -= deltaTime / 1000;

        if (oats[0].timer <= 0) {
            oats = [];
            for (let i = 0; i < oatCount; i++) {
                spawnOat();
            }
        }
    }

    // draw oats
    for (let o of oats) {
        if (o.eaten) {
            push();
            tint(253, 238, 57);
            image(o.img, o.x, o.y, o.w, o.h);
            pop();
        } else {
            image(o.img, o.x, o.y, o.w, o.h);
        }
    }

    // main blob in the middle
    if (blobAlpha > 0) {
        tint(255, blobAlpha);  // keep blob colour EXACT, only fade alpha
        image(mainBlob, width / 2 - mainBlob.width / 2, height / 2 - mainBlob.height / 2);
        noTint();
    }

    // collisions
    for (let i = oats.length - 1; i >= 0; i--) {
        let o = oats[i];
        if (o.eaten) continue;

        let half = playerSize * 0.5;
        let pl = px - half;
        let pr = px + half;
        let pt = py - half;
        let pb = py + half;

        let shrink = 0.15;
        let ol = o.x + o.w * shrink;
        let orr = o.x + o.w - o.w * shrink;
        let ot = o.y + o.h * shrink;
        let ob = o.y + o.h - o.h * shrink;

        let hit = pl < orr && pr > ol && pt < ob && pb > ot;

        if (hit) {
            score++;
            o.eaten = true;
        }
    }

    // tail fade stuff
    noStroke();
    for (let i = tail.length - 1; i >= 0; i--) {
        let t = tail[i];
        t.alpha -= 0.28;

        fill(253, 238, 57, t.alpha);
        rect(t.x - pixelW / 2, t.y - pixelH / 2, pixelW, pixelH);

        if (t.alpha <= 0) {
            tail.splice(i, 1);
        }
    }

    // draw the player pixel
    image(slimePixel, px - slimePixel.width / 2, py - slimePixel.height / 2);

    // UI text and time pixels
    fill(0);
    textFont(fontMedium);
    textSize(24);
    textAlign(LEFT, TOP);
    text("oats: " + score, 10, 10);

    // the 6-second “pixel” timer bar (still showing 10 pixels cause it looks nice)
    let secondsLeft = 0;
    if (oats.length > 0) {
        secondsLeft = ceil(oats[0].timer);
    }

    let cx = width / 2 - (10 * 20) / 2;
    for (let i = 0; i < 10; i++) {
        if (i < secondsLeft) {
            image(timePixelImg, cx + i * 20, 10);
        }
    }

    textAlign(RIGHT, TOP);
    text(ceil(gameTime), width - 10, 10);
}

function greenKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
    if (gameOver) return;

    if (event.keyCode === UP_ARROW) {
        dx = 0; dy = -1;
    } else if (event.keyCode === DOWN_ARROW) {
        dx = 0; dy = 1;
    } else if (event.keyCode === LEFT_ARROW) {
        dx = -1; dy = 0;
    } else if (event.keyCode === RIGHT_ARROW) {
        dx = 1; dy = 0;
    }
}

function greenMousePressed() {
    // not using mouse here
}