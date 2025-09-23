/**
 * Circle Master
 * The Super Trouper
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
    x: 200,
    y: 200,
    size: 100,
    fill: "#ff0000", // red to start
    fills: {
        noOverlap: "#ff0000", // red for no overlap
        overlap: "#00ff00" // green for overlap
    }
};

const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
    background("#aaaaaa");

    // // Move user circle
    moveUser();


    // Draw the user and puck
    drawPuck();
    drawUser();


}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
}



// Check overlap

// Calculate distance between circles' centres
const d = dist(user.x, user.y, puck.x, puck.y);
// Check if that distance is smaller than their two radii, 
// because if it is, they are overlapping by the amazing
// power of geometry!
const overlap = (d < user.size / 2 + puck.size / 2);
// Set fill based on whether they overlap


if (overlap) {
    puck.fill = puck.fills.overlap;
}
else {
    puck.fill = puck.fills.noOverlap;
}


/**
 * Displays the user circle
 */
function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);
    pop();
}





