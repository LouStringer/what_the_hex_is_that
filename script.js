// What the hex is that?
// A hex code guessing game

// create variables/select objects required
var targetColor = "";
var targetPosition = "";
var numOfBoxes = 6; // for default medium level
var colorList = [];
var colorBoxes = document.querySelectorAll(".color");
var text = document.querySelector("p.text");

// generate random hexcode colour
function randomColor() {
  return "#" + Math.random().toString(16).slice(2,8);
}

// generate colours, apply to boxes and add relevant classes & event listeners
function setColors() {
  colorList = [];
  targetColor = randomColor();
  text.textContent = targetColor;
  targetPosition = Math.floor(Math.random()*(numOfBoxes));
  for (i = 0; i < numOfBoxes; i++) {
    if (i!=targetPosition) {
      colorList[i] = randomColor();
      colorBoxes[i].addEventListener("click", fillerClicked);
    } else {
      colorList[i] = targetColor;
      colorBoxes[i].addEventListener("click", targetClicked);
    };
    colorBoxes[i].style.background = colorList[i];
    colorBoxes[i].style.border = "2px solid colorList[i]";
  };
}

// colour clicks
function targetClicked() {
  for (var i = 0; i < numOfBoxes; i++) {
    text.textContent = "yay, that's " + targetColor;
    colorBoxes[i].style.background = targetColor;
    colorBoxes[i].style.border = "0px";
    colorBoxes[i].removeEventListener("click", targetClicked);
    colorBoxes[i].removeEventListener("click", fillerClicked);
  };
}

function fillerClicked() {
  for (var i = 0; i < numOfBoxes; i++) {
    if (colorBoxes[i] === this) {
      text.textContent = targetColor + "  (that was " + colorList[i] + ")";
      colorBoxes[i].style.background = "white";
      colorBoxes[i].style.border = "1px solid" + colorList[i];
    };
  };
}

// change levels
function changeLevel() {
  colorBoxes = document.querySelectorAll(".color");
  if (this.textContent === "easy") {
    numOfBoxes = 3;
  } else if (this.textContent === "medium") {
    numOfBoxes = 6;
  } else {
    numOfBoxes = 9;
  };
  for (var i = 0; i < colorBoxes.length; i++) {
    i < numOfBoxes ? colorBoxes[i].classList.remove("hide") : colorBoxes[i].classList.add("hide");
  };
  setColors();
}
var levelButtons = document.querySelectorAll("button.level");
for (var i = 0; i < levelButtons.length; i++) {
  levelButtons[i].addEventListener("click", changeLevel);
};

// New colours reset button
document.querySelector(".reset").addEventListener("click", setColors);

// Run the game!
setColors();
