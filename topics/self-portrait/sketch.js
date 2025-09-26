/**
 * Doggy and Me
 * AM Stormyr
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/

let pic1;

// Load the image.
function preload() {
  pic1 = loadImage('/assets/images/amandaSmall.png');
}
document.onmousemove = function (e) {
  console.log("X: " + e.x + ", Y: " + e.y);
};




function setup() {
  createCanvas(1430, 768);
}

function draw() {
  background(250, 200, 120);
  image(pic1, 250, 105, 826, 664)


  //white eyeball
  push;
  noStroke();
  fill(250, 250, 250)
  ellipse(797, 235, 25, 10)
  pop;

  //black pupil
  push;
  noStroke();
  fill(20, 170, 46)
  ellipse(797, 235, 10)
  pop;


  //black pupil
  push;
  noStroke();
  fill(0, 0, 0)
  ellipse(797, 235, 7)
  pop;



}
