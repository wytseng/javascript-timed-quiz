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
    choices: ["event.stopPropagration", "event.preventDefault", "event.cancelBubble", "even.initEvent"],
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

// Assign global variable to DOM elements 
var questionEL = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("time-count");
var answerSheetEl = document.getElementById("answer-sheet");
var questionScreen = document.getElementById("question-screen");

// Global variables 
var totalTime = questions.length * 15;
var currentIndex = 0;
var answerCheck = [];
var timer;

// Starts the quiz, stars the coundown and renders the first question
function startQuiz() {
  var startScreen = document.getElementById("start-screen");
  // Hide starting screen, show question screen
  startScreen.setAttribute("class", "hide");
  questionScreen.removeAttribute("class", "hide");
  // Display timer time and start countdown
  timerEl.textContent = totalTime;
  startTimer();
  // Display first question
  renderQuestions();
}

// Handles timer countdown
function startTimer() {
  timer = setInterval( function() {
    if (totalTime > 0) {
      totalTime--;
      timerEl.textContent = totalTime;
    } else {
      endQuiz();
    }
  }, 1000)
}

// Checks and inserts whether the previous answer was correct
function renderAnswerCheck() {
  // Ignore if no questions have been answered
  if (answerCheck.length !== 0) {
    // Toggle answer sheet to show if first question has been answered
    if (answerCheck.length === 1) {
      answerSheetEl.removeAttribute("class", "hide");
    }
    // Display whether the answer to previous question was right or wrong
    var answerCheckEl = document.createElement("p");
    answerCheckEl.innerHTML = "Question " + (answerCheck.length) + ": " + answerCheck.slice(-1);
    answerSheetEl.appendChild(answerCheckEl);
  }
}

// Displays a question at currentIndex 
function renderQuestions() {
  // Clears the choices div if it is not empty 
  if (choicesEl.childNodes.length !== 0) {
    choicesEl.replaceChildren();
  }
  // Display question prompt and update completion progress
  questionEL.innerHTML = questions[currentIndex].question;
  document.getElementById("progress").innerHTML = currentIndex;
  // Get array of choices for the responding prompt
  var choices = questions[currentIndex].choices;
  // Loop through each choice and appen a button for the choice to the HTML
  for (var i = 0; i < choices.length; i++) {
    var choiceOption = choices[i];
    var choiceOptionEl = document.createElement("button");
    choiceOptionEl.setAttribute("class", "choice");
    choiceOptionEl.setAttribute("value", choiceOption);
    choiceOptionEl.innerHTML = (i+1) + ". " + choiceOption;
    choicesEl.appendChild(choiceOptionEl);
  }
  // Displays the checked answer up to the previous question
  renderAnswerCheck();
}

// Checks the chosen answer 
function checkAnswer(event) {
  // Checks if the element triggering the click is a choice class
  if (event.target.className === "choice") {
    // Checks if the answer is incorrect 
    if (event.target.value !== questions[currentIndex].answer) {
      totalTime -= 15;
      answerCheck.push("X");
      // No time score can be negative
      if (totalTime < 0 ) {
        totalTime = 0;
      }
      // Update the timer with the deducted time
      timerEl.textContent = totalTime;
    } else {
      answerCheck.push("O");
    }
    
    // End quiz if ran out of time, or if all questions completed
    // Else render the next question 
    if (totalTime <= 0 || currentIndex >= (questions.length-1)) {
      endQuiz();
    } else {
      currentIndex++;
      renderQuestions();
    }
  }
}

// Displays the ending screen and ends the quiz
function endQuiz() {
  // Stop timer countdown
  clearInterval(timer);
  // Update answer sheet with correctness of all questions
  renderAnswerCheck();
  // Show end screen, hide question screen
  questionScreen.setAttribute("class", "hide");
  document.getElementById("end-screen").removeAttribute("class", "hide");
  // Show student the total score
  document.getElementById("score").textContent = totalTime;
}

// Trigger saveHighscore if Enter key is pressed in input
function checkEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// Saves initials and score to local storage 
function saveHighscore() {
  var initials = document.getElementById("initials").value.trim();
  // Check if input is empty
  if (initials !== '') {
    // Get highscores from local storage, declares array if no record
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [] ;
    // Declare object with current initial and scores
    var newScore = {
      initials: initials,
      score: totalTime
    };
    
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // Redirect to highscores page
    window.location.href = "highscores.html";
  }
}

// Starts the quiz 
document.getElementById("start-quiz").addEventListener("click", startQuiz);
// Checks accuracy of the answer chosen
document.getElementById("choices").addEventListener("click", checkAnswer);
// Submit score on button click
document.getElementById("submit").addEventListener("click", saveHighscore);
// Checks the key for a keyup event within the input field
document.getElementById("initials").addEventListener("keyup", checkEnter);