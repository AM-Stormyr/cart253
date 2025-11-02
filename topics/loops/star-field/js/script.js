/**
 * Star-field
 * Amanda Stormyr
 * 
 * Creating a star field using for-loops! 
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
const numStars = 100;

function setup() {
    createCanvas(400, 400);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);
    // starField();

    for (let i = 0; i < numStars; i++) {
        drawStar();

    }
    randomSeed(100);

    function drawStar() {
        const x = random(0, width);
        const y = random(0, height);
        const diameter = random(2, 5);

        //draw startfield
        // function starField{



        push();
        fill(250);
        noStroke();
        ellipse(x, y, diameter);
        pop();

    }
}