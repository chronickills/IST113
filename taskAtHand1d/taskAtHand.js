"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.3", appStorage = new AppStorage("taskAtHand");
	
	function saveTaskList()
	{
		var tasks = [];
		
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text())
		});

		appStorage.setValue("taskList", tasks);
	}
	
	function saveUndo()
	{
		var tasks = [];
		
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text())
		});

		appStorage.setValue("undoTaskList", tasks);
	}
	
	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		if (tasks)
		{
			for (var i in tasks)
			{
				addTaskElement(tasks[i]);
			}
		}
	}
	
	function loadTaskListUndo()
	{
		var tasks = appStorage.getValue("undoTaskList");
		if (tasks)
		{
			for (var i in tasks)
			{
				addTaskElement(tasks[i]);
			}
		}
	}
	
	function undoAction()
	{
		removeAll();
		loadTaskListUndo();
		saveTaskList();
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
		setStatus("ready");
		
		$("#inputBox").keypress(function(e) {
			if (e.which == 13) {
				addTask();
				return false;
			}
		}).focus();
		
		$("#undo").click(function() {
			undoAction();
		});
	};
	
	function addTask() 
	{
		saveUndo();
		var taskName = $("#inputBox").val();
		if (taskName)
		{
			addTaskElement(taskName);
			$("#inputBox").val("").focus();
		}
		saveTaskList();
	}
	
	function addTaskElement(taskName) 
	{
		saveUndo();
		var task = $("#task-template .task").clone();
		$("span.task-name", task).text(taskName);
		
		$("#task-list").append(task);
		
		$("button.move-up", task).click(function(){
			moveTask(task,true);
		});
		
		$("button.delete", task).click(function(){
			removeTask(task);
		});
				
		$("button.move-down", task).click(function(){
			moveTask(task,false);
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
	
	function removeTask(task)
	{
		saveUndo();
		task.remove();
		saveTaskList();
	}
	
	function removeAll()
	{
		var task = $("#task-list").find(".task");
		task.remove();
	}
	
	function moveTask(task, moveUp)
	{
		saveUndo();
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
	
	function onChangeTaskName($input)
	{
		saveUndo();
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if($input.val())
		{
			$span.text($input.val());
		}
		$span.show();
		saveTaskList();
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
