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
		$("#startGame").click(function() 
		{
			getCats(function(cat){
					$("#cat1").text(cat[0].title);
					$("#cat2").text(cat[1].title);
					$("#cat3").text(cat[2].title);
					$("#cat4").text(cat[3].title);
					$("#cat5").text(cat[4].title);
				
				for (var i = 0; i < 5; i++)
				{
					getQuestions(cat[i].id, function(ques) 
					{
						globalQuestions(i+1, ques);
						console.log(i+1);
					}); //end getQuestions
				}//end for
				
					
			}); //end getCats
			
			$("#startGame").css("visibility", "hidden");
			$("table, th, td ").css("visibility", "visible");
		});
		
		$("#cat1q1").on("click", function() {
			footerInfo(cat1Questions[0].question + " : " + cat1Questions[0].answer);
		});
	}
	
	function footerInfo(info)
	{
		$("#gameScreen>footer").text(info);
	}
	
	var cat1Questions, cat2Questions, cat3Questions, cat4Questions, cat5Questions;
	
	function globalQuestions(category, questions) 
	{
		switch(category) {
			case 1: 
				cat1Questions = questions;
				break;
			case 2:
				cat2Questions = questions;
				break;
			case 3:
				cat3Questions = questions;
				break;
			case 4:
				cat4Questions = questions;
				break;
			case 5:
				cat5Questions = questions;
				break;
			default:
				console.log("Wrong category");
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
		$.ajax
		({
			url: "http://jservice.io/api/categories/?count=5",
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