/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(440, 440)

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("black")

    push()
    noStroke()
    fill(250, 180, 180)
    ellipse(220, 220, 170, 200)
    pop()

    push()
    noStroke()
    fill(0, 0, 0)
    ellipse(190, 210, 17, 20)
    pop()

    push()
    noStroke()
    fill(0, 0, 0)
    ellipse(250, 210, 17, 20)
    pop()

    push()
    stroke("red")
    line(250, 210, 0, 400)
    pop()

    push()
    stroke("red")
    line(190, 210, 0, 340)
    pop()

}