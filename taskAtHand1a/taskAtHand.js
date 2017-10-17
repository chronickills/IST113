"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
		
		$("#inputBox").keypress(function(e) {
			if (e.which == 13) {
				addTask();
				return false;
			}
		}).focus();
	};
	
	function addTask() 
	{
		var taskName = $("#inputBox").val();
		if (taskName)
		{
			addTaskToList(taskName);
			$("#inputBox").val("").focus();
		}
	}
	
	function addTaskToList(taskName) 
	{
		var task = $("<li></li>");
		var deleteTask = $("<button class='delete'>X</button>");
		var moveUp = $("<button class='move-up'>^</button>");
		var moveDown = $("<button class='move-down'>v</button>");
		task.append(deleteTask).append(moveUp).append(moveDown).append("<span class='task-name'>" + taskName + "</span>");
		$("#tasks").append(task);
		
		deleteTask.click(function() {task.remove();});
		moveUp.click(function() {
			task.insertBefore(task.prev());
		});
		
		moveDown.click(function() {
			task.insertAfter(task.next());
		});
		
	}
} // end TaskAtHandApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});
