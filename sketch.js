// new
let song;
let fft;
let numBins = 1024;
let smoothing = 0.8;
let button;

function preload() {
  //audio file from freesound https://freesound.org/people/multitonbits/sounds/383935/?
  // song = loadSound("assets/383935__multitonbits__bs_electricity-bass-2.wav");
  song = loadSound("assets/videoplayback.mp4");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  randomSeed(99);
  // noLoop();
  background(222, 184, 93);


  // new
  fft = new p5.FFT(smoothing, numBins);
  button = createButton("Play/Pause");
  button.position((width - button.width) / 2, height - button.height - 2);
  button.mousePressed(play_pause);

  rectMode(CENTER);
  // colorMode(HSB, 255);
  fft.setInput(song); 
}

function draw() {
  drawSky();
  drawSkyReflection();
  drawBuilding();
  drawWave();
}

//resize the window view
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//draw all the buildings
function drawBuilding() {
  //fill the colour of the building shapes with gradient
  fill(0);
  stroke(0);
  linearGradient(
    182, 450, //Start point
    182, 19, //End point
    color(92, 54, 53), //Start color
    color(32, 58, 75), //End color
  );

  //draw building reflection
  beginShape();
  vertex(219, 450)
  vertex(219, 614)
  vertex(194, 671)
  vertex(182, 755)
  vertex(172, 671)
  vertex(153, 614)
  vertex(153, 450)
  endShape();
  //draw right side building
  beginShape();
  vertex(width, 455)
  vertex(width - 800, 455)
  vertex(width - 563, 435)
  vertex(width - 524, 428)
  vertex(width - 480, 440)
  vertex(width - 332, 440)
  vertex(width - 300, 400)
  vertex(width - 290, 357)
  vertex(width - 270, 323)
  vertex(width - 250, 357)
  vertex(width - 224, 400)
  vertex(width - 220, 344)
  vertex(width - 204, 333)
  vertex(width - 200, 300)
  vertex(width - 187, 327)
  vertex(width - 170, 400)
  vertex(width - 155, 366)
  vertex(width, 418)
  endShape();

  filter(BLUR, 10);// blur these shape above

  //draw main building
  beginShape();
  noStroke();
  vertex(567, 450)
  vertex(548, 416)
  vertex(520, 400)
  vertex(433, 398)
  vertex(425, 374)
  vertex(435, 374)
  vertex(395, 345)
  vertex(386, 317)
  vertex(383, 345)
  vertex(365, 347)
  vertex(332, 327)
  vertex(290, 325)
  vertex(290, 300)
  vertex(262, 268)
  vertex(249, 234)
  vertex(241, 268)
  vertex(219, 300)
  vertex(219, 140)
  vertex(194, 103)
  vertex(182, 19)
  vertex(172, 103)
  vertex(153, 140)
  vertex(153, 335)
  vertex(132, 348)
  vertex(65, 345)
  vertex(35, 370)
  vertex(28, 416)
  vertex(0, 416)
  vertex(0, 450)
  endShape();
}

//This function is used to calculate the gradient of the buildings
function linearGradient(sX, sY, eX, eY, colorS, colorE) { //Input (start point x, y, end point x, y, start colour, end colour)
  let gradient = drawingContext.createLinearGradient(
    sX, sY, eX, eY
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;// fill the colour with gradient
}
//Reference：Kazuki Umeda. (2022). Easiest Gradient Effect - p5.js tutorial. https://www.youtube.com/watch?v=-MUOweQ6wac&t=62s

//This function is used to draw the gradual background sky
function drawSky() {
  // new
  noFill();
  // Loop through the upper half of the canvas height
  for (let y = 0; y < height / 2; y++) {
    // Loop through the upper half of the canvas height
    let inter = map(y, 0, height / 2, 0, 1);
    let c;// Variable to hold the color for the current line

    // Interpolate the color based on the position
    if (inter < 0.5) {
      // For the first half, interpolate from blue to yellow
      c = lerpColor(color(135, 206, 250), color(255, 255, 0), inter * 2); // Blue to Yellow
    } else {
      // For the second half, interpolate from yellow to orange
      c = lerpColor(color(255, 255, 0), color(255, 165, 0), (inter - 0.5) * 2); // Yellow to Orange
    }

    stroke(c); // Set the stroke color to the calculated color
    line(0, y, width, y);  // Draw a horizontal line across the width of the canvas at the current y position
  }
}

//This function is used to draw the grandual background sky's reflection
function drawSkyReflection() {
  // new 
  noFill();
  // Loop through the lower half of the canvas height
  for (let y = height / 2; y < height; y++) {
    // Calculate the interpolation factor from 0 to 1 for the current line
    let inter = map(y, height / 2, height, 0, 1);
    let c;// Variable to hold the color for the current line

    // Interpolate the color based on the position
    if (inter < 0.5) {
      // For the first half, interpolate from orange to yellow
      c = lerpColor(color(255, 165, 0), color(255, 255, 0), inter * 2); // Orange to Yellow
    } else {
      // For the second half, interpolate from yellow to blue
      c = lerpColor(color(255, 255, 0), color(135, 206, 250), (inter - 0.5) * 2); // Yellow to Blue
    }

    stroke(c); // Set the stroke color to the calculated color
    line(0, y, width, y);// Draw a horizontal line across the width of the canvas at the current y position
  }
}
//Reference of colour set: HTML color codes. (n.d.). HTML Color Codes. https://htmlcolorcodes.com/
//Reference of gradient: P5.js example - Vertical Gradient. (2021, January 24). Happy Coding. https://happycoding.io/tutorials/p5js/for-loops/vertical-gradient

//This function is used to draw the wave
function drawWave() {
  let waveCount = windowHeight / 40; //Dynamically adjusting based on window height
  let startY = 450; //Set the starting point
  let endY = height; //Ending Y-coordinate
  let waveHeight = 20; //Set the height of each wave

  // new
  let spectrum = fft.analyze();
  // print(spectrum);
  
  //loop through each wave
  for (let i = 0; i < waveCount; i++) {//calculate the Y position for the current wave
    // print(spectrum);
    // print(spectrum[floor(1024/waveCount)]);
    let y = startY + i * waveHeight;
    let randomAmplitude = ((i+50) * 911 % 5 +9);//Randomize the amplitude for varying wave heights
    let randomFrequency = ((i+50) * 911 % 71 + 30 )/2000; //Randomize the frequency for varing wave forms

    // Set the gradient color, from light blue to dark blue
    let c1 = lerpColor(color(173, 216, 230), color(0, 0, 139), i / waveCount);
    let c2 = lerpColor(color(173, 216, 230), color(0, 0, 139), (i + 1) / waveCount);
    //reference | p5.js. (n.d.). P5js.org. https://p5js.org/reference/#/p5/lerpColor

    // noFill();
    //draw each line within a wave
    for (let j = 0; j < 1; j++) {
      let inter = map(j, 0, waveHeight, 0, 1);//map the position within the wave to interpolate between colors
      //reference | p5.js. (n.d.-b). P5js.org. https://p5js.org/reference/#/p5/map
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      beginShape();//begin the shape for each wave line
      vertex(0, y);
      for (let x = 0; x <= width+9; x ++) { //calculate the wave offset
        let wave = sin(x * randomFrequency) * randomAmplitude ;//* (waveHeight - j) / waveHeight;
        vertex(x, y + wave); //Specified vertex
      }
      vertex(width, y);
      endShape();
    }
  }
}


// new
function play_pause() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    //we can use song.play() here if we want the song to play once
    //In this case, we want the song to loop, so we call song.loop()
    song.loop();
  }
}
