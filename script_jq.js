// What the hex is that?
// A hex code guessing game

// create variables/select objects required
var targetColor = "";
var targetPosition = "";
var numOfBoxes = 6; // for default medium level
var colorList = [];

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
  $("h2.text").text(targetColor);
  $(".color").on("click", clicked);
  $(".color").on("keypress", tabbed);
  $(".color").removeClass("target").addClass("notClicked");
  $(".color").eq(targetPosition).addClass("target");
  $(".color").each(function (index) {
    $(this).css({
      background: colorList[index],
      opacity: 1
    });
    $(this).attr("tabindex", index+1);
  });
};

// colour click/tab functions
function clicked() {
  if ($(this).hasClass("target")) {
    $("h2.text").text("yay, that's " + targetColor);
    $(".color").css({
      background: targetColor,
      opacity: 1
    });
    $(".color").removeClass("notClicked");
    $(".color").attr("tabindex", "-1");
    $(".color").off();
  } else {
    $("h2.text").text(targetColor + "  (that was " + colorList[$(".color").index(this)] + ")");
    $(this).css({
      opacity: 0.15
    });
    $(this).removeClass("notClicked");
    $(this).attr("tabindex", "-1");
    $(this).off();
  };
}

function tabbed(event) {
  if (event.keyCode === 13) {
    if ($(this).hasClass("target")) {
      $("h2.text").text("yay, that's " + targetColor);
      $(".color").css({
        background: targetColor,
        opacity: 1
      });
      $(".color").removeClass("notClicked");
      $(".color").attr("tabindex", "-1");
      $(".color").off();
    } else {
      $("h2.text").text(targetColor + "  (that was " + colorList[$(".color").index(this)] + ")");
      $(this).css({
        opacity: 0.15
      });
      $(this).removeClass("notClicked");
      $(this).attr("tabindex", "-1");
      $(this).off();
    };
  }
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
  $(".color").each(function (index) {
    index < numOfBoxes ? $(this).removeClass("hide") : $(this).addClass("hide");
  });
  setColors();
};
$("button.level").on("click", changeLevel);

// New colours reset button
$(".reset").on("click", setColors);

// show/hide instructions
$("button.instructions").on("click", function () {
  $("div.instructions").toggle();
  $("main").toggle();
  setColors();
});

// Run the game!
setColors();
