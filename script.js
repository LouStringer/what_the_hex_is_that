// What the hex is that?
// A hex code guessing game

const hexGame = (() => {
  // create variables/select objects required
  let targetColor = "";
  let targetPosition = "";
  let numOfColors = 6; // for default medium level
  let colorCircles = [];
  let colorList = [];

  // Grab DOM objects
  const main = document.querySelector("main");
  const text = document.querySelector("h2.text");
  const colorSection = document.querySelector("section.colorCircles")
  const levelButtons = document.querySelectorAll("button.level");
  const resetButton = document.querySelector(".reset");
  const instructionsSection = document.querySelector("section.instructions");
  const instructionsButton = document.querySelector("button.instructions");

  const createColourCircles = numOfColors => {
    colorSection.innerHTML = `<button class="color"></button>`.repeat(numOfColors);
    colorCircles = Array.from(document.querySelectorAll(".color"));
  }

  // generate random hexcode colour
  const randomColor = () => {
    for (let i = 0; i < numOfColors; i++) {
      colorList[i] = `#${Math.random().toString(16).slice(2,8)}`;
    };
  }

  // generate colours, apply to boxes and add relevant classes, attributes & event listeners
  const setTarget = () => {
    targetPosition = Math.floor(Math.random()*(numOfColors));
    targetColor = colorList[targetPosition];
    text.textContent = targetColor;
    colorCircles[targetPosition].classList.add("target");
  }

  function prepBoxes() {
    for (var i = 0; i < numOfColors; i++) {
      colorCircles[i].addEventListener("click", colorClicked);
      colorCircles[i].addEventListener("keypress", colorTabbed);
      colorCircles[i].style.background = colorList[i];
      colorCircles[i].style.opacity = 1;
      colorCircles[i].classList.add("notClicked");
      colorCircles[i].setAttribute("tabindex", i+1);
      };
  }

  function setColors() {
    createColourCircles(numOfColors);
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
    const i = colorCircles.indexOf(this)
    if (i === targetPosition) {
      text.textContent = "yay, that's " + targetColor;
      for (box of colorCircles) {
        box.style.background = targetColor;
        box.style.opacity = 1;
        removeEventLists(box);
      };
    } else {
      text.textContent = targetColor + "  (that was " + colorList[i] + ")";
      colorCircles[i].style.opacity = 0.15;
      removeEventLists(colorCircles[i]);
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
      numOfColors = 3;
    } else if (this.textContent === "medium") {
      numOfColors = 6;
    } else {
      numOfColors = 9;
    };
    for (var i = 0; i < colorCircles.length; i++) {
      i < numOfColors ? colorCircles[i].classList.remove("hide") : colorCircles[i].classList.add("hide");
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
