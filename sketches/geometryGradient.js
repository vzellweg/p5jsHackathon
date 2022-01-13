// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let shapeW = 80;
let shapeH = shapeW;
let radius = shapeW / 2;
let gutter = radius;
let rate = 100;
let vertexRange = [...Array(9).keys()].slice(3).map(key => Number(key));
let secondsToRadians;
// Variables
// Colors
let  c1, c2;
let t = 0; // time variable
let polyIndex = 5; // polygon currently in use
let gradientCenter;
let polygonIndexMap = {};

function setup() {
  //createCanvas(800, 800, WEBGL);
  createCanvas(800, 800);
  c1 = color("#F3D1F4");
  c2 = color("#F5FCC1");
  secondsToRadians = PI/(180*60*60);
}

function draw() {
  // background(220, .22); 
  
  gradientCenter = (width / 2 * (sin(t) + 1 )/2) + (width / 4);
  setGradient(0, 0, gradientCenter, height, c1, c2, X_AXIS);
  setGradient(gradientCenter, 0, width - gradientCenter, height, c2, c1, X_AXIS);
  
  // Multi-directional gradient
  // setGradient(0, 0, width, gradientCenter, c1, c2, Y_AXIS);
  // setGradient(0, gradientCenter, width, height - gradientCenter, c2, c1, Y_AXIS);
  
  // 
  for (let i = 0; i*(shapeW+gutter)+ gutter + radius < width; i++)
  {
    for (let j = 0; j*(shapeH + gutter) + gutter + radius < (height - gutter); j++)
    {
      let x = i*(shapeW+gutter) + gutter;
      let y = j*(shapeH + gutter) + gutter;
      let curPolyIndex = polygonIndexMap[`${i}-${j}`];
      let radiusAtTime = radius * sin((i + 1) * (j + 1) +  t/ 4);
      
      // initialize with default polygon 
      if (typeof curPolyIndex == 'undefined') {
        console.log(`initializing map entry: ${polygonIndexMap[`${i}-${j}`]}`);
        curPolyIndex = polygonIndexMap[`${i}-${j}`] = polyIndex;
      }
      
      // draw polygon
      push();
      translate(x + radius, y + radius);
      stroke("rgba(0, 0, 0, 0.3)");
      strokeWeight(2);
      rotate(frameCount / rate);
      polygon(0, 0, radiusAtTime, vertexRange[curPolyIndex]);
      pop();

    }
  }
   t = t + 0.01; // update time
}

function mouseClicked() {
  const width = (shapeW+gutter);
  const height = (shapeH + gutter);
  const i = parseInt(mouseX / width);
  const j = parseInt(mouseY / height);
  
//   TODO: play sound?
  
  curPolyIndex = polygonIndexMap[`${i}-${j}`];
  polygonIndexMap[`${i}-${j}`] = incrementPolyIndex(curPolyIndex);
}

function incrementPolyIndex(index) {
  index++;
  if (index == vertexRange.length) {
    console.log(`returning 0, index: ${index} vertexRange: ${vertexRange}`);
    return 0;
  } else {
    console.log(`returning non-zero increment`)
    return index;
  }
}

// Taken from: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Taken from https://p5js.org/examples/color-linear-gradient.html
function setGradient(x, y, w, h, c1, c2, axis, alpha=.5) {
  noFill();
  colorMode(HSB);
  
  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let lerp = lerpColor(c1, c2, inter);
      let c = color(hue(lerp), saturation(lerp), brightness(lerp), alpha)
      // c= color(lerp)
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let lerp = lerpColor(c1, c2, inter);
      let c = color (hue(lerp), saturation(lerp), brightness(lerp), alpha)

      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
