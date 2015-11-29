// Main object with all the global variables
var SHAPULAR = {
	container: null,
	levelData: null, // contains active level graphics info
	draggedPiece: null, // currently dragged piece
	mouseToDragged: { // used in dragging to calculate correct landing
		x: 0,
		y: 0
	},
	allowedError: 10, // Pixel difference allowed when registering win condition
	timer: null,
	timerDisplayInterval: null,
	currentLevelName: null,
	
	// View names used in title
	prefix: "Shapular",
	aboutTitle: "about",
	mainMenuTitle: "main menu",
	levelSelectTitle: "level select",
	
	setContainer: function(containerId){
		this.container = $("#" + containerId);
	},
	
	setPageTitle: function(title){
		$(document).attr("title", this.prefix + " -> " + title);
	},
};

window.addEventListener("load", function(){
	// Setting parameters first
	SHAPULAR.setContainer("container");
	
	// Game logic
	SHAPULAR.loadMenu();
});