/**
 * Tony's Shooting Laser Beams
 * Amanda Stormyr
 * 
 * A depiction of Tony "the finger" shooting laser beams
 * through his eyes. 
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

    //finger
    push()
    noStroke()
    fill(250, 180, 180)
    ellipse(220, 400, 280, 550)
    pop()


    //left eye
    push()
    noStroke()
    fill(0, 0, 0)
    ellipse(190, 210, 17, 20)
    pop()

    //right eye
    push()
    noStroke()
    fill(0, 0, 0)
    ellipse(250, 210, 17, 20)
    pop()

    //mouth
    push()
    noStroke()
    fill(0, 0, 0)
    ellipse(220, 255, 30, 34)
    pop()

    //Laser beam right eye
    push()
    stroke("red")
    line(250, 210, 0, 400)
    pop()

    //Laser beam right eye
    push()
    stroke("red")
    line(190, 210, 0, 340)
    pop()




}