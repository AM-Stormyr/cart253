/**
 * Creating Variables Project
 * Amanda Stormyr
 * 
 * Drawing of a hole in a piece of cheese!
 */

"use strict";

/**
 * Canvas Dimensions 
*/
function setup() {
    createCanvas(480, 480);


}


/**
 * Drawing of a hole in a piece of cheese!
*/
function draw() {
    //drawing a yellow piece of cheese!
    background(250, 250, 0);

    push();
    noStroke();
    fill(0, 0, 0);
    ellipse(150, 150, 130);
    pop();

}