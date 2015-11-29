SHAPULAR.loadMenu = function(){
	console.log("Loading the main menu");
	this.setPageTitle(this.mainMenuTitle);
	$(this.container).empty();
	
	// Remove all the classes
	$(this.container).removeClass();
	
	// Set border and background
	$(this.container).addClass("white-border blue-background");
	
	// Creating elements
	$(this.container).append("<div id='menu-links'></div>");
	$("#menu-links").append("<div id='menu-logo'>Sh<img src='img/logo_A.png' alt='logo A' />pular</div>");
	$("#menu-links").append("<div class='menu-link-big' id='start-link'>Start</div		>");
	$("#menu-links").append("<div class='menu-link-small' id='level-select-link'>Level select</div>");
	$("#menu-links").append("<div class='menu-link-small' id='about-link'>About</div>");
	
	// Adding event listeners
	$("#start-link").on("click", function(){
		SHAPULAR.loadLevelSelect("level selection");
	});
	
	$("#level-select-link").on("click", function(){
		SHAPULAR.loadLevelSelect("level selection");
	});
	
	$("#about-link").on("click", function(){
		SHAPULAR.loadAbout("about");
	});
}