/**
 * Mr. Furious
 * Amanda Stormyr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

//Sky
let sky = {
    shade: 10,
    fill: {
        r: 160,
        g: 180,
        b: 200
    }
};

const rate = 20
// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 50,
        g: 0,
        b: 0
    }
};

let bird = {
    //Position and size
    x: 50,
    y: 50,
    speed: 10,
    //Colour
    fill: {
        r: 75,
        g: 40,
        b: 250
    }


};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
    frameRate(rate)
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    if (sky.b <= 0) {
        sky.b = 255
    }


    sky.fill.r = sky.fill.r - 2;
    sky.fill.g = sky.fill.g - 2;
    sky.fill.b = sky.fill.b - 2;


    background(sky.fill.r, sky.fill.g, sky.fill.b);

    mrFurious.fill.r = mrFurious.fill.r + 5;


    // Draw Mr. Furious as a coloured circle



    push();

    noStroke();

    mrFurious.x += random(1, 20);
    mrFurious.x -= random(1, 20);
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
    pop();





    //bird.x += bird.speed;
    bird.x += random(1, 20);
    bird.x -= random(1, 20);

    bird.y += random(1, 20);
    bird.y -= random(1, 20);


    //    if (bird.x += 50) {
    //         bird.x = 10
    //         bird.y = 10
    //     }

    // Draw annoying bird as a rectangle
    push()
    noStroke()
    fill(bird.fill.r, bird.fill.g, bird.fill.b)
    rect(bird.x, bird.y, 45, 25)
    pop();
}