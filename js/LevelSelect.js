SHAPULAR.loadLevelSelect = function(){
	console.log("loading level select");
	SHAPULAR.setPageTitle(this.levelSelectTitle);
	$(this.container).empty();
		
	// Remove border
	$(this.container).removeClass();
	
	// Set background
	$(this.container).addClass("blue-background");
	
	// Elements
	$(this.container).append("<div id='level-select-container'></div>");
	$("#level-select-container").append("<div class='align-left'>Level selection</div>");
	
	// NEED TO AUTOMATICALLY CREATE LEVEL LIST HERE
	$("#level-select-container").append("<img class='level-select-thumb' src='img/levels/1/thumb.png' alt='level_1_thumbnail' id='level_1_link' />");
	$("#level-select-container").append("<img class='level-select-thumb' src='img/levels/2/thumb.png' alt='level_2_thumbnail' id='level_2_link' />");
	$("#level-select-container").append("<img class='level-select-thumb' src='img/levels/3/thumb.png' alt='level_3_thumbnail' id='level_3_link' />");
	$("#level-select-container").append("<img class='level-select-thumb' src='img/levels/4/thumb.png' alt='level_4_thumbnail' id='level_4_link' />");
	$("#level-select-container").append("<img class='level-select-thumb' src='img/levels/5/thumb.png' alt='level_5_thumbnail' id='level_5_link' />");
	$("#level-select-container").append("<img class='level-select-thumb' src='img/levels/6/thumb.png' alt='level_6_thumbnail' id='level_6_link' />");
	
	$("#level-select-container").append("<div id='level-select-bottom-links-container'></div>");
	$("#level-select-bottom-links-container").append("<div class='menu-link-small absolute-left' id='back-link'>Back</div>");
	$("#level-select-bottom-links-container").append("<div class='menu-link-small' id='level-next-link'>Next</div>");

	// Event listeners
	$("#level_1_link").on("click", function(){
		// Circle needs to be fetched from the database by this moment
		SHAPULAR.loadLevel("Circle");
	});
	$("#level_2_link").on("click", function(){
		SHAPULAR.loadLevel("Square");
	});
	$("#level_3_link").on("click", function(){
		alert("Sorry, level not available!");
	});
	$("#level_4_link").on("click", function(){
		alert("Sorry, level not available!");
	});
	$("#level_5_link").on("click", function(){
		alert("Sorry, level not available!");
	});
	$("#level_6_link").on("click", function(){
		alert("Sorry, level not available!");
	});
	
	// Levels ...
	
	$("#back-link").on("click", function(){
		SHAPULAR.loadMenu(this.mainMenuTitle);
	});
	
	$("#level-next-link").on("click", function(){
		alert("No more levels at the moment, sorry!");
	});
}