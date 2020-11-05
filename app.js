/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
'use strict';
const STORE = {
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  view:"home",
  // 5 or more questions are required
  questions: [
    {
      question: 'Which of the following is not a number type variable?',
      answers: [
        'How_many_Avengers = 6',
        'Number_of_releases = 23.0',
        'Thors_age = 1500',
        "Non-avenger = 'Loki'"
      ],
      correctAnswer: "Non-avenger = 'Loki'"
    },
    {
      question: 'Just like every movie, there is a script; which is the most popular coding language that ends with Script?',
      answers: [
        'EcmaScript',
        'TypeScript',
        'JavaScript',
        'Scriptures'
      ],
      correctAnswer: 'JavaScript'
    },
    {
      question: 'Iron man is the richest Avenger. An example of boolean type variable could be _?',
      answers: [
        'True or False',
        'Yes or No',
        '"True or False"',
        'Positive or Negative'
      ],
      correctAnswer: 'True or False'
    },
    {
      question: 'The second most sold Avenger movie is "Black Panther". This data type is a _?',
      imgSrc : "img/blackpanther.png",
      answers: [
        'sting',
        'string',
        'spring',
        'sprint'
      ],
      correctAnswer: 'string'
    },
     {
      question: 'The idea that Hulk is the strongest avenger is false. What data type variable is this?',
      answers: [
        'data',
        'boolean',
        'string',
        'method'
      ],
      correctAnswer: 'boolean'
    }
  ],
questionNumber: 0,
  currentScore: 0,
  quizStart: false
};
//this function increments the question number as the user goes through each question.
function questionTracker() {
  STORE.questionNumber++;
}

//function increments the user score when answered correctly.
function scoreTracker() {
  STORE.currentScore++;
}

//Function for quiz's landing page. 
function homePage() {
  
  const homePageHTML = 
  `<header role="banner" aria-live="polite">
  <h1 class="title-homepage">Avengers Coding Quiz</h1>
  <h2 class="secondary-text">Are ready to join the Avengers and save the world with coding?</h2>
  </header>
  <main id="home-page" aria-live="polite">
  <form id="start-page">
  <fieldset id ="starter-button">
  <input type="button" id="start-quiz" aria-label="Start Quiz Button" value="Let's Go!"></input>
  </fieldset>
  </form> 
  </main>`

  $('body').html(homePageHTML);
}

//Function for quiz's end or results page. 
function resultPage(){
  
  const resultPageHTML = 
  `<header role="banner" aria-live="polite">
  <h1 class="title-results">Final Results</h1>
  <h2 class="final-score">Your final score was ${STORE.currentScore} out of 5!</h2>`
  
  const restartButton = 
  `
  <main id="results-page" aria-live="polite">
  <form id="end-page">
  <fieldset id="restart-button">
  <input type="button" id="restart-quiz" aria-label="Restart Quiz Button" value="Click to Try Again!"></input>
  </fieldset>
  </form>
  </main>`

  if (STORE.currentScore >= 3) {
    $('body').html(resultPageHTML + `<h3 class="above-3"><img class="finalpics" src="https://media.giphy.com/media/ckeHl52mNtoq87veET/giphy.gif"/><a href="https://classvisa.com/booknow">Congrats!! Click to join other Coding Super heros!</a></h3></header>` + restartButton);
  }
  else if (STORE.currentScore < 3) {
    $('body').html(resultPageHTML + `<h3 class="below-3"><img class="losepics" src="https://media.giphy.com/media/LOoaJ2lbqmduxOaZpS/giphy.gif"/>You couldn't save the world with your code!</h3></header>` + restartButton);
  }
}

//Function renders for all questions and/or answer choices, and his or her progress.
function questionGenerator() {
  $("body").addClass("question").removeClass("home")
  
  const questionText = 
  `<main class = "main-quiz" aria-live="polite">
  <form id="quiz-form">
  <fieldset id="quiz-questions-answers">
  <legend id="question-text">${STORE.questions[STORE.questionNumber].question}</legend>`

  const answerText = STORE.questions[STORE.questionNumber].answers.map(answer => {
    return `
    <ul>
    <li>
    <input type="radio" name="answer-selections" aria-label="Select Answer" value="${answer}"><label for=${answer}>${answer}</label>
    </input>
    </li>
    </ul>`
  }); 

  const quizButtons = 
  `<input type="button" id="next-question" aria-label="Next Question Button" value="Next Question"></input>
  <input type="button" id="submit-button" aria-label="Submit Answer Button" value="Submit Answer"></input>
  <input type="button" id="show-results" aria-label="Show Results Button" value="Show Me My Results!"></input>`

  const infoTrackers = 
  `
  <p id="question-tracker">Question ${STORE.questionNumber + 1} out of 5</p>
  <p id="score-tracker">Your current score is: ${STORE.currentScore} out of 5</p>
  </fieldset>
  </form>
  </main>`

$('body').html(questionText + answerText.join('') + quizButtons + infoTrackers)
$("#next-question").hide(); 
$("#show-results").hide();
}

//this function toggles the buttons on every question page depending on user interaction.
function buttonSwitch() {
  
  $("#unanswered").remove();
  $("#submit-button").hide();
  
  if (STORE.questionNumber < 5) {
      $("#next-question").show();
    }
  else if (STORE.questionNumber === 5) {
    $("#show-results").show();
  }
}

//this function checks the user's answers, if they are right or wrong. If they don't answer, they cannot progress.


  
function answerChecker() {
  
  $("#unanswered").remove();
  const answerChoice = $("input[name='answer-selections']:checked").val();
  if (answerChoice === undefined) {
    $("#next-question").before(`<p id="unanswered">Please select an answer.</p>`);
  }
  else if (answerChoice === STORE.questions[STORE.questionNumber].correctAnswer) {
    questionTracker();
    scoreTracker(); 
    buttonSwitch();
    $("#next-question").before(`<p id="correct"> <img src="https://media.giphy.com/media/4a5U94rJlX40QMfox0/giphy.gif"/> That is correct! Your current score is ${STORE.currentScore} out of 5.</p>`)
  }
  else if (answerChoice !== STORE.questions[STORE.questionNumber].correctAnswer) {
    questionTracker(); 
    buttonSwitch(); 
    $("#next-question").before(`<p id="incorrect"> <img src="https://media.giphy.com/media/10H4by255F2UsU/giphy.gif"/>That is incorrect! The correct answer is: ${STORE.questions[STORE.questionNumber - 1].correctAnswer}. 
    Your current score is ${STORE.currentScore} out of 5.</p>`)
  }
};


//this function implements button functionality into the DOM to work in tandem with the quizRender() function. 
function buttonInitialize() {

$(document).on("click", "#start-quiz", function(event) {
    STORE.quizStart = true; 
    quizRender(); 
  }); 

$(document).on("click","#submit-button", function(event) {
  answerChecker();
  });

$(document).on("click","#next-question", function(event) {
  quizRender();
  });

$(document).on("click","#show-results", function(event) {
  quizRender();
  });

$(document).on("click","#restart-quiz", function(event) {
  STORE.quizStart = false;
  STORE.questionNumber = 0;
  STORE.currentScore = 0;
  homePage();
  });

quizRender();
}

//this function renders the appropriate quiz HTML page based on several checks such as progress, button interactions... 
function quizRender() {
  
  if (STORE.quizStart === false) {
    homePage();
  }
  else if (STORE.questionNumber >= 0 && STORE.questionNumber < 5) {
    questionGenerator();
  }
  else if (STORE.questionNumber >= 5) {
    resultPage(); 
    scoreTracker();
  }
}

//loads button functionality to the DOM.
$(buttonInitialize);
