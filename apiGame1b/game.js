"use strict";

/*
- StepList -
.Use Promise to get categories
.get set category names on board
.get ids of categories and get questions and answers correctly (probably a lot of calls)
.arrange all question answers in an array neatly based on point value/category
*/

function apiGame()
{
	this.start = function()
	{
		var playerScore = 1000;
		var qCount = 0;
		$("#screen").hide();
		$("#score").hide();
		$("#scoreLabel").hide();
		
		$("#startGame").click(function() 
		{
			if($("#startGame").text() == "Reset Game")
			{
				//$("#startGame").text("Start Game");
				document.location.reload();
			}
			else
			{
				/*
				$("td").each(function() {
					if(this.id.indexOf("-") != -1) {
						var idNew = this.id.split("-");
						this.id = idNew[0];
					}
				});	
				//reset all field ids
				*/
				
				$("#score").show();
				$("#scoreLabel").show();
				
				getCats(function(cat){
						$("#cat1").text(cat[0].title);
						$("#cat2").text(cat[1].title);
						$("#cat3").text(cat[2].title);
						$("#cat4").text(cat[3].title);
						$("#cat5").text(cat[4].title);
					
					for (var i = 0; i < 5; i++) (function(i)
					{
						getQuestions(cat[i].id, function(ques) 
						{
							globalQuestions(i, ques);
							//console.log(i);
						}); //end getQuestions
					})(i);//end for	
				}); //end getCats
				
				$("#startGame").text("Reset Game");
				$("table, th, td ").css("visibility", "visible");
			} //end if/else
			
		}); //end start game click
		
			$("#gameBoard").click(
				function(e){
					var input = e.target.id;
					$(e.target).html(" ");
					
					if (input.indexOf("~") != -1 && input.indexOf("-") == -1){
						var inputSplit = input.split("~");
					
						var cat = inputSplit[0];
						var question = inputSplit[1];
						question -= 1;
						
						var pointValue;
						switch (question)
						{
							case 0:
								pointValue = 100;
								break;
							case 1:
								pointValue = 200;
								break;
							case 2:
								pointValue = 300;
								break;
							case 3:
								pointValue = 400;
								break;
							case 4:
								pointValue = 500;
								break;
							default:
								footerInfo(error);
						} //end point value assign switch
						
						$("#screenSpan").text(eval('cat' + cat + 'Questions[' + question +'].question')); //show question
						
						e.target.id = e.target.id + "-+";
						console.log(e.target.id);
						$("#gameBoard").toggle();
						$("#screen").toggle();
						$("#startGame").toggle();
						$("#showAnswer").toggle();
						
										
						$("#showAnswer").click(
							function(){
								showAnswer(cat, question);
							}
						);//end showAnswer click	

						$("#correct").unbind('click').bind('click',
							function(){
								playerScore += pointValue;
								
								if (qCount < 24) 
								{
									console.log(qCount);
									$("#correct").hide();
									$("#wrong").hide();
									$("#startGame").show();
									$("#screen").hide();
									$("#gameBoard").show();
									$("#score").text(playerScore);
									qCount += 1;
								} else {
									console.log(qCount);
									$("#correct").hide();
									$("#wrong").hide();
									$("#startGame").show();
									$("#screenSpan").text("YOU WIN!");
									$("#score").text(playerScore);
								}
							}
						); //end correct  button
						
						$("#wrong").unbind('click').bind('click',
							function(){
								playerScore -= pointValue;
								if (playerScore > 0 && qCount < 24){
									console.log(qCount);
									$("#correct").hide();
									$("#wrong").hide();
									$("#startGame").show();
									$("#screen").hide();
									$("#gameBoard").show();
									$("#score").text(playerScore);
									qCount += 1;
								} else if (qCount == 24) {
									console.log(qCount);
									$("#correct").hide();
									$("#wrong").hide();
									$("#startGame").show();
									$("#screenSpan").text("YOU WIN!");
									$("#score").text(playerScore);
								} else {
									console.log(qCount);
									$("#correct").hide();
									$("#wrong").hide();
									$("#startGame").show();
									$("#screenSpan").text("YOU LOSE!");
									$("#score").text(playerScore);
								} //end if else
							}
						); //end correct  button
					} //end if
				}	
			); //end jquery board click
	} //end this.start
	
	function showAnswer(cat, question)
	{
		$("#correct").show();
		$("#wrong").show();
		$("#showAnswer").hide();
		$("#screenSpan").text(eval('cat' + cat + 'Questions[' + question +'].answer')); //show answer
	}
	
	
	function footerInfo(info)
	{
		$("#gameScreen>footer").text(info);
	}
	
	var cat1Questions, cat2Questions, cat3Questions, cat4Questions, cat5Questions;
	
	function globalQuestions(category, questions) 
	{
		switch(category) {
			case 0: 
				cat1Questions = questions;
				break;
			case 1:
				cat2Questions = questions;
				break;
			case 2:
				cat3Questions = questions;
				break;
			case 3:
				cat4Questions = questions;
				break;
			case 4:
				cat5Questions = questions;
				break;
			default:
				footerInfo("Wrong Catergory");
		} //end switch
	} //end globalQuestions
	
	function getQuestions(catID, cb)
	{
		$.ajax
		({
			url: "http://jservice.io/api/clues/?category=" + catID,
			datatype: "json",
			success: cb,
			error: function(request, error) {
				$("#errorArea").text("Error getting data");
			}
		});
	}
	
	function getCats(cb)
	{
		var start = (Math.random()*25) + 1;
		$.ajax
		({
			url: "http://jservice.io/api/categories/?count=5&offset=" + start,
			datatype: "json",
			success: cb,
			error: function(request,error) {
				$("#errorArea").text("Error getting data");
			}
		});
	}
}

$(function() {
	window.game = new apiGame();
	window.game.start();
});