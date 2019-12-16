const highScoresList = document.getElementById("highScoresList"); 

// get Scores from localStorage {wihh return (name,score)}
const highScore = JSON.parse(localStorage.getItem('highScore'))||[];

// put the name , score in <li> which connected to ul in html file 
highScoresList.innerHTML = highScore.map(score =>{
      return '<li class="high-score">'+ score.name +" : "+ score.score +'</li>' 
}).join("");
