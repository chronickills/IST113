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
			addTaskElement(taskName);
			$("#inputBox").val("").focus();
		}
	}
	
	function addTaskElement(taskName) 
	{
		var task = $("#task-template .task").clone();
		$("span.task-name", task).text(taskName);
		
		$("#task-list").append(task);
		
		$("button.move-up", task).click(function(){
			task.insertBefore(task.prev());
		});
		
		$("button.delete", task).click(function(){
			task.remove();
		});
				
		$("button.move-down", task).click(function(){
			task.insertAfter(task.next());
		});
		
		$("span.task-name",task).click(function(){
			onEditTaskName($(this));
		});
		
		$("input.task-name", task).change(function() {
			onChangeTaskName($(this));
		})
		.blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});
	}
	
	function onEditTaskName($span)
	{
		$span.hide()
			.siblings("input.task-name")
			.val($span.text())
			.show()
			.focus();
	}
	
	function onChangeTaskName($input)
	{
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if($input.val())
		{
			$span.text($input.val());
		}
		$span.show();
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
