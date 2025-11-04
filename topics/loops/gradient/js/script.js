/**
 * Gradient
 * Amanda Stormyr
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 300);

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0)

    let y = 0;

    randomSeed(0);
    for (let x = 0; x <= width; x++) {
        const shade = map(x, 0, width, 0, 255);

        push();
        stroke(shade);
        line(x, y, x, height);
        pop();

        y += random(0, 1);
    }

}