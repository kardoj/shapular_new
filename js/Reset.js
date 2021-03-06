SHAPULAR.resetLevel = function(name){
	// Stop the timer when dialogue active
	if(SHAPULAR.timerDisplayInterval){
		SHAPULAR.timer.stop();
	}
	
	console.log("reset");
	
	// Overlay to deactivate other links
	$("body").append("<div id='dialogue-overlay'></div>");
	
	// Display confirmation
	$("body").append("<div id='confirmation'></div>");
	$("#confirmation").append("<div class='confirm-header'>Reset current level?</div>");
	$("#confirmation").append("<span id='confirm-accept-link'>Accept</span>");
	$("#confirmation").append("<span id='confirm-cancel-link'>Cancel</span>");
	
	// Event listeners
	$("#confirm-accept-link").on("click", function(){
		console.log("resetting current level");
		SHAPULAR.randomizeParts();
		$("#confirmation").remove();
		$("#dialogue-overlay").remove();
		
		// Reset the timer for new game
		SHAPULAR.timer.reset();
		SHAPULAR.timer.start();
	});
	$("#confirm-cancel-link").on("click", function(){
		console.log("reset cancelled");
		$("#confirmation").remove();
		$("#dialogue-overlay").remove();
		
		if(SHAPULAR.timerDisplayInterval){
			SHAPULAR.timer.start();
		}
	});
	
	SHAPULAR.verticallyCenter("#confirmation");
}