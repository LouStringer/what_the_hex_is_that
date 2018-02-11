// What the hex is that?
// A hex code guessing game

// create variables/select objects required (for default medium level)
var targetColor = "";
var targetPosition = "";
var colorList = [];
var targetText = document.querySelector("p.target");
var colorBoxes = document.querySelectorAll("#medium .color");
var yayText = document.querySelector("p.yay");
var nayText = document.querySelector("p.nay");

// generate random hexcode colour - needed, or just put in the function below?
function randomColor() {
  return "#" + Math.random().toString(16).slice(2,8);
}

// generate colours, apply to boxes and add relevant classes & event listeners
function setColors() {
  targetColor = randomColor();
  targetText.classList.remove("hide");
  yayText.classList.add("hide");
  nayText.classList.add("hide");
  targetText.textContent = targetColor;
  yayText.textContent = "yay, that's " + targetColor;
  targetPosition = Math.floor(Math.random()*(colorBoxes.length));
  colorList = [];
  for (i = 0; i < colorBoxes.length; i++) {
    colorBoxes[i].classList.remove("target");
    if (i!=targetPosition) {
      colorList[i] = randomColor();
      colorBoxes[i].addEventListener("click", fillerClicked);
    } else {
      colorList[i] = targetColor;
      colorBoxes[i].classList.add("target"); // not needed if adding event listener directly here - but maybe nice to track target in dev tool
      colorBoxes[i].addEventListener("click", targetClicked);
    };
    colorBoxes[i].style.background = colorList[i];
  };
}

// colour clicks
function targetClicked() {
  targetText.classList.add("hide");
  yayText.classList.remove("hide");
  nayText.classList.add("hide");
  for (var i = 0; i < colorBoxes.length; i++) {
    colorBoxes[i].classList.remove("hide");
    colorBoxes[i].style.background = targetColor;
    colorBoxes[i].style.border = "0px";
    colorBoxes[i].removeEventListener("click", targetClicked);
    colorBoxes[i].removeEventListener("click", fillerClicked);
  };
}

function fillerClicked() {
  targetText.classList.add("hide");
  nayText.classList.remove("hide");
  for (var i = 0; i < colorBoxes.length; i++) {
    if (colorBoxes[i] === this) {
      nayText.textContent = targetColor + "  (that was " + colorList[i] + ")";
      colorBoxes[i].style.background = "white";
      colorBoxes[i].style.border = "1px solid" + colorList[i];
    };
  };
}

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
  colorBoxes = document.querySelectorAll("#easy .color");
  setColors();
})
mediumButton.addEventListener("click", function() {
  easyBoxes.classList.add("hide");
  mediumBoxes.classList.remove("hide");
  hardBoxes.classList.add("hide");
  colorBoxes = document.querySelectorAll("#medium .color");
  setColors();
})
hardButton.addEventListener("click", function() {
  easyBoxes.classList.add("hide");
  mediumBoxes.classList.add("hide");
  hardBoxes.classList.remove("hide");
  colorBoxes = document.querySelectorAll("#hard .color");
  setColors();
})

// New colours reset button
var resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", setColors);

// Run the game!
setColors();
