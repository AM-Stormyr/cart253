/**
 * GREEN VARIATION
 * full working version
 */

// images
let slimePixel;
let mainBlob;
let timePixelImg;

// player position
let px = 0;
let py = 0;
let step = 15;

// movement direction
let dx = 0;
let dy = 0;

// oats
let oatImgs = [];
let oats = [];
let oatCount = 10;

// tail pixels
let tail = [];
let pixelW = 15;
let pixelH = 15;
let playerSize = 15;

// game state
let score = 0;
let gameTime = 45; // total seconds
let gameOver = false;

// auto movement pacing
let moveCounter = 0;
let moveInterval = 4;

// center blob fade
let blobAlpha = 255;
let hasStartedMoving = false;

// shared oat timer (for rearranging all oats)
let oatTimerMax = 6;
let oatTimer = oatTimerMax;


/**
 * preload for green variation
 */
function greenPreload() {
    slimePixel = loadImage("assets/images/forage/slime-mold-pixel.png");
    mainBlob = loadImage("assets/images/forage/main-blob.png");
    timePixelImg = loadImage("assets/images/forage/time-pixel.png");

    const oatFiles = ["oat3.png", "oat5.png", "oat6.png", "oat8.png"];
    oatImgs = [];
    for (let f of oatFiles) {
        oatImgs.push(loadImage("assets/images/forage/" + f));
    }
}


/**
 * setup
 */
function greenSetup() {

    noSmooth();

    // center on the grid
    px = Math.floor(width / 2 / step) * step;
    py = Math.floor(height / 2 / step) * step;

    score = 0;
    gameTime = 45;
    gameOver = false;

    dx = 0;
    dy = 0;

    tail = [];

    blobAlpha = 255;
    hasStartedMoving = false;

    oatTimer = oatTimerMax;

    // create oats
    oats = [];
    for (let i = 0; i < oatCount; i++) {
        spawnOat();
    }
}


/**
 * spawn one non-overlapping oat
 */
function spawnOat() {

    let attempts = 0;
    let maxAttempts = 200;

    let uiHeight = 40;
    let margin = 40;

    while (attempts < maxAttempts) {

        let gx = Math.floor(random(margin, width - margin) / step) * step;
        let gy = Math.floor(random(uiHeight + margin, height - margin) / step) * step;

        let img = random(oatImgs);
        let w = img.width;
        let h = img.height;

        let overlapping = false;

        for (let o of oats) {
            if (gx < o.x + o.w &&
                gx + w > o.x &&
                gy < o.y + o.h &&
                gy + h > o.y) {
                overlapping = true;
                break;
            }
        }

        if (!overlapping) {
            oats.push({
                x: gx,
                y: gy,
                img: img,
                w: w,
                h: h,
                eaten: false
            });
            return;
        }

        attempts++;
    }

    // fallback
    let img = random(oatImgs);
    oats.push({
        x: margin,
        y: uiHeight + margin,
        img: img,
        w: img.width,
        h: img.height,
        eaten: false
    });
}



/**
 * DRAW LOOP
 */
function greenDraw() {
    background(200, 225, 250);

    // game over
    if (gameOver) {
        fill(0);
        textFont(fontMedium);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("game over", width / 2, height / 2 - 20);
        text("oats caught: " + score, width / 2, height / 2 + 20);
        return;
    }

    // main game countdown
    gameTime -= deltaTime / 1000;
    if (gameTime <= 0) {
        gameTime = 0;
        gameOver = true;
    }

    // movement
    moveCounter++;
    if (moveCounter >= moveInterval) {
        moveCounter = 0;

        if (dx !== 0 || dy !== 0) hasStartedMoving = true;

        tail.push({ x: px, y: py, alpha: 255 });

        px += dx * step;
        py += dy * step;

        if (px < 0) px = width - step;
        if (px >= width) px = 0;
        if (py < 0) py = height - step;
        if (py >= height) py = 0;
    }

    // fade center blob
    if (hasStartedMoving && blobAlpha > 0) {
        blobAlpha -= 1.5;
        if (blobAlpha < 0) blobAlpha = 0;
    }

    // oat timer (shared)
    oatTimer -= deltaTime / 1000;
    if (oatTimer <= 0) {
        oats = [];
        for (let i = 0; i < oatCount; i++) spawnOat();
        oatTimer = oatTimerMax;
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

    // center blob
    if (blobAlpha > 0) {
        push();
        tint(255, blobAlpha);
        image(mainBlob,
            width / 2 - mainBlob.width / 2,
            height / 2 - mainBlob.height / 2
        );
        pop();
    }

    // collision check
    for (let o of oats) {
        if (o.eaten) continue;

        let half = playerSize * 0.5;

        let left = px - half;
        let right = px + half;
        let top = py - half;
        let bottom = py + half;

        let oatLeft = o.x;
        let oatRight = o.x + o.w;
        let oatTop = o.y;
        let oatBottom = o.y + o.h;

        let overlap =
            left < oatRight &&
            right > oatLeft &&
            top < oatBottom &&
            bottom > oatTop;

        if (overlap) {
            o.eaten = true;
            score++;
        }
    }

    // tail fade
    noStroke();
    for (let i = tail.length - 1; i >= 0; i--) {
        let t = tail[i];
        t.alpha -= 0.3;

        fill(253, 238, 57, t.alpha);
        rect(t.x - pixelW / 2, t.y - pixelH / 2, pixelW, pixelH);

        if (t.alpha <= 0) tail.splice(i, 1);
    }

    // player sprite
    image(slimePixel, px - slimePixel.width / 2, py - slimePixel.height / 2);


    // =====================================
    //               UI
    // =====================================

    let uiPadding = 20;
    let uiTextSize = 18;

    fill(0);
    textFont(fontRegular);
    textSize(uiTextSize);

    // left
    textAlign(LEFT, TOP);
    text("oats: " + score, uiPadding, uiPadding);

    // compute baseline alignment
    let textBaseline = uiPadding + uiTextSize * 0.75;

    // time-pixel bar: 6 segments, 15px spacing
    let barCount = 6;
    let pixelSpacing = 15;
    let barW = timePixelImg.width;
    let barH = timePixelImg.height;

    let totalWidth = barCount * barW + (barCount - 1) * pixelSpacing;
    let barX = width / 2 - totalWidth / 2;
    let barY = textBaseline - barH / 2;

    let clampedTimer = constrain(oatTimer, 0, oatTimerMax);
    let timePixelsRemaining = Math.ceil(clampedTimer);

    for (let i = 0; i < barCount; i++) {
        if (i < timePixelsRemaining) {
            image(
                timePixelImg,
                barX + i * (barW + pixelSpacing),
                barY
            );
        }
    }

    // right: game timer
    textAlign(RIGHT, TOP);
    text(Math.ceil(gameTime), width - uiPadding, uiPadding);
}



/**
 * KEYS
 */
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
    // no mouse
}
