"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";
	var number = 0;
	var guess = 0;
	var guesses = 1;
	var newGame = true;
	var gameOver = false;
	
	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}
	
	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		
		setStatus("Please enter a number if you want to play");
		$("#submitBtn").val("New Game");
		$("#submitBtn").on("click",function(){
			if(newGame)
			{
				guesses = 1;
				guess = 0;
				number = Number($("#inputBox").val());
				$("#inputBox").val("");
				newGame = false;
				$("#submitBtn").val("Guess");
				setStatus("Please enter your guess");
			}
			else {
				guess = Number($("#inputBox").val());
				if(guess == number){
					setStatus("Congrats, you got it on try number " + guesses + ". Please enter a new number if you wish to play again");
					gameOver = true;
					newGame = true;
					$("#submitBtn").val("New Game");
				} else if (guess > number){
					setStatus("Lower than your guess of " + guess);
					guesses += 1;
				} else {
					setStatus("Higher than your guess of " + guess);
					guesses += 1;
				}
			}
		});
	};
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});
