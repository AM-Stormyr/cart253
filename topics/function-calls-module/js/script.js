/**
 * Poorly Portraid Cold Fries 
 * Amanda Stormyr
 * 
 * An invitation to examine one’s own reflections 
 * when encountering poorly executed art. 
 * This is an introspective experience!
 */

"use strict";

//* Creates the canvas for our still-life anti-masterpiece */
function setup() {
    // create canvas in the shape of long countertop
    createCanvas(1100, 677);
}

//* Drawing of french fries on a granite countertop */ 
function draw() {
    // The grey granite countertop
    background(180, 180, 180);

    // The yellow french fries
    noStroke();
    fill(250, 250, 0)
    rect(100, 100, 420, 50);
    rect(200, 200, 420, 50);
    rect(270, 420, 420, 50);

}
