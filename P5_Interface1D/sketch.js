/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February 7, 2025
  Marcelo Coelho

*/ /////////////////////////////////////


let displaySize = 47;   // how many pixels are visible in the game; not dynamic
let pixelSize = 30;     // how big each 'pixel' looks on screen

let playerOne;    // Adding 2 players to the game
let playerTwo;
let target;       // and one target for players to catch.

let display;      // Aggregates our final visual output before showing it on the screen

let controller;   // This is where the state machine and game logic lives

let collisionAnimation;   // Where we store and manage the collision animation

let score;        // Where we keep track of score and winner

let targets = []; // Array to store multiple targets


function setup() {

  createCanvas(windowWidth, windowHeight);  // Make canvas cover the entire browser window

  // createCanvas((displaySize*pixelSize), pixelSize);     // dynamically sets canvas size

  display = new Display(displaySize, pixelSize);        //Initializing the display

  playerOne = new Player(color('	#14d0f0'), parseInt(random(0,displaySize)), displaySize, 'rectangle');   // Initializing players
  playerTwo = new Player(color('	#ff83c3'), parseInt(random(0,displaySize)), displaySize, 'rectangle');

  for (let i = 0; i < 5; i++) {
    target = new Player(color('	#ffe552'), parseInt(random(0, displaySize)), displaySize, 'circle'); // Initializing target using the Player class
    targets.push(target); // Add each target to the array
  }

  collisionAnimation = new Animation();     // Initializing animation

  controller = new Controller();            // Initializing controller

  score = {max:3, winner:color(0,0,0)};     // score stores max number of points, and color 

}

function draw() {

  // start with a blank screen
  background('#B0EFEF');    

  // Position the 1D strip in the middle of the screen
  push();

  translate((windowWidth - displaySize * pixelSize) / 2, windowHeight / 2 - pixelSize / 2); 

  // Runs state machine at determined framerate
  controller.update();

  // After we've updated our states, we show the current one 
  display.show();  // Draw the 1D strip on top

  // Update the display buffer for each player
  playerOne.updateDisplay(display);
  playerTwo.updateDisplay(display);

  // Update the display buffer for each target
  for (let target of targets) {
    target.updateDisplay(display);
  }

  pop();

}


