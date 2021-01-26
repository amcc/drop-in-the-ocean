let step = 0;
let path = 0;
let dotSize = 1;
let colourStart = 160;
let colour = colourStart;
let colourRange = 60;
let bigSaturation = 10;
let littleSaturation = 0;
let brightness = 100;
let bigAlpha = 0.05;
let littleAlpha = 0.15;

let xPadding = 0;
let yPadding = 0;
const yShift = -600;
const xShift = -300;
const imageWidth = 1000;
const imageHeight = 1000;
const maxWidth = 500;
const maxHeight = 500;
let scale = 1;
let speed = 10;
let paths;

let map;

function preload() {
  // Get the most recent earthquake in the database
  let url = "./paths/allsofar.json";
  data = loadJSON(url, "json");

  map = loadImage("images/map-01.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  width > height ? (scale = height / maxHeight) : (scale = width / maxWidth);
  xPadding = (width - scale * maxWidth) / 2;
  yPadding = (height - scale * maxHeight) / 2;
  colorMode(HSB);
  background(0, 0, 5.5);
  noStroke();
  frameRate(60);
  paths = shuffle(data.paths);
  // console.log("paths", paths);
  // blendMode(EXCLUSION);
  image(
    map,
    xPadding + xShift,
    yPadding + yShift,
    imageWidth * scale,
    imageHeight * scale
  );
}

function draw() {
  if (paths[path]) {
    if (step <= paths[path].points.length - speed) {
      for (let i = 0; i < speed; i++) {
        if (paths[path].points[step]) {
          fill(colour, bigSaturation, brightness, bigAlpha);
          circle(
            xPadding + paths[path].points[step][0] * scale + xShift,
            yPadding + paths[path].points[step][1] * scale + yShift,
            dotSize * 3
          );
          fill(colour, littleSaturation, brightness, littleAlpha);
          circle(
            xPadding + paths[path].points[step][0] * scale + xShift,
            yPadding + paths[path].points[step][1] * scale + yShift,
            dotSize
          );
          step++;
          colour += colourRange / paths[path].points.length;
        }
      }
      // console.log("step ", step);
    } else {
      console.log("path is ", path, " and movement length is ", paths.length);
      if (path <= paths.length) {
        step = 0;
        colour = colourStart;
        path++;
        // colour += path * 2;
        console.log("colour", colour);
        console.log("path", path);
      }
    }
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
