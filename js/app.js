$(document).ready(function(){

startPage();
checkPlayer();

//// MOVE MALLET WITH MOUSE
	$(document).mousemove(function(e){
    	$("#mallet").css({
    		left: e.pageX - 30,
    		top: e.pageY - 140
    	});
	});

//// TALLY THE SCORE
var points = 0 //start with 0 points
var player1Points = 0
var player2Points = 0
var player1 = $("#start").val();
var playerTurn = "player 1";

function checkPlayer() {
	$("#start2").click(function(){
		playerTurn = "player 2";
	})
};

function tallyScore() { //tallies the score
		if (playerTurn === "player 1") {
    		player1Points = player1Points + 1;
    		$(".theScore").text(player1Points);
		}

    	else {
    		player2Points = player2Points + 1;
    		$(".theScore2").text(player2Points);
    }

};

 ////COUNTDOWN
function timer(){
   var secs = 20;
       timerInterval = setInterval(function(){ 
       secs--; 
        $("#theCountDown").empty().append(secs);
       if (secs <= 10) {
           // $("#theCountDown").css("animation", "blinker 1s linear infinite");
       } if (secs <= 0 && playerTurn === "player 1") {
           clearInterval(timerInterval);
           timesUp();
       } if (secs <= 0 && playerTurn === "player 2") {
       	   clearInterval(timerInterval);
           finalScore();
       }
   }, 1000);
};

var player1Score = $(".theScore");
var player2Score = $(".theScore2");

////COUNT WHO WINS
function whoWon(){
	if (player1Score > player2Score) {
    	$(".whoWon").empty().append("Player One Wins");
		}
    	else {
    	$(".whoWon").empty().append("Player Two Wins");
    }
};

////CHANGE MOLE TO BANG WHEN CLICKED
	$('.mole').click(function(e){
	  	$(this).attr('src',"img/owwwmole.png");
	  		setTimeout(function () {
	  	 $(".mole").attr('src', "img/mole.png");
    }, 1300);
	  		tallyScore(); //adds click listener to add 1 to score tally
	  		play_punch('play');
	  		play_scream('play');
	  		
	  	});

//// CHANGE MALLET TO SMASH ACTION WHEN CLICKED
	$('.container').click(function(e){
	  $("#mallet").attr('src',"img/malletsmall_smash.png"); 
	   setTimeout(function () {
        $("#mallet").attr('src', "img/malletSmall.png");
    }, 150);

	  });

var numMoles = 2; //number of moles I want to pop up each time
var numHoles = 7; //total number of available holes

///WHILE LOOP THAT PICKS MOLE COMBINATIONS
function chooseMoles(){
	var usedNumbers = []; //empty array to dump the number combinations used
	while(usedNumbers.length < numMoles) { // while 

		var index = Math.floor(Math.random() * numHoles); //picks 2 random holes 
		if (usedNumbers.indexOf(index) == -1 ) {
			usedNumbers.push(index) 
		}
	}
	return usedNumbers;
};

//ANIMATION POPPING MOLES UP AND DOWN
function animateMole(index){
	$("#" + index).animate({bottom: "-20"}, {duration: 1000});
	$("#" + index).delay(900).animate({bottom: "-400"}, {duration: 1000});
};

///SETS INTERVAL AT WHICH MOLES POP UP & DOWN
setInterval(function(){ 
	var indexToUse = chooseMoles();
		for (var i = 0; i < indexToUse.length; i++){
			animateMole(indexToUse[i])
		}
}, 3000);

//AUDIO PLAYERS
$(".my_theme").trigger('load');


function play_audio(task) {
      if(task == 'play'){
           $(".my_theme").trigger('play');
      }
     
 }

function play_punch(task) {
      if(task == 'play'){
           $(".my_punch").trigger('play');
      }

 }

function play_scream(task) {
      if(task == 'play'){
           $(".my_scream").trigger('play');
      }
 
 }

///INITIATES PLAYER1 GAME PLAY
$('#start').click(function(evt) {
	$(".container").show();
	$(".startPage").hide();
	$("#mallet").show();
	$("body").css("cursor", "none");
	$(".playerTwoStart").hide();
	$(".my_audio").hide();
	timer();
	play_audio('play');
	$(".scorediv").show();
	$("#counter").show();
	$("#endScreen").hide();
	$(".playerScore2").hide();
});

///INITIATES PLAYER2 GAME PLAY
$('#start2').click(function(evt) {
	$(".container").show();
	$(".startPage").hide();
	$("#mallet").show();
	$("body").css("cursor", "none");
	$(".playerTwoStart").hide();
	$(".scorediv").show();
	$("#counter").show();
	$(".endScreen").hide();
	$(".playerScore1").hide();
	$(".playerScore2").show();
	timer();
});

////SECCOND PLAYER SPLASH SCREEN
function timesUp(){
	$(".container").hide();
	$(".playerTwoStart").show();
	$("#mallet").hide();
	$("body").css("cursor", "auto");
	$(".start").hide();
	$(".scorediv").hide();
	$(".endScreen").hide();
	$("#counter").hide();
	$(".playerScore1").hide();
}	

//// INITIAL START PAGE WITH GAME HIDDEN
function startPage(){
	$(".container").hide();
	$("#mallet").hide();
	$(".playerTwoStart").hide();
	$(".scorediv").hide();
	$("#counter").hide();
	$(".endScreen").hide();
};

//// FINAL SCORE PAGE
function finalScore(){
	$(".container").hide();
	$("#mallet").hide();
	$(".playerTwoStart").hide();
	$(".scorediv").hide();
	$("#counter").hide();
	$(".endScreen").show();
	$(".playerScore1").hide();
	$(".playerScore2").hide();
	whoWon();
};


});
 


