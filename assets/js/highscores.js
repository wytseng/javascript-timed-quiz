//  declare global highscores container
var highscores = [];

// inputs the list of highscores in order from highest to lowest
function renderScoreboard() {
  highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  if (highscores.length !== 0) {
    var scoreBoardEl = document.getElementById("scoreboard");
    highscores = highscores.sort(function(a, b) {return b.score - a.score});
    for (var i=0; i < highscores.length; i++) {
      let currentScore = highscores[i];
      var scoreEl = document.createElement("li");
      scoreEl.setAttribute("class", "score")
      scoreEl.textContent = currentScore.initials + " - " + currentScore.score;
      scoreBoardEl.appendChild(scoreEl);
    }
  }
}

// clears the local storage and the highscore variable 
function clearHighscores() {
  if (highscores.length !== 0) {
    highscores = [];
    localStorage.removeItem('highscores');
  }
  // refreshes the window to display the updated empty scoreboard
  window.location.reload();
}

// clears local storage and regreshes page when clear button is clicked
document.getElementById("clear").addEventListener("click", clearHighscores);

// run on page load
renderScoreboard();