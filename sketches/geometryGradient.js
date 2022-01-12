// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let shapeW = 80;
let shapeH = shapeW;
let radius = shapeW / 2;
let gutter = radius;
let rate = 100;
let vertexRange = [...Array(9).keys()].slice(3);
let secondsToRadians;
// Variables
// Colors
let  c1, c2;
let t = 0; // time variable
let polyIndex = 5;
let gradientCenter;

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
  
  // Messed up but kinda cool, can I give this a white outline?
  //setGradient(0, 0, gradientCenter, width, c1, c2, Y_AXIS);
  //setGradient(0, gradientCenter, height - gradientCenter, width, c2, c1, Y_AXIS);
  // 
  for (let i = 0; i*(shapeW+gutter)+ gutter + radius < width; i++)
  {
    for (let j = 0; j*(shapeH + gutter) + gutter + radius < (height - gutter); j++)
    {
      push();
      translate(i*(shapeW+gutter) + gutter + radius, j*(shapeH + gutter) + gutter + radius);
  stroke("rgba(0, 0, 0, 0.3)");
      strokeWeight(2);
      rotate(frameCount / rate);
      polygon(0, 0, radius * sin((i + 1) * (j + 1) +  t/ 4), vertexRange[polyIndex]);
//       fill(shapeW, shapeH, shapeW);
//       rotateX(frameCount * 0.01);
//       rotateY(frameCount * 0.01);
//       box(45, 45, 45);
      
      pop();

    }
  }
   t = t + 0.01; // update time
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
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
