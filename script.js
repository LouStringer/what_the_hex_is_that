// What the hex is that?
// A hex code guessing game

// create variables/select objects required (for default medium level)
var noOfBoxes = 6;
var targetColor = "";
var targetPosition = Math.floor(Math.random()*(noOfBoxes));
var colorList = [];
var targetText = document.querySelector("p.target");
var targetText = document.querySelector("p.target");
var colorBoxes = document.querySelectorAll("#medium .color");

// generate random hexcode colour - needed, or just put in the function below?
function randomColor() {
  return "#" + Math.random().toString(16).slice(2,8);
}

// create function to generate colours and apply to boxes
function setColors() {
  targetColor = randomColor();
  targetText.textContent = targetColor;
  for (i = 0; i < noOfBoxes; i++) {
      if (i!=targetPosition) {
      colorList[i] = randomColor();
    } else {
      colorList[i] = targetColor;
    }
  }
  for (i = 0; i < noOfBoxes; i++) {
    colorBoxes[i].style.background = colorList[i];
  }
}

// Run the game!
setColors();

// colour clicks
// event listeners on all Boxes
// target/not target clicks

// change levels
// buttons
var easyButton = document.querySelector("button.easy");
var mediumButton = document.querySelector("button.medium");
var hardButton = document.querySelector("button.hard");
// Boxes
var easyBoxes = document.querySelector("#easy");
var mediumBoxes = document.querySelector("#medium");
var hardBoxes = document.querySelector("#hard");
// event listeners
easyButton.addEventListener("click", function() {
  easyBoxes.classList.remove("hide");
  mediumBoxes.classList.add("hide");
  hardBoxes.classList.add("hide");
  noOfBoxes = 3;
  colorBoxes = document.querySelectorAll("#easy .color");
  setColors();
})
mediumButton.addEventListener("click", function() {
  easyBoxes.classList.add("hide");
  mediumBoxes.classList.remove("hide");
  hardBoxes.classList.add("hide");
  noOfBoxes = 6;
  colorBoxes = document.querySelectorAll("#medium .color");
  setColors();
})
hardButton.addEventListener("click", function() {
  easyBoxes.classList.add("hide");
  mediumBoxes.classList.add("hide");
  hardBoxes.classList.remove("hide");
  noOfBoxes = 9;
  colorBoxes = document.querySelectorAll("#hard .color");
  setColors();
})

// get new colours button working
var resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", setColors);
