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

// create function to generate colours and apply to boxes
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
      colorBoxes[i].classList.add("target");
      colorBoxes[i].addEventListener("click", targetClicked);
    }
    colorBoxes[i].style.background = colorList[i];
  }
}

// Run the game!
setColors();

// colour clicks
function targetClicked() {
  targetText.classList.add("hide");
  yayText.classList.remove("hide");
  nayText.classList.add("hide");
  for (var i = 0; i < colorBoxes.length; i++) {
    colorBoxes[i].classList.remove("hide");
    colorBoxes[i].style.background = targetColor;
    colorBoxes[i].removeEventListener("click", targetClicked);
    colorBoxes[i].removeEventListener("click", fillerClicked);
  };
}

function fillerClicked() {
  nayText.classList.remove("hide");
  var index = Array.prototype.slice.call(el.parentElement.children).indexOf(el)
  // nayText.textContent = "nope, that's " + colorList[];
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
