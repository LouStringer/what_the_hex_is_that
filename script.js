// What the hex is that?
// A hex code guessing game

const hexGame = (() => {
  // ----- SET UP
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

  const prepBoxes = () => {
    colorCircles.forEach(item => {
      item.addEventListener("click", selected);
      item.style.background = colorList[colorCircles.indexOf(item)];
      item.style.opacity = 1;
      item.classList.add("notClicked");
      item.setAttribute("tabindex", i+1);
    });
  }

  function setColors() {
    createColourCircles(numOfColors);
    randomColor();
    setTarget();
    prepBoxes();
  }

  // ----- PLAY!
  const removeEventLists = item => {
    item.removeEventListener("click", selected);
    item.classList.remove("notClicked", "target");
  }

  const selected = (event) => {
    if (colorCircles.indexOf(event.currentTarget) === targetPosition) {
      text.textContent = "yay, that's " + targetColor;
      colorCircles.forEach(item => {
        item.style.background = targetColor;
        item.style.opacity = 1;
        removeEventLists(item);
      });
    } else {
      text.textContent = `${targetColor} (that was ${colorList[colorCircles.indexOf(event.currentTarget)]})`;
      event.currentTarget.style.opacity = 0.15;
      removeEventLists(event.currentTarget);
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
