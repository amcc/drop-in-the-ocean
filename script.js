// total points to make it a 24 hour movie
const dayFrameRate = 1904139 / (60 * 60 * 24);

let go = false;
let step = 0;
let day = 0;
let path = 0;
let dotSize = 1;
let colourStart = 160;
let colour = colourStart;
let colourRange = 60;
let bigSaturation = 0;
let littleSaturation = 0;
let brightness = 100;
let bigAlpha = 0.03;
let littleAlpha = 0.16;

let xPadding = 0;
let yPadding = 0;
const yShift = -700;
const xShift = -700;
const imageWidth = 1000;
const imageHeight = 1000;
const maxWidth = 500;
const maxHeight = 500;
let scale = 1;
let speed = 20;
let paths = [];
let loadedPaths = [];

// multiple graphics with text
// https://github.com/processing/p5.js/wiki/Global-and-instance-mode

let pathName = "pathname";

let map;

function preload() {
  // Get the most recent earthquake in the database
  loadJSON("./paths/all/plots1.json", "json", addData);
  loadJSON("./paths/all/plots2.json", "json", addData);
  loadJSON("./paths/all/plots3.json", "json", addData);
  loadJSON("./paths/all/plots4.json", "json", addData);
  loadJSON("./paths/all/plots5.json", "json", addData);
  loadJSON("./paths/all/plots6.json", "json", addData);
  loadJSON("./paths/all/plots7.json", "json", addData);
  loadJSON("./paths/all/plots8.json", "json", addData);

  map = loadImage("images/map-01.png");
}

function addData(data) {
  loadedPaths.push(...shuffle(data.paths));
  go = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);

  noStroke();
  print("framerate", dayFrameRate);
  frameRate(dayFrameRate);

  // console.log("paths", paths);
  // blendMode(EXCLUSION);
  // image(
  //   map,
  //   xPadding + xShift,
  //   yPadding + yShift,
  //   imageWidth * scale,
  //   imageHeight * scale
  // );

  // make UI
  resetAnimation();
  // text("Each point is a drop on one da4", 10, 40);
  slider = createSlider(1, 107, 1);
  slider.addClass("slider");
}

function draw() {
  // background(0, 0.0001);
  if (go) drawPaths();
  speed = slider.value();
  fill(0, 0, 5.5);
  rect(width - width / 4, 0, width / 4, 50);
  textAlign(RIGHT);
  fill(255);
  text("Day " + day, width - 10, 40);
}

function drawPaths() {
  if (step < paths[path].points.length) {
    if (step === 0) {
      fill(0, 0, 5.5);
      rect(width - width / 4, height - 80, width / 4, 100);
      textAlign(RIGHT);
      fill(255);
      text(
        paths[path].name.substring(paths[path].name.indexOf(".") + 1),
        width - 10,
        height - 40
      );
    }

    let loopLength =
      step + speed < paths[path].points.length
        ? speed
        : paths[path].points.length - step;
    for (let i = 0; i < loopLength; i++) {
      if (paths[path].points[step]) {
        let thisDot = dotSize;
        fill(colour, bigSaturation, brightness, bigAlpha);
        circle(
          xPadding + paths[path].points[step][0] * scale + xShift,
          yPadding + paths[path].points[step][1] * scale + yShift,
          thisDot * 3
        );
        fill(colour, littleSaturation, brightness, littleAlpha);
        circle(
          xPadding + paths[path].points[step][0] * scale + xShift,
          yPadding + paths[path].points[step][1] * scale + yShift,
          thisDot
        );
        step++;
        day++;
        colour += colourRange / paths[path].points.length;
      }
    }
    // console.log("step ", step);
  } else {
    // console.log("path is ", path, " and movement length is ", paths.length);
    if (path < paths.length - 1) {
      step = 0;
      colour = colourStart;
      path++;
    } else {
      resetAnimation();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetAnimation();
}

function resetAnimation() {
  width > height ? (scale = height / maxHeight) : (scale = width / maxWidth);
  xPadding = (width - scale * maxWidth) / 2;
  yPadding = (height - scale * maxHeight) / 2;
  day = 0;
  paths = shuffle(loadedPaths);
  path = 0;
  const total = paths.reduce((acc, path) => acc + path.points.length, 0);
  console.log("total number of days", total);
  background(0, 0, 5.5);
  fill(255);
  textFont("IBM Plex Mono");
  textSize(24);
  text("Gulfstream", 10, 40);
}

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

//1744738
//1753381
//1751513
//1753565
