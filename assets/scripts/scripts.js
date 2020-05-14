// array for questions and choices
var questions =[{
    question: "Which JavaScript operator do you use to find the type of a JavaScript variable?",
    choiceA : " + ",
    choiceB : " = ",
    choiceC : " typeof ",
    choiceD : " array ",
    correct : " typeof "
},

{
    question: "Which is the correct bracket notations for array?",
    choiceA : " ( ) ",
    choiceB : " [ ] ",
    choiceC : " { } ",
    choiceD : " < > ",
    correct : " [ ] "
},

{
    question: "Which one is not a function?",
    choiceA : " alert() ",
    choiceB : " setInterval() ",
    choiceC : " var ",
    choiceD : " sendMessage() ",
    correct : " var "
},

{
    question: "Which one of these answers do not belong in the same group?",
    choiceA : " parseInt()",
    choiceB : " var ",
    choiceC : " let ",
    choiceD : " const ",
    correct : " parseInt()"
}
];



// ScoreKeeper
var scoreKeeper = 0;

// creating viewScores tab
var viewScores = document.createElement("button");
viewScores.textContent = "View Score";
$("#viewScores").click(checkFinish);
document.getElementById("viewScores").appendChild(viewScores);
viewScores.setAttribute("class" , "btn btn-success");


// creating a button
var playButton = document.createElement("button");
playButton.textContent = "Let's Play!";
$("#playButton").click(playGame);
document.getElementById("playButton").appendChild(playButton);
playButton.setAttribute("class" , "btn btn-success");



// timer
var timeLeft = 60;
var timer = document.createElement("p");
var timeChecker;
document.getElementById("timer").appendChild(timer);
timer.setAttribute("class" , "btn btn-success");

function timerFunction () {
    timeChecker = setInterval(function() {
    timer.textContent = timeLeft + " seconds left";
    timeLeft--;
    if (timeLeft <0) {
        clearInterval(timeChecker);
        viewScore();

}
}, 1000);



}

// renderCounter
var renderCount = 0;

// userAnswer Storage
var userAnswer;

// play Function
function playGame () {

renderQuestion();
renderQuestionText();
timerFunction();

}

// setting variables for answer choices
var q;
var a1;
var a2;
var a3;
var a4;

// buttion Creation
function renderQuestion () {

q = document.createElement("h4");

document.getElementById("question").appendChild(q);
q.setAttribute("class", "btn btn-dark");

a1 = document.createElement("button");
$("#answer1").click(checkAnswer);
document.getElementById("answer1").appendChild(a1);
a1.setAttribute("class", "btn btn-primary");

a2 = document.createElement("button");
$("#answer2").click(checkAnswer);
document.getElementById("answer2").appendChild(a2);
a2.setAttribute("class", "btn btn-primary");


a3 = document.createElement("button");
$("#answer3").click(checkAnswer);
document.getElementById("answer3").appendChild(a3);
a3.setAttribute("class", "btn btn-primary");

a4 = document.createElement("button");
$("#answer4").click(checkAnswer);
document.getElementById("answer4").appendChild(a4);
a4.setAttribute("class", "btn btn-primary");
}

// Text inside the buttons
function renderQuestionText () {
q.textContent = questions[renderCount].question;
a1.textContent = questions[renderCount].choiceA;
a2.textContent = questions[renderCount].choiceB;
a3.textContent = questions[renderCount].choiceC;
a4.textContent = questions[renderCount].choiceD;
}

// check for answers
function checkAnswer () {
    
if ( this.textContent == questions[renderCount].correct) {
scoreKeeper = 50 + scoreKeeper;
} else {
timeLeft = timeLeft - 10;
}
// counting and time checking
if (timeLeft <= 0 || renderCount === questions.length -1) {
viewScore();
clearInterval(timeChecker);
} else {
renderCount++
renderQuestionText();


}


}

// View Scores
var scoreBoard = [];
var scoreBoardDisplayLimiter = 0;
function viewScore() {

 if (scoreBoardDisplayLimiter < 1) {    

 if (localStorage.getItem("scoreBoard")) {
     scoreBoard = JSON.parse(localStorage.getItem("scoreBoard"));
 }

// check to see if the user finished the game
if (renderCount === questions.length -1 || timeLeft <= 0) {

var initial = prompt("Your score is: " + scoreKeeper + " Please put your initial.");
scoreBoard.push((scoreBoard.length + 1) + ". " +initial + "  scored    " + scoreKeeper);

}

var orderedList = document.getElementById("orderedList");
for (var i = 0; i < scoreBoard.length; i++) {
var list = document.createElement("li");
    list.innerHTML = scoreBoard[i];
    orderedList.appendChild(list);
    list.setAttribute("class", "score");
}
    localStorage.setItem("scoreBoard",JSON.stringify(scoreBoard));
}
scoreBoardDisplayLimiter++;
}

function checkFinish () {
    renderCount = 0;
    timeLeft = 60;

    viewScore();

}

