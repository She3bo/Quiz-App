const userName = document.getElementById("userName");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentStorage = localStorage.getItem("mostRecentStorage");

// Object Save name and his score || empty(in the first)

const highScore = JSON.parse(localStorage.getItem('highScore')) || [];

const maxHighScore = 5;
// put the result in finalScore input in the end page 

finalScore.innerText = mostRecentStorage;

// Disable inputUserName untile he write his name
userName.addEventListener("keyup", () => {
       console.log(userName.value);
       saveScoreBtn.disabled = !userName.value;
});

saveScore = (e) => {
       e.preventDefault();
       // Save Score and Name in the Score Object
       const Score = {
              // Score = Math.floor(Math.random(),100),
              score:mostRecentStorage,
              name: userName.value
       };
       // put the score object in highScore Object
       highScore.push(Score);

       // sort objects based on score (if b.score > a.score) return b.score else a.score
       highScore.sort( (a,b) => b.score - a.score);

       // save 5 object in the highscore array 
       highScore.splice(5);
       
       // save the name and his Score in String varialbe called "highScore" in localStorage 
       localStorage.setItem("highScore" , JSON.stringify(highScore));
       
       // when user click Save button go to Home Page
       window.location.assign("../index.html");

       console.log(highScore);

};



