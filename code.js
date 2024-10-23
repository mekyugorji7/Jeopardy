/*
Images in this code are from:
[1]Jeopardy! Logo: https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AJeopardy!_logo.png&psig=AOvVaw0sKC8cOpE4fGKMWqli6JBi&ust=1652368727866000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIjL-4ng1_cCFQAAAAAdAAAAABAD
[2]Jeopardy Music MP3: https://archive.org/details/tvtunes_29826
[3]Jeopardy Incorrect Answer Buzzer Sound: https://www.soundboard.com/sb/jeopardy_show_sounds
[4]
*/

//Set-Up
setStyle("questionBox", "font-family: ITC Korrina ; text-shadow: 2px 2px black");
setStyle("whatIsLabel", "font-family: ITC Korrina ; text-shadow: 2px 2px black");
setStyle("timer", "font-family: ITC Korrina ; text-shadow: 2px 2px black");

//var tables=[];
var answer="";
var playerInput = "";
var team1Amount = 0;
var team2Amount = 0;
var team3Amount = 0;
var blocks = 20;
var category = 0;
var t=15;
var price = 0;
 var j=0;
var elementClicked = "";
 var turn = 1;
 var teamNum = 0;
 
onEvent("playButton", "click", function( ) {
  teamNum = getNumber("teamsDropdown");
  setScreen("gameScreen");
  showTurn();
  
   for (var i=1; i<=teamNum; i++)
  {
    showElement("team"+i+"Score");
  }
 
});


//Money Buttons



onEvent("playAgainButton", "click", function( ) {
answer="";
playerInput = "";
team1Amount = 0;
team2Amount = 0;
team3Amount = 0;
blocks = 20;
category = 0;
t=15;
price = 0;
j=0;
elementClicked = "";
turn = 1;
teamNum = 0;

setProperty("team1Score", "text", "Team 1:\n$"+team1Amount);
setProperty("team2Score", "text", "Team 2:\n$"+team2Amount);
setProperty("team3Score", "text", "Team 3:\n$"+team3Amount);

for(var b=1; b<=4; b++)
{
  showElement(b+"-200");
  showElement(b+"-400");
  showElement(b+"-600");
  showElement(b+"-800");
  showElement(b+"-1000");
}
for(var c=1; c<=teamNum; c++)
  {
    setProperty("team"+c+"Score", "text-color", rgb(230, 171, 23, 0.81));
  }
setScreen("homeScreen");
  
});


function showTurn() {

  for(var c=1; c<=teamNum; c++)
  {
    setProperty("team"+c+"Score", "text-color", rgb(230, 171, 23, 0.81));
  }
  setProperty("team"+turn+"Score", "text-color", "white");
}

onEvent("gameScreen", "click", function(event) {
   elementClicked = event.targetId;
  if (elementClicked.length < 7){
    blocks--;
   question(getCategory(elementClicked),getPrice(elementClicked));
  
}
});

function getCategory(id) {
  category = id.substring(0, 1);
  category = parseInt(category);
 console.log(category);
 return category;
}


function getPrice(id) {
 price = id.substring(2,id.length);
 price = parseInt(price);
console.log(price);
return price;
}

//Trivia Questions
var categories = getColumn("Jeopardy Questions", "Category");
var questions = getColumn("Jeopardy Questions", "Question");
var answers = getColumn("Jeopardy Questions", "Answer");


function question (category, price)
{

 setScreen("questionScreen");
 setTimeout(function() {
   playSound("assets/Jeopardy---1997---Think-Music.mp3", false);
 }, 6000);
 

     if(price==200)
  {
    setQuestion((category*5)-5);
    setAnswer((category*5)-5);
  }
    if(price==400)
  {
    setQuestion((category*5)-4);
    setAnswer((category*5)-4);
  }
    if(price==600)
  {
    setQuestion((category*5)-3);
    setAnswer((category*5)-3);
  }
    if(price==800)
  {
    setQuestion((category*5)-2);
    setAnswer((category*5)-2);
  }
    if(price==1000)
  {
    setQuestion((category*5)-1);
    setAnswer((category*5)-1);
  }
  
  
 
}
 


 function setQuestion(number)
 {
   setProperty("timer", "text", +t+"s");
    setTimeout(function() {
    showElement("answerButton");
    showElement("whatIsLabel");
    showElement("answerInput");
    showElement("timer");
    
     timedLoop(1000, function() {
     if(t==0)
     {
       stopTimedLoop();
       stopSound("assets/Jeopardy---1997---Think-Music.mp3");
       incorrectAnswer();
       t=15;
     }
     t--;
     setProperty("timer", "text", +t+"s");
   });
   
   }, 6000);
    
    
   
   if(questions[number].length<50)
   {
     setProperty("questionBox", "text", "\n\n"+questions[number]);
   }
   else if((questions[number].length<90)&&(questions[number].length>=50))
   {
   setProperty("questionBox", "text", "\n"+questions[number]);
   }
   else
   {
    setProperty("questionBox", "text", questions[number]);
   }

   playSpeech(questions[number], "male", "English (UK)");
     
   
 }
 function setAnswer(number)
 {
   
   answer = answers[number];
 }
 
//Answer Button

onEvent("answerButton", "click", function(event) {
  stopSound("assets/Jeopardy---1997---Think-Music.mp3");
  playerInput = getText("answerInput");
  playerInput = playerInput.toLowerCase();
  
  if (playerInput.includes(answer))
  {  
    stopTimedLoop();
    correctAnswer();
    t=15;
  }
    else
  {
  stopTimedLoop();
   incorrectAnswer();
   t=15;
  }
  


});





function correctAnswer() {
   
 
   playSound("assets/category_achievements/vibrant_game_achievement_3.mp3", false);
   playSound("assets/category_points/vibrant_game_game_flip_ui_touch.mp3", false);
    setProperty("answerInput", "background-color", "green");
    hideElement("answerButton");
    showElement("moneyLabel");
    setProperty("moneyLabel", "text-color", "green");

   timedLoop(0.05, function() {
     setProperty("moneyLabel", "text", "+$"+j);
    if(j===price)
      {
      j=0;
      stopTimedLoop();
      }
      else{
      j++;
      }
        });
      
    
    //play sound
      setTimeout(function() {
        setProperty("answerInput", "background-color", "rgb(15, 35, 150)");
         setProperty("answerInput", "text", "");
        setProperty("answerInput", "placeholder", "Answer here");
        hideElement("moneyLabel");
        hideElement("answerButton");
        hideElement("whatIsLabel");
        hideElement("answerInput");
       setScreen("gameScreen");
    
  
  if (turn == 1)
  {
    team1Amount += price;
    if(team1Amount<0)
    {
      setProperty("team1Score", "text", "Team 1:\n-$"+(team1Amount)*-1);
    }
    else
    {
       setProperty("team1Score", "text", "Team 1:\n$"+team1Amount);
    }
  }
  if (turn == 2)
  {
    team2Amount += price;
    if(team2Amount<0)
    {
      setProperty("team2Score", "text", "Team 2:\n-$"+(team2Amount)*-1);
    }
    else
    {
       setProperty("team2Score", "text", "Team 2:\n$"+team2Amount);
    }
  }
  
  
  if (turn == 3)
  {
    team3Amount += price;
    if(team3Amount<0)
    {
      setProperty("team3Score", "text", "Team 3:\n-$"+(team3Amount)*-1);
    }
    else
    {
       setProperty("team3Score", "text", "Team 3:\n$"+team3Amount);
    }
  }
  
    setTurn();
    checkEnd();
    }, 5500);
     
    hideElement(elementClicked);
 }



function incorrectAnswer() {
  playSound("assets/Times-up.mp3", false);
 // playSound("assets/category_points/negative_point_counter.mp3", false);
  
   setProperty("answerInput", "background-color", "red");
    setProperty("answerInput", "text", "Answer: "+answer);
    hideElement("answerButton");
    showElement("moneyLabel");
    setProperty("moneyLabel", "text-color", "red");
    
         timedLoop(.05, function() {
             setProperty("moneyLabel", "text", "-$"+j);
             if(j==price)
             {
               stopTimedLoop();
               j=0;
             }
              j++;
           });
    
  
    
    setTimeout(function(){
      setProperty("answerInput", "background-color", "rgb(15, 35, 150)");
      setProperty("answerInput", "text", "");
      team1Amount -= price;
      hideElement("moneyLabel");
      setProperty("answerInput", "placeholder", "Answer here");
      setScreen("gameScreen");
    hideElement("whatIsLabel");
    hideElement("answerInput");
  
  

      if (turn == 1)
  {
    team1Amount -= price;
    if(team1Amount<0)
    {
      setProperty("team1Score", "text", "Team 1:\n-$"+(team1Amount)*-1);
    }
    else
    {
       setProperty("team1Score", "text", "Team 1:\n$"+team1Amount);
    }
  }
  if (turn == 2)
  {
    team2Amount -= price;
    if(team2Amount<0)
    {
      setProperty("team2Score", "text", "Team 2:\n-$"+(team2Amount)*-1);
    }
    else
    {
       setProperty("team2Score", "text", "Team 2:\n$"+team2Amount);
    }
  }
  
  
  if (turn == 3)
  {
    team3Amount -= price;
    if(team3Amount<0)
    {
      setProperty("team3Score", "text", "Team 3:\n-$"+(team3Amount)*-1);
    }
    else
    {
       setProperty("team3Score", "text", "Team 3:\n$"+team3Amount);
    }
  }
        setTurn();
      checkEnd();
     
    }, 5000);
    hideElement(elementClicked);
  }
   

   function setTurn()
   {
     turn++;
     if (turn>teamNum)
     {
       turn = 1;
     }
     showTurn();
   }
   
   
    function checkEnd(){
    if (blocks==0)
  {
  setScreen("endScreen");
  playSound("assets/category_achievements/vibrant_game_game_gold_tresure_chest_open.mp3", false);
  
  var places = [];
  var first = 0;
  var second = 0;
  var third = 0;

  if((team1Amount>team2Amount)&&(team1Amount>team3Amount))
  {
    
      places[0]=team1Amount;
      first = 1;
      if(team2Amount>team3Amount)
      {
        places[1]=team2Amount;
        places[2]=team3Amount;
        second = 2;
        third = 3;
      }
      else
      {
        places[2]=team2Amount;
        places[1]=team3Amount;
        second = 3;
        third = 2;
      }
    
  }
  
   if((team2Amount>team1Amount)&&(team2Amount>team3Amount))
  {
      places[0]=team2Amount;
      first = 2;
      if(team1Amount>team3Amount)
      {
        places[1]=team1Amount;
        places[2]=team3Amount;
         second = 1;
        third = 3;
      }
      else
      {
        places[2]=team1Amount;
        places[1]=team3Amount;
        second = 3;
        third = 1;
      }
    
  }
  
  
   if((team3Amount>team2Amount)&&(team3Amount>team1Amount))
  {
      places[0]=team3Amount;
      first = 3;
      if(team2Amount>team1Amount)
      {
        places[1]=team2Amount;
        places[2]=team1Amount;
         second = 2;
        third = 1;
      }
      else
      {
        places[2]=team2Amount;
        places[1]=team1Amount;
        second = 1;
        third = 2;
      }
  }
  

 setProperty("1stplace", "text", "#1: Team "+first+" \n$"+places[0]);
 setProperty("2ndplace", "text", "\n#2: Team "+second+" \n$"+places[1]);
 setProperty("3rdplace", "text", "\n#3: Team "+third+" \n$"+places[2]);
}

}




