// Array of question-choices-answer objects
var questions = [
  {
    question: "What is not a way to declare a variable in JavaScript?",
    choices: ["var", "let", "const", "list"],
    answer: "list",
  },
  {
    question: "What is the default behavior where all the variable and function declaration are moves to the top called?" ,
    choices: ["bubbling", "debugging", "capturing", "hoisting"],
    answer: "hoisting",
  },
  {
    question: "What line must you include to prevent a form button from auto-refreshing the page.",
    choices: ["event.preventDefault", "event.stopPropagration", "event.cancelBubble", "even.initEvent"],
    answer: "event.preventDefault",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["&lt;script&gt;", "&lt;javascript&gt;", "&lt;scripting&gt;", "&lt;js&gt;"],
    answer: "&lt;script&gt;",
  },
  {
    question: "How do you declare a function on JavaScript?",
    choices: ["function myFunction()", "var myFunction = function()", "both works"],
    answer: "both works",
  },
];

// gobal variables
var questionEL = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("time-count");
var answerSheetEl = document.getElementById("answer-sheet");
var questionScreen = document.getElementById("question-screen");

var totalTime = questions.length * 15;
var currentIndex = 0;
var answerCheck = [];
var timer;

// starts the quiz and timer 
function startQuiz() {
  var startScreen = document.getElementById("start-screen");

  startScreen.setAttribute("class", "hide");
  questionScreen.removeAttribute("class", "hide");

  timerEl.textContent = totalTime;
  startTimer();

  renderQuestions();
}

// function handling the timer countdown 
function startTimer() {
  timer = setInterval( function() {
    if (totalTime > 0) {
      totalTime--;
      timerEl.textContent = totalTime;
    } else {
      endGame();
    }
  }, 1000)
}

function renderAnswerCheck() {
  if (answerCheck.length !== 0) {
    if (answerCheck.length === 1) {
      answerSheetEl.removeAttribute("class", "hide");
    }
    var answerCheckEl = document.createElement("p");
    answerCheckEl.innerHTML = "Question " + (answerCheck.length) + ": " + answerCheck.slice(-1);
    answerSheetEl.appendChild(answerCheckEl);
  }
}

// displays the question at currentIndex 
function renderQuestions() {
  // clears the choices div if it is not empty 
  if (choicesEl.childNodes.length !== 0) {
    choicesEl.replaceChildren();
  }

  questionEL.innerHTML = questions[currentIndex].question;
  document.getElementById("question-number").innerHTML = currentIndex;

  var choices = questions[currentIndex].choices;
  for (var i = 0; i < choices.length; i++) {
    var choiceOption = choices[i];
    var choiceOptionEl = document.createElement("button");
    choiceOptionEl.setAttribute("class", "choice");
    choiceOptionEl.setAttribute("value", choiceOption);
    choiceOptionEl.setAttribute("id", "choice");
    choiceOptionEl.innerHTML = (i+1) + ". " + choiceOption;
    choicesEl.appendChild(choiceOptionEl);
  }
  renderAnswerCheck();
}

// checks the answer 
function checkAnswer(event) {
  // check if the element triggering the click is a choice element
  if (event.target.id === "choice") {
    // checks if the answer is correct 
    if (event.target.value !== questions[currentIndex].answer) {
      totalTime -= 15;
      answerCheck.push("X");
      if (totalTime < 0 ) {
        totalTime = 0;
      }
    } else {
      answerCheck.push("O");
    }

    timerEl.textContent = totalTime;
  
    if (totalTime <= 0 || currentIndex >= (questions.length-1)) {
      endGame();
    } else {
      currentIndex++;
      renderQuestions();
    }
  }
}

// displays the ending screen 
function endGame() {
  clearInterval(timer);

  renderAnswerCheck();
  questionScreen.setAttribute("class", "hide");
  document.getElementById("end-screen").removeAttribute("class", "hide");

  document.getElementById("score").textContent = totalTime;
}

function checkEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

function saveHighscore() {
  var initials = document.getElementById("initials").value.trim();

  if (initials !== '') {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [] ;
  
    var newScore = {
      initials: initials,
      score: totalTime
    };
  
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}

// Starts the quiz 
document.getElementById("start-quiz").addEventListener("click", startQuiz);

// Checks accuracy of the answer chosen
document.getElementById("choices").addEventListener("click", checkAnswer);

// Submit score
document.getElementById("submit").addEventListener("click", saveHighscore);
document.getElementById("initials").addEventListener("keyup", checkEnter);