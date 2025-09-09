/**
 * landscape
 * Amanda and Chloe
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(920, 640)

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {

    /** illustation of a pink night sky */
    background(250, 150, 180);

    drawMoonOne();
    drawMoonTwo();
    drawTree();
    drawHill();

}

function drawMoonOne() {
    push()
    noStroke()
    fill(100, 150, 250);
    ellipse(200, 200, 180)
    pop()
}

function drawMoonTwo() {
    push();
    noStroke();
    fill(200, 150, 250);
    ellipse(250, 250, 100);
    pop();
}
function drawHill() {
    push()
    noStroke()
    fill("#32cd32")
    ellipse(460, 640, 1000, 300);
    pop()
}

function drawTree() {
    push()
    noStroke()
    fill(250, 250, 0)
    rect(700, 300, 80, 300)
    pop()

    push()
    noStroke()
    fill(0, 0, 0)
    ellipse(740, 300, 200, 250)
    pop()
}