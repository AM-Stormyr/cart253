/**
 * Speech! Speech!
 * Amanda Stormyr
 * 
 * Interactive speech playing interface! 
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
//The speech itself
const speech = ["Hi", "how", "are", "you?"];

//which sentence in the speech to display
let speechIndex = 0;


function setup() {
    createCanvas(600, 100);
}

/**
 * Displays the text
 */
function draw() {

    background(0);

    // Get the current line of the speech
    let currentLine = speech[speechIndex];

    // Display the line
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(currentLine, width / 2, height / 2);
    pop();

}

function mousePressed() {
    //next line
    speechIndex = speechIndex + 1;
    // handle speech
    if (speechIndex >= speech.length) {
        //Start over
        speechIndex = 0;
    }


}
