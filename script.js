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
