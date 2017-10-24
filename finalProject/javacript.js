"use strict";

// using a function contructor form to create an object
function FinalProject()
{
	var version = "v.01";
	//
	
	this.start = function()
	{
		$("#streamCode").keypress(function(e) {
			if (e.which == 13) {
				lookup();
				return false;
			}
		}).focus();
		
		$("#submit").on("click", function(){
			lookup();
		});
	};
	
	function lookup()
	{
		if($("#streamCode").val() != "")
		{
			//SELECT Game FROM streamCode
			//$("#games").append($("#streamCode").val());
			$(".hidden").show();
		} 
		else
		{
			$(".hidden").hide();
		}
	}
	
}



$(function() {
	window.app = new FinalProject();
	window.app.start();
});
