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
  for (var i = 0; i < numOfBoxes; i++) {
    colorList[i] = "#" + Math.random().toString(16).slice(2,8);
  };
}

// generate colours, apply to boxes and add relevant
// classes, attributes & event listeners
function setColors() {
  randomColor();
  targetPosition = Math.floor(Math.random()*(numOfBoxes));
  targetColor = colorList[targetPosition];
  text.textContent = targetColor;
  for (var i = 0; i < numOfBoxes; i++) {
    if (i!=targetPosition) {
      colorBoxes[i].addEventListener("click", fillerClicked);
      colorBoxes[i].addEventListener("keypress", fillerTabbed);
    } else {
      colorBoxes[i].addEventListener("click", targetClicked);
      colorBoxes[i].addEventListener("keypress", targetTabbed);
    };
    colorBoxes[i].style.background = colorList[i];
    colorBoxes[i].style.opacity = 1;
    colorBoxes[i].classList.add("notClicked");
    colorBoxes[i].setAttribute("tabindex", i+1);
    };
}

// colour click/tab functions
function targetClicked() {
  for (var i = 0; i < numOfBoxes; i++) {
    text.textContent = "yay, that's " + targetColor;
    colorBoxes[i].style.background = targetColor;
    colorBoxes[i].style.opacity = 1;
    colorBoxes[i].classList.remove("notClicked");
    colorBoxes[i].setAttribute("tabindex", "-1");
    colorBoxes[i].removeEventListener("click", targetClicked);
    colorBoxes[i].removeEventListener("click", fillerClicked);
    colorBoxes[i].removeEventListener("keypress", targetTabbed);
    colorBoxes[i].removeEventListener("keypress", fillerTabbed);
  };
}

function targetTabbed(event) {
  if (event.keyCode === 13) {
    for (var i = 0; i < numOfBoxes; i++) {
      text.textContent = "yay, that's " + targetColor;
      colorBoxes[i].style.background = targetColor;
      colorBoxes[i].style.opacity = 1;
      colorBoxes[i].classList.remove("notClicked");
      colorBoxes[i].setAttribute("tabindex", "-1");
      colorBoxes[i].removeEventListener("click", targetClicked);
      colorBoxes[i].removeEventListener("click", fillerClicked);
      colorBoxes[i].removeEventListener("keypress", targetTabbed);
      colorBoxes[i].removeEventListener("keypress", fillerTabbed);
    };
  };
}

function fillerClicked() {
  for (var i = 0; i < numOfBoxes; i++) {
    if (colorBoxes[i] === this) {
      text.textContent = targetColor + "  (that was " + colorList[i] + ")";
      colorBoxes[i].style.opacity = 0.15;
      colorBoxes[i].classList.remove("notClicked");
      colorBoxes[i].setAttribute("tabindex", "-1");
    };
  };
}

function fillerTabbed(event) {
  if (event.keyCode === 13) {
    for (var i = 0; i < numOfBoxes; i++) {
      if (colorBoxes[i] === this) {
        text.textContent = targetColor + "  (that was " + colorList[i] + ")";
        colorBoxes[i].style.opacity = 0.15;
        colorBoxes[i].classList.remove("notClicked");
        colorBoxes[i].setAttribute("tabindex", "-1");
      };
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
