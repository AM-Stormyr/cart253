/**
 * Bubble Gummy Yummy Land
 * Amanda and Chloe
 * 
 * A beautiful pink landscape image with a little sheep with a sassy 
 * smile and two full moons
 */

"use strict";

/**
 * we're setting up our landscape canvas
*/
function setup() {
    createCanvas(920, 640)

}


/**
 * This is our drawing of an alien world with 2 moons, a tree and a regal looking sheep
*/
function draw() {

    //illustation of a pink night sky 
    background(250, 150, 180);

    drawMoonOne();
    drawMoonTwo();
    drawTree();
    drawHill();
    drawSheep();

}

/**These are our functions AKA landscape recipes */
//This is the big Blue moon 
function drawMoonOne() {
    push();
    noStroke();

    fill(100, 150, 250);
    ellipse(200, 200, 180);
    pop();
}
//This depicts the smaller purlpe moon
function drawMoonTwo() {
    push();
    noStroke();
    fill(200, 150, 250);
    ellipse(250, 250, 100);
    pop();
}
//Limegreen hill
function drawHill() {
    push();
    noStroke();
    fill("#32cd32");
    ellipse(460, 640, 1000, 300);
    pop();
}

//This is the tree trunk
function drawTree() {
    push();
    noStroke();
    fill(250, 250, 0);
    rect(700, 300, 80, 300);
    pop();

    // This is the crown of the tree
    push();
    noStroke();
    fill(250, 69, 0);
    ellipse(740, 300, 200, 250);
    pop();
}

function drawSheep() {
    //legs to stand
    push();
    strokeWeight(8);
    line(500, 480, 500, 560);
    pop();

    push();
    strokeWeight(8);
    line(480, 480, 480, 560);
    pop();

    //white fur
    push();
    noStroke();
    fill(250, 250, 250);
    ellipse(500, 500, 50);
    ellipse(450, 475, 75);
    ellipse(440, 500, 85);
    ellipse(500, 480, 50);
    pop();

    //little weirdo sheep's limegreen face
    push();
    noStroke();
    fill(200, 250, 0);
    ellipse(430, 490, 70);
    pop();

    //mouth
    push();
    strokeWeight(5);
    noFill();
    arc(410, 475, 100, 100, -12, 89);
    pop();

    //Beautiful black eyes staring right at ya!
    //right eye
    push();
    fill(0, 0, 0);
    ellipse(438, 490, 10, 12);
    pop();

    //left eye
    push();
    fill(0, 0, 0);
    ellipse(420, 490, 10, 12);
    pop();



}