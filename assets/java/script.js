var highScoresLink = document.getElementById("high-scores-link");
var timer = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var questionText = document.getElementById("question-text");
var optionA = document.getElementById("option-a");
var optionB = document.getElementById("option-b");
var optionC = document.getElementById("option-c");
var optionD = document.getElementById("option-d");
var check = document.getElementById("check-answer");
var finalScore = document.getElementById("final-score");
var submitScore = document.getElementById("submit-score-button");
var resetButton = document.getElementById("reset-button");
var returnToHomeButton = document.getElementById("return-to-home-button");
var questionCardCard = document.getElementById("question-card-card");
var submitCardCard = document.getElementById("submit-card-card");
var highScoreCardCard = document.getElementById("high-score-card-card");
var introCardCard = document.getElementById("intro-card-card");
var timerCard = document.getElementById("timer-card");
var submitText = document.getElementById("submit-text");
var highScoreList = document.getElementById("high-score-list");
var li = document.createElement("li");

var questions = [
    {
        questionText: "<p>What does HTML stand for?</p>",
        optionA: "<button class='answer-button' id='A' onclick='checkAnswer(event)'>Hyper Text Markup Language</button>",
        optionB: "<button class='answer-button' id='B' onclick='checkAnswer(event)'>How To Make Lasagna</button>",
        optionC: "<button class='answer-button' id='C' onclick='checkAnswer(event)'>Hold This, My Love <3</button>",
        optionD: "<button class='answer-button' id='D' onclick='checkAnswer(event)'>Has The Microwave Leaked?</button>",
        answer: "A"
    },{
        questionText: "<p>What does CSS Stand for</p>",
        optionA: "<button class='answer-button' id='A' onclick='checkAnswer(event)'>Cold Simmer Sauce</button>",
        optionB: "<button class='answer-button' id='B' onclick='checkAnswer(event)'>Cascading Style Sheets</button>",
        optionC: "<button class='answer-button' id='C' onclick='checkAnswer(event)'>Crocodiles, Snakes, & Sharks</button>",
        optionD: "<button class='answer-button' id='D' onclick='checkAnswer(event)'>Can Seashells Swim?</button>",
        answer: "B"
    },{
        questionText: "<p>Javascript _________?</p>",
        optionA: "<button class='answer-button' id='A' onclick='checkAnswer(event)'>adds content on the webpage</button>",
        optionB: "<button class='answer-button' id='B' onclick='checkAnswer(event)'>adds styling to the webpage</button>",
        optionC: "<button class='answer-button' id='C' onclick='checkAnswer(event)'>adds interactivity to the webpage</button>",
        optionD: "<button class='answer-button' id='D' onclick='checkAnswer(event)'>adds secrets to the webpage</button>",
        answer: "C"
    },{
        questionText: "<p>CSS files are linked in what part of the HTML file.</p>",
        optionA: "<button class='answer-button' id='A' onclick='checkAnswer(event)'>header</button>",
        optionB: "<button class='answer-button' id='B' onclick='checkAnswer(event)'>main</button>",
        optionC: "<button class='answer-button' id='C' onclick='checkAnswer(event)'>footer</button>",
        optionD: "<button class='answer-button' id='D' onclick='checkAnswer(event)'>head</button>",
        answer: "D"
    },{
        questionText: "<p>JavaScript can be fun</p>",
        optionA: "<button class='answer-button' id='A' onclick='checkAnswer(event)'>Yes</button>",
        optionB: "<button class='answer-button' id='B' onclick='checkAnswer(event)'>No</button>",
        optionC: "<button class='answer-button' id='C' onclick='checkAnswer(event)'>No!</button>",
        optionD: "<button class='answer-button' id='D' onclick='checkAnswer(event)'>NOOOOOOO!!!!!!</button>",
        answer: "A"
    }
];

var score = 0;
var currentQuestion = 0;
var questionCount = questions.length -1;
var secondsLeft = 60;
var timeLeft = 60;
var trackEndGame = 0;

highScoresLink.addEventListener("click", viewScores);

startButton.addEventListener("click", startQuiz);

submitScore.addEventListener("click", viewScores);

returnToHomeButton.addEventListener("click", returnHome);

resetButton.addEventListener("click", clearStorage);

function displayQuestion() {
    var thisQuestion = questions[currentQuestion];
    questionText.innerHTML = thisQuestion.questionText;
    optionA.innerHTML = thisQuestion.optionA;
    optionB.innerHTML = thisQuestion.optionB;
    optionC.innerHTML = thisQuestion.optionC;
    optionD.innerHTML = thisQuestion.optionD;
};

function enterInitials() {
    timerCard.style.display = "none";
    introCardCard.style.display = "none";
    questionCardCard.style.display = "none";
    submitCardCard.style.display = "block";
    highScoreCardCard.style.display = "none";
    var scorePercent = ((score / 5) * 100)
    submitText.innerHTML = "All Done!"
    finalScore.innerHTML = "You finished with a score of " + scorePercent + "%!";
    
};

function timesUp() {
    timerCard.style.display = "none";
    introCardCard.style.display = "none";
    questionCardCard.style.display = "none";
    submitCardCard.style.display = "block";
    highScoreCardCard.style.display = "none";
    var scorePercent = ((score / 5) * 100)
    submitText.innerHTML = "Time's Up!"
    finalScore.innerHTML = "You finished with a score of " + scorePercent + "%!";
}
//Having trouble adding more than 1 li element and populating with localStorage.setItem/getItem
function viewScores() {
    localStorage.setItem("userScore", ((score / 5) * 100));
    var initialsStore = document.getElementById("initials").value;
    localStorage.setItem("userInitials", initialsStore);
    function add() {
        highScoreList.appendChild(li);
        li.innerHTML = "<p>" + localStorage.getItem('userInitials') + " " + localStorage.getItem('userScore') + "</p>"
    };
    add();
    introCardCard.style.display = "none";
    questionCardCard.style.display = "none";
    submitCardCard.style.display = "none";
    highScoreCardCard.style.display = "block";

};

function returnHome () {
    timerCard.style.display = "none";
    introCardCard.style.display = "block";
    questionCardCard.style.display = "none";
    submitCardCard.style.display = "none";
    highScoreCardCard.style.display = "none";
    currentQuestion = 0;
    score = 0;
    secondsLeft = 60;
    timeLeft = 60;
    trackEndGame = 1;
};

function nextQuestion() {
    if (currentQuestion >= questionCount) {
        enterInitials();
    } else {
        currentQuestion++;
        displayQuestion();
    };
};

function checkAnswer(event) {
    //took SO long to get this!!  Event target!!
    check.style.display = "block";
    var thisQuestion = questions[currentQuestion];
    if (event.target.id == thisQuestion.answer) {
        score++;
        check.innerHTML = "Correct!"
    } else {
        timeLeft = timeLeft - 10;
        check.innerHTML = "Incorrect!"
    }
    nextQuestion()
};

function countDown() {
    timer.innerHTML = "Time Left: " + timeLeft;
    var timerLeft = setInterval(function() {
        timeLeft--;
        timer.innerHTML = "Time Left: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerLeft);
            timesUp();
        } else if (trackEndGame === 1) {
            clearInterval(timerLeft);
            trackEndGame = 0;
        }
    }, 1000);
};

function startQuiz() {
   introCardCard.style.display = "none";
   questionCardCard.style.display = "block";
   timerCard.style.display = "block";
   check.style.display = "none";
   countDown();
   displayQuestion();
   
};



function clearStorage() {
    localStorage.clear();
    highScoreList.removeChild(li);
}