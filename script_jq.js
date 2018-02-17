// What the hex is that?
// A hex code guessing game

// create variables/select objects required
var targetColor = "";
var targetPosition = "";
var numOfBoxes = 6; // for default medium level
var colorList = [];
var colorBoxes = $(".color");
// var text = $("h2.text");

// generate random hexcode colour
function randomColor() {
  for (var i = 0; i < numOfBoxes; i++) {
    colorList[i] = "#" + Math.random().toString(16).slice(2,8);
  };
}

NEED TO FIND OUT HOW TO SELECT BY INDEX/VARIABLE NAME IN JQUERY

// generate colours, apply to boxes and add relevant
// classes, attributes & event listeners
function setColors() {
  randomColor();
  targetPosition = Math.floor(Math.random()*(numOfBoxes));
  targetColor = colorList[targetPosition];
  $("h2.text").text(targetColor);
  $(".color").on("click", clicked).on("keypress", tabbed);
  $(".color").addClass("notClicked");
  for (var i = 0; i < $(".color").length; i++) {
    $(".colour").eq(i).css({
      background: colorList[i],
      opacity: 1
    });
    $(".colour").eq(i).attr("tabindex", i+1);
    // if (i === targetPosition) {
    //   $(".colour").eq(i).addClass("target");
    // };
  };
};


// colour click/tab functions
function clicked() {
  $(".color").removeClass("notClicked");
  $(".color").attr("tabindex", "-1");
  $(".color").off();
  if ($(this).hasClass("target")) {
    $("h2.text").text("yay, that's " + targetColor);
    $(this).removeClass("target");
    $(".color").css({
      background: targetColor,
      opacity: 1
    });
  } else {
    $("h2.text").text(targetColor + "  (that was " + colorList[i] + ")");
    $(this).css({
      background: targetColor,
      opacity: 0.15
    });
  };
}

function tabbed(event) {
  if (event.keyCode === 13) {
    $(".color").removeClass("notClicked");
    $(".color").attr("tabindex", "-1");
    $(".color").off();
    if ($(this).hasClass("target")) {
      $("h2.text").text("yay, that's " + targetColor);
      $(this).removeClass("target");
      $(".color").css({
        background: targetColor,
        opacity: 1
      });
    } else {
      $("h2.text").text(targetColor + "  (that was " + colorList[this] + ")");
      $(this).css({
        background: targetColor,
        opacity: 0.15
      });
    };
  };
}
// function fillerClicked() {
//   for (var i = 0; i < numOfBoxes; i++) {
//     if (colorBoxes[i] === this) {
//       $("h2.text").text("yay, that's " + targetColor);
//       $(".color").css({
//         background: targetColor,
//         opacity: 1
//       });
//       $(".color").removeClass("notClicked");
//       $(".color").attr("tabindex", "-1");
//       $(".color").off();
//     };
//   };
// }
//
// function fillerTabbed(event) {
//   if (event.keyCode === 13) {
//     for (var i = 0; i < numOfBoxes; i++) {
//       if (colorBoxes[i] === this) {
//         text.textContent = targetColor + "  (that was " + colorList[i] + ")";
//         colorBoxes[i].style.opacity = 0.15;
//         colorBoxes[i].classList.remove("notClicked");
//         colorBoxes[i].setAttribute("tabindex", "-1");
//       };
//     };
//   };
// }

// // change levels
// function changeLevel() {
//   colorBoxes = $(".color");
//   if (this.textContent === "easy") {
//     numOfBoxes = 3;
//   } else if (this.textContent === "medium") {
//     numOfBoxes = 6;
//   } else {
//     numOfBoxes = 9;
//   };
//   for (var i = 0; i < colorBoxes.length; i++) {
//     i < numOfBoxes ? colorBoxes[i].classList.remove("hide") : colorBoxes[i].classList.add("hide");
//   };
//   setColors();
// }
// var levelButtons = $("button.level");
// for (var i = 0; i < levelButtons.length; i++) {
//   levelButtons[i].on("click", changeLevel);
// };
//
// // New colours reset button
// $(".reset").on("click", setColors);
//
// // show/hide instructions
// $("button.instructions").on("click", function () {
//   $("div.instructions").toggle();
//   $("main").toggle();
//   setColors();
// });

// Run the game!
setColors();
