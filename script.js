let step = 0;
let path = 0;
let dotSize = 1;
let colour = 200;
let alpha = 0.2;

let xPadding = 0;
let yPadding = 0;
const maxWidth = 1000;
const maxHeight = 1000;
let scale = 1;
let speed = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  width > height ? (scale = height / maxHeight) : (scale = width / maxWidth);
  xPadding = (width - scale * maxWidth) / 2;
  yPadding = (height - scale * maxHeight) / 2;
  colorMode(HSB);
  background(0, 0, 6);
  noStroke();
  frameRate(60);
}

function draw() {
  fill(colour, 50, 100, alpha);
  if (movement[path]) {
    if (step <= movement[path].length - speed) {
      if (movement[path][step])
        for (let i = 0; i < speed; i++) {
          circle(
            xPadding + movement[path][step][0] * scale,
            yPadding + movement[path][step][1] * scale,
            dotSize
          );
          step++;
        }
      // console.log("step ", step);
    } else {
      console.log(
        "path is ",
        path,
        " and movement length is ",
        movement.length
      );
      if (path <= movement.length) {
        step = 0;
        path++;
        colour += path * 5;
        console.log("colour", colour);
        console.log("path", path);
      }
    }
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
