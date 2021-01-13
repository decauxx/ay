var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Detect if the game has started

var started = false;

// Create level-based system for the game

var level = 0

// Listen for a keydown and perform subsequent actions

$(document).keydown(function() {

  // Only continue if game hasn't been started (i.e. started = false)

  if (!started) {

    // Update the game level on screen

    $("#level-title").text("Level " + level);

    // Call nextSequence()

    nextSequence();

    // Prevent further calls of nextSequence() by logging that the game is started

    started = true;
  }
});
// Listen for a keydown and perform subsequent actions

$(".start-game").click(function() {

  // Only continue if game hasn't been started (i.e. started = false)

  if (!started) {

    // Update the game level on screen

    $("#level-title").text("Level " + level);

    // Call nextSequence()

    nextSequence();

    // Prevent further calls of nextSequence() by logging that the game is started

    started = true;
  }
});

// Listen to the button selected by the user and perform subsequent actions

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  // Log the user selection in the userClickedPattern array

  userClickedPattern.push(userChosenColour);

  // Play sound of the button the user selected

  playSound(userChosenColour);

  // Animate the button the user selected

  animatePress(userChosenColour);

  // Call checkAnswer() after the user has entered their selection, passing the index of the user's sequence (i.e. the game level)

  checkAnswer(userClickedPattern.length - 1)
});

// Check the user's answer

function checkAnswer(currentLevel) {

  // Compare the last answer in the user's sequence with that set by the game

  var userClickedIndex = userClickedPattern[currentLevel];
  var gameIndex = gamePattern[currentLevel];
  if (userClickedIndex === gameIndex) {
    console.log("success");

// Confirm the user has finished entering their sequence

    if (userClickedPattern.length === gamePattern.length) {

      // Call nextSequence () after 1000 ms

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

// Play 'wrong' sound

playSound("wrong");

// Display 'game over' on screen

$("body").addClass("game-over");

$("#level-title").text("Game Over, Press Any Key To Restart");

setTimeout(function() {
  $("body").removeClass("game-over");
}, 200);

startOver();
  }
}

function nextSequence() {

  // Once nextSequence() is triggered, reset the user's answers ready for the next level

  userClickedPattern = [];

  // Increment the level by 1 each time nextSequence() is called

  level++;

  // Update the game level on screen

  $("#level-title").text("Level " + level);

  // Generate a random number and use it to select a colour from buttonColours array

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate the random button using the id

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play the sound of the random button

  playSound(randomChosenColour);
}

// Animate a button for 100 ms

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Play sound associated with a button

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reset initial parameters at the end of the game

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
