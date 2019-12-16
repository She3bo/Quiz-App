const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-question"));
const progressText = document.getElementById("progressText");
const hudScore = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const loader = document.getElementById("loader");
const game = document.getElementById("game");



let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res=>{
    return res.json();
}).then(loadedQuestions=>{
    console.log(loadedQuestions.results);
    // load all questions with all answer form API and put in questions array
    // we target to make file like (question.json)
    questions = loadedQuestions.results.map(loadedQuestions =>{
        // formattedQuestion is object which will contain the question with its answer in one loop
        const formattedQuestion = {
            // question variable which will conatin the question from API 
            question: loadedQuestions.question
        };
        
        // Array will contain the incorrect answer from api 
        const answerChoises = [...loadedQuestions.incorrect_answers];
        
        //create random value to put the correct answer in random index

        formattedQuestion.answer = Math.floor(Math.random()*3)+1;

        // (splice) Add to the last index in Array the correct Answer from Api 
        answerChoises.splice(
            formattedQuestion.answer - 1
            ,0
            ,loadedQuestions.correct_answer
        );

        // Add All qustion in formattedQuestion Object 
        answerChoises.forEach((choice,index)=>{
            formattedQuestion["choice"+(index+1)] = choice;
        })
        
        // return the object whish you extracted from API Information and go to the anthor Object 
        return formattedQuestion;

    });
    // when you load All Qustion and answers from Api then start the game
    starGame();

}).catch(err =>{
      console.error(err)
});



let questionCounter, score, availableQuestion = [], currentQuestion = {}, acceptingQuestion = false;
const maxQuestion = 10;

// Start for New Game 
starGame = () => {
    questionCounter = 0;
    score = 0;
    // take a copy from questions and put in availableQuestion to modigy on it
    availableQuestion = [...questions];

    // calling for New Question Function
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");

};

getNewQuestion = () => {
    // if the questions end save the score in localStorage and go to end Page
    if (availableQuestion.length === 0 || questionCounter >= maxQuestion) {
        localStorage.setItem("mostRecentStorage",score);
        return window.location.assign("../Html/end.html");
    }
    questionCounter++;
    progressText.innerText = "Question"+questionCounter+"/"+maxQuestion;
    progressBar.style.width = ((questionCounter/maxQuestion)*100)+'%';

    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestion.splice(questionIndex, 1);
    acceptingQuestion = true;
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
       // if (!accptingQuestion) return;
       // accptingQuestion = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        if(classToApply=='correct'){
            score+=10;
        }
        hudScore.innerText = score;
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    });
});