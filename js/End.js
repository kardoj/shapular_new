SHAPULAR.levelEnd = function(name){
	console.log("level has been completed");
	
	// Overlay to deactivate other links
	$("body").append("<div id='dialogue-overlay'></div>");
	
	// Display confirmation
	$("body").append("<div id='end'></div>");
	$("#end").append("<div class='end-header'>You have completed " + name + "!</div>");
	$("#end").append("<div id='end-content' class='end-content'>Congratulations!</div>");
	$("#end").append("<span id='end-reset-link'>Reset level</span>");
	$("#end").append("<span id='end-level-select-link'>Level selection</span>");
	
	// Loading highscores from the database
	$.ajax({
		url: "getHighscores.php",
		data: {"level": name},
		success: function(highscores){
			highscores = JSON.parse(highscores);
			if(highscores != "" && highscores.length == 10){
				for(var i=0; i<highscores.length; i++){
					var dateParts = highscores[i].time.split(":");
					var date = new Date(0, 0, 0, dateParts[0], dateParts[1], dateParts[2], 0);
					console.log("start");
					console.log(SHAPULAR.timer.time);
					console.log(date);
					console.log("stop");
					if(SHAPULAR.timer.time < date){
						console.log("date: " + date);
						SHAPULAR.displayNameInput();
						break;
					}
				}
			} else {
				SHAPULAR.displayNameInput();
			}
		}
	});
	
	// Event listeners
	$("#end-reset-link").on("click", function(){
		$("#end").remove();
		$("#dialogue-overlay").remove();
		console.log("resetting current level");
		SHAPULAR.randomizeParts();
		
		// Reset the timer for new game
		SHAPULAR.timer.reset();
		SHAPULAR.timer.start();
		SHAPULAR.setTimerDisplayInterval();
	});
	
	$("#end-level-select-link").on("click", function(){
		console.log("to level selection");
		$("#end").remove();
		$("#dialogue-overlay").remove();
		SHAPULAR.removeMenubar();
		SHAPULAR.loadLevelSelect();
	});
}

SHAPULAR.displayNameInput = function(){
	console.log("name input");
	
	$("#end-content").html("Your time " + this.timer.getTime() + " is in TOP 10! Please input your name and save your time!<br>");
	$("#end-content").append("<input type='text' id='save-time-name'><br><span id='save-time-link'>Save</span>");
	$("#save-time-name").focus();

	// Event handler
	$("#save-time-link").on("click", function(){
		if($("#save-time-name").val() != ""){
			$.ajax({
				url: "saveTime.php",
				data: {
					"levelName": SHAPULAR.currentLevelName,
					"playerName": $("#save-time-name").val(),
					"time": SHAPULAR.timer.getTime()
				},
				success: function(highscores){
					$("#end").remove();
					$("#dialogue-overlay").remove();
					SHAPULAR.showHighscores(SHAPULAR.currentLevelName);					
				}
			});			
		} else {
			alert("Name can't be empty!");
			$("#save-time-name").focus();
		}
	});	
}