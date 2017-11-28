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
	function setError(error)
	{
		$("#gameArea>footer").text(error);
	}
	
	this.start = function()
	{
		$("#startGame").click(function() 
		{
			var cats = getCats();
			$("#startGame").css("visibility", "hidden");
			$("table, th, td ").css("visibility", "visible");
			
			console.log(cats);
		});
	}
	
	function getCats()
	{
		var req = new XMLHttpRequest();
		req.open('GET', 'http://jservice.io/api/categories/?count=5', true);
		req.responseType = "json";
		
		req.onreadystatechange = function()
		{
			if(req.readyState ==4)
			{
				var cats = req.response;
				if(cats)
				{
					$("#cat1").text(cats[0].title);
					$("#cat2").text(cats[1].title);
					$("#cat3").text(cats[2].title);
					$("#cat4").text(cats[3].title);
					$("#cat5").text(cats[4].title);
					
					return cats;
				}
			}
		}

		req.send();
	}

}

$(function() {
	window.game = new apiGame();
	window.game.start();
});