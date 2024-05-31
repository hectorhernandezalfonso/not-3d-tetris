document.getElementById("pause").addEventListener("click", togglePause);
document.getElementById("restart").addEventListener("click", restartGame);

let intervalId;
let speed = 1000; // Initial speed, adjust as needed
let pause = false;

function timeController(speed) {
  clearInterval(intervalId);
  intervalId = setInterval(gameTick, speed);
}

function gameTick() {
  // Your game's main loop code
  console.log("Game tick");
}

function togglePause() {
  pause = !pause;
  let pauseButton = document.getElementById("pause");
  if (pause) {
    pauseButton.textContent = 'Continue';
    clearInterval(intervalId);
  } else {
    pauseButton.textContent = 'Pause';
    timeController(speed);
  }
}

function restartGame() {
  document.getElementById("myModalGameOver").classList.add("hidden");
  // Reset game state and restart the game loop
  timeController(speed);
  // Reset score and lines
  document.getElementById("score").textContent = '0';
  document.getElementById("lines").textContent = '0';
}

// Initial call to start the game
timeController(speed);
