// What the hex is that?
// A hex code guessing game

const hexGame = (() => {
  // create variables/select objects required
  var targetColor = "";
  var targetPosition = "";
  var numOfBoxes = 6; // for default medium level
  var colorList = [];

  // Grab DOM objects
  let main = document.querySelector("main");
  let text = document.querySelector("h2.text");
  let colorBoxes = Array.from(document.querySelectorAll(".color"));
  let levelButtons = document.querySelectorAll("button.level");
  let resetButton = document.querySelector(".reset");
  let instructionsDiv = document.querySelector("div.instructions");
  let instructionsButton = document.querySelector("button.instructions");

  // generate random hexcode colour
  function randomColor() {
    for (var i = 0; i < numOfBoxes; i++) {
      colorList[i] = "#" + Math.random().toString(16).slice(2,8);
    };
  }

  // generate colours, apply to boxes and add relevant
  // classes, attributes & event listeners
  function setTarget() {
    targetPosition = Math.floor(Math.random()*(numOfBoxes));
    targetColor = colorList[targetPosition];
    text.textContent = targetColor;
    colorBoxes[targetPosition].classList.add("target");
  }

  function prepBoxes() {
    for (var i = 0; i < numOfBoxes; i++) {
      colorBoxes[i].addEventListener("click", colorClicked);
      colorBoxes[i].addEventListener("keypress", colorTabbed);
      colorBoxes[i].style.background = colorList[i];
      colorBoxes[i].style.opacity = 1;
      colorBoxes[i].classList.add("notClicked");
      colorBoxes[i].setAttribute("tabindex", i+1);
      };
  }

  function setColors() {
    randomColor();
    setTarget();
    prepBoxes();
  }

  // colour click/tab functions
  function removeEventLists(box) {
    box.removeEventListener("click", colorClicked);
    box.removeEventListener("keypress", colorTabbed);
    box.setAttribute("tabindex", "-1");
    box.classList.remove("notClicked", "target");
  }

  function colorClicked() {
    const i = colorBoxes.indexOf(this)
    if (i === targetPosition) {
      text.textContent = "yay, that's " + targetColor;
      for (box of colorBoxes) {
        box.style.background = targetColor;
        box.style.opacity = 1;
        removeEventLists(box);
      };
    } else {
      text.textContent = targetColor + "  (that was " + colorList[i] + ")";
      colorBoxes[i].style.opacity = 0.15;
      removeEventLists(colorBoxes[i]);
    };
  }

  function colorTabbed(event) {
    if (event.keyCode === 13) {
      colorClicked.call(this);
    };
  }

  // change levels
  function changeLevel() {
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

  for (var i = 0; i < levelButtons.length; i++) {
    levelButtons[i].addEventListener("click", changeLevel);
  };

  // new colours reset button
  resetButton.addEventListener("click", setColors);

  // show/hide instructions
  function instructions() {
    instructionsDiv.classList.toggle("hide");
    main.classList.toggle("hide");
    setColors();
  }
  instructionsButton.addEventListener("click", instructions)

  // return function to initialise game
  return {
    setColors
  }
})();


// Run the game!
hexGame.setColors();
