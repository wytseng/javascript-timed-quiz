// Declare global highscores (array)
var highscores;

// Inputs the list of highscores in order from highest to lowest
function renderScoreboard() {
  // Input local storage data, or assign empty array if empty
  highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  if (highscores.length !== 0) {
    var scoreBoardEl = document.getElementById("scoreboard");
    // Sort highscores from high to low
    highscores = highscores.sort(function(a, b) {return b.score - a.score});
    // Inser list item for each highscore
    for (var i=0; i < highscores.length; i++) {
      let currentScore = highscores[i];
      var scoreEl = document.createElement("li");
      scoreEl.setAttribute("class", "score")
      scoreEl.textContent = currentScore.initials + " - " + currentScore.score;
      scoreBoardEl.appendChild(scoreEl);
    }
  }
}

// Clears the local storage and the highscore variable 
function clearHighscores() {
  if (highscores.length !== 0) {
    highscores = [];
    localStorage.removeItem('highscores');
  }
  // Refreshes the window to display the updated empty scoreboard
  window.location.reload();
}

// Clears local storage and regreshes page when clear button is clicked
document.getElementById("clear").addEventListener("click", clearHighscores);

// Init
renderScoreboard();