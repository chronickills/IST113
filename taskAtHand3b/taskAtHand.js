"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v3.2",
		appStorage = new AppStorage("taskAtHand"),
		taskList = new TaskList(),
		timeoutId = 0;
	
	function saveTaskList()
	{
		if (timeoutId) clearTimeout(timeoutId);
		setStatus("saving changes...", true);
		timeoutId = setTimeout(function()
		{
			appStorage.setValue("taskList", taskList.getTasks());
			timeoutId = 0;
			setStatus("changes saved.");
		},
		2000);
	}
	
	function setStatus(msg, noFade)
	{
		$("#app>footer").text(msg).show();
		if (!noFade)
		{
			$("#app>footer").fadeOut(1000);
		}
	}

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		loadTaskList();
		loadTheme();
		setStatus("ready");
		
		$("#theme").change(onChangeTheme);
		
		$("#inputBox").keypress(function(e) {
			if (e.which == 13) {
				addTask();
				return false;
			}
		}).focus();
	};
	
	function onChangeTheme()
	{
		var theme = $("#theme>option").filter(":selected").val();
		setTheme(theme);
		appStorage.setValue("theme",theme);
	}
	
	function setTheme(theme)
	{
		$("#theme-style").attr("href", "themes/" + theme + ".css");
	}
	
	function loadTheme()
	{
		var theme = appStorage.getValue("theme");
		if (theme)
		{
			setTheme(theme);
			$("#theme>option[value=" + theme + "]")
				.attr("selected", "selected");
		}
	}
	
	function addTask() 
	{
		var taskName = $("#inputBox").val();
		if (taskName)
		{
			var task = new Task(taskName);
			taskList.addTask(task);
			appStorage.setValue("nextTaskId", Task.nextTaskId);
			addTaskElement(task);
			saveTaskList();
			$("#inputBox").val("").focus();
		}
	}
	
	function addTaskElement(task) 
	{
		var $task = $("#task-template .task").clone();
		$task.data("task-id", task.id);
		$("span.task-name", $task).text(task.name);
		
		$task.click(function() { onSelectTask($task); });
		
		$("#task-list").append($task);

		$("button.delete", $task).click(function(){
			taskList.removeTask(task.id);	
			removeTask($task);
		});
		
		$("button.move-up", $task).click(function(){
			taskList.moveTask(task,true);
			moveTask($task,true);
		});
		
		$("button.move-down", $task).click(function(){
			taskList.moveTask(task,false);
			moveTask($task,false);
		});
		
		$("span.task-name", $task).click(function(){
			onEditTaskName($(this));
		});
		
		$("input.task-name", $task).change(function() {
			onChangeTaskName($(this), task);
		})
		.blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});
		
		$("button.toggle-details", $task).click(function() {
			toggleDetails($task);
		});
		
		$(".details input, .details select", $task).each(function() {
			var $input = $(this);
			var fieldName = $input.data("field");
			$input.val($task[fieldName]);
		});
	}
	
	function onChangeTaskDetails(taskId, $input)
	{
		var task = taskList.getTask(taskId)
		if (task)
		{
			var fieldName = $input.data("field");
			task[fieldName] = $input.val();
			saveTaskList();
		}
	}
	
	function toggleDetails($task)
	{
		$(".details", $task).slideToggle();
		$("button.toggle-details", $task).toggleClass("expanded");
	}
	
	function onSelectTask(task)
	{
		if (task)
		{
			task.siblings(".selected").removeClass("selected");
			task.addClass("selected");
		}
	}
	
	function removeTask(task)
	{
		//taskList.removeTask(task.id);
		task.remove();
		saveTaskList();
	}
	
	function moveTask(task, moveUp)
	{
		if (moveUp)
		{
			task.insertBefore(task.prev());
		}
		else
		{
			task.insertAfter(task.next());
		}
		saveTaskList();
	}
	
	function onEditTaskName($span)
	{
		$span.hide()
			.siblings("input.task-name")
			.val($span.text())
			.show()
			.focus();
	}
	
	function onChangeTaskName($input, task)
	{
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if($input.val())
		{
			$span.text($input.val());
			task.name = $input.val();
		}
		$span.show();
		saveTaskList();
	}
	
	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		taskList = new TaskList(tasks);
		rebuildTaskList();
	}
	
	function rebuildTaskList()
	{
		$("#task-list").empty();
		taskList.each(function(task)
		{
			addTaskElement(task);
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
