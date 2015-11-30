SHAPULAR.showHighscores = function(name){
	console.log("showing highscores");
	// Creates a div on top of the game screen and displays 10? top scores
	// Stop the timer if it is ticking
	if(SHAPULAR.timerDisplayInterval){
		SHAPULAR.timer.stop();
	}
	
	// Overlay to deactivate other links
	$("body").append("<div id='dialogue-overlay'></div>");
	
	// Display highscores
	$("body").append("<div id='highscores'></div>");
	$("#highscores").append("<div class='highscores-header'>Highscores for " + name + "</div>");
	$("#highscores").append("<div id='highscores-content' class='highscores-content'>No scores for " + name + " yet!</div>");
	$("#highscores").append("<span id='highscores-back-to-game-link'>Back to game</span>");
	$("#highscores").append("<span id='highscores-level-select-link'>Level selection</span>");
	
	// Loading highscores from the database
	$.ajax({
		url: "getHighscores.php",
		data: {"level": name},
		success: function(highscores){
			if(highscores != "[]"){
				highscores = JSON.parse(highscores);
				var highscoresHTML = "<ol>";
				for(var i=0; i<highscores.length; i++){
					highscoresHTML += "<li>" + highscores[i].name + " - " + highscores[i].time + "</li>";
				}
				highscoresHTML += "</ol>";
				$("#highscores-content").html(highscoresHTML);
			}
							
			// Vertically center
			SHAPULAR.verticallyCenter("#highscores");
		}
	});
	
	// Event listeners
	$("#highscores-back-to-game-link").on("click", function(){
		console.log("highscores close");
		$("#highscores").remove();
		$("#dialogue-overlay").remove();
		
		// If the game has not ended, start the timer again
		if(SHAPULAR.timerDisplayInterval){
			SHAPULAR.timer.start();
		}
	});
	
	$("#highscores-level-select-link").on("click", function(){
		console.log("to level selection");
		$("#highscores").remove();
		$("#dialogue-overlay").remove();
		SHAPULAR.removeMenubar();
		SHAPULAR.loadLevelSelect();
	});
	
}