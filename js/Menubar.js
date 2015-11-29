SHAPULAR.loadMenubar = function(name){
	console.log("loading top menu");
	
	// Elements
	$("body").append("<div id='menu-bar'></div>");
	$("#menu-bar").append("<div id='menubar-left-links'></div>");
	$("#menubar-left-links").append("<span class='menubar-link' id='level-selection-link'>Level selection</span>");
	$("#menubar-left-links").append("<span class='menubar-link' id='level-reset-link'>Reset</span>");
	$("#menubar-left-links").append("<span class='menubar-link' id='level-highscores-link'>Highscores</span>");
	$("#menu-bar").append("<div id='menubar-right-timer'>00:00:00</div>");
	
	// Event listeners
	$("#level-selection-link").on("click", function(){
		SHAPULAR.removeMenubar();
		SHAPULAR.loadLevelSelect();
	});
	
	$("#level-reset-link").on("click", function(){
		SHAPULAR.resetLevel(name);
		console.log("reset level " + name);
	});
	
	$("#level-highscores-link").on("click", function(){
		console.log("displaying highscores for " + name);
		SHAPULAR.showHighscores(name);
	});
}

SHAPULAR.removeMenubar = function(){
	$("#menu-bar").remove();
	SHAPULAR.timer.stop();
	SHAPULAR.timer.reset();
	clearInterval(SHAPULAR.timerDisplayInterval);
	SHAPULAR.timerDisplayInterval = null;
}