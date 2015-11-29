SHAPULAR.loadLevel = function(name){
	console.log("loading level " + name);
	SHAPULAR.setPageTitle("playing " + name);
	$(this.container).empty();

	// Remove all the classes
	$(this.container).removeClass();
	
	// Blue border and white background
	$(this.container).addClass("blue-border white-background");
	
	// Top menu
	this.loadMenubar(name);
	
	// Getting level elements
	$.ajax({
		url: "getLevelData.php",
		data: {"level": name},
		success: function(levelData){
			SHAPULAR.levelData = JSON.parse(levelData);
			SHAPULAR.loadLevelParts();
		}
	});
}

// This function will run once the parts are fetched and ready to be loaded
SHAPULAR.loadLevelParts = function(){
	console.log("loading parts");
	
	// Frame in the middle
	$(this.container).append("<img class='level-frame-graphic' id='frame-img' src='" + this.levelData.frame.image + "' alt='level frame' />");
	$("#frame-img").css("top", "50%");	
	$("#frame-img").css("left", "50%");	
	$("#frame-img").css("margin-left", -(this.levelData.frame.width/2));	
	$("#frame-img").css("margin-top", -(this.levelData.frame.height/2));	
	
	this.randomizeParts();
}

// Create parts on random locations
SHAPULAR.randomizeParts = function(){
	// Remove all the parts from container for Reset to work properly
	$(".level-part-graphic").remove();
	var containerWidth = $(this.container).width();
	var containerHeight = $(this.container).height();
	for(var i=0; i<this.levelData.pieces.length; i++){
		var x = Math.ceil(Math.random()*(containerWidth-this.levelData.pieces[i].width));
		var y = Math.ceil(Math.random()*(containerHeight-this.levelData.pieces[i].height));
		SHAPULAR.createPart(i+1, this.levelData.pieces[i].image, x, y);
	}
	
	this.addEventListenersToParts();	
}

// Actually create part element according to the info
SHAPULAR.createPart = function(id, imageURL, x, y){
	var partId = "part" + id; // Unique part id is needed for dragging
	$(this.container).append("<img class='level-part-graphic' id='" + partId + "' src='" + imageURL + "' alt='level part' />");	
	$("#" + partId).css("left", x);
	$("#" + partId).css("top", y);
}

SHAPULAR.addEventListenersToParts = function(){
	console.log("adding event listeners to parts");
	
	$(".level-part-graphic").draggabilly({}).on("dragStart", function(event){
		SHAPULAR.draggedPiece = "#" + $(this).attr("id");
		var piecePosition = $(SHAPULAR.draggedPiece).position();
		SHAPULAR.mouseToDragged = {
			x: event.pageX - piecePosition.left,
			y: event.pageY - piecePosition.top
		};
		
	});
	
	$(".level-part-graphic").draggabilly({}).on("dragMove", function(event){
		if(event.pageX != 0){ // For some reason, last drag event gives 0 for event.pageX
			var x = event.pageX - SHAPULAR.mouseToDragged.x;
			var y = event.pageY - SHAPULAR.mouseToDragged.y;
			$(SHAPULAR.draggedPiece).css("left", x);
			$(SHAPULAR.draggedPiece).css("top", y);
		}
		
	});
	
	$(".level-part-graphic").draggabilly({}).on("dragEnd", function(event){
				// CHECK IF ALL THE COORDINATES MATCH
				var win = true;
				for(var i=0; i<SHAPULAR.levelData.pieces.length; i++){
					var hash_id = "#" + $("img[src='" + SHAPULAR.levelData.pieces[i].image + "']").attr("id");
					console.log(SHAPULAR.levelData.pieces[i].image);
					var relativePieceCoordinates = SHAPULAR.getPieceRelativeCoordinates(hash_id);
					var correctCoordinates = {
						x: SHAPULAR.levelData.pieces[i].correct_x,
						y: SHAPULAR.levelData.pieces[i].correct_y
					};
					
					if(!(SHAPULAR.coordinatesMatch(correctCoordinates, relativePieceCoordinates))){
						win = false;
						break;
					}
				}
				// If all coordinates matched, player wins!
				if(win){
					alert("You win!");
					// Remove all the piece listeners so pieces can not be moved until choosing another level
					$(".level-part-graphic").draggabilly("disable");
				}
				
	});
}

// Piece coordinates relative to page center
SHAPULAR.getPieceRelativeCoordinates = function(hash_id){
	var relativeCoordinates = {
		x: 0,
		y: 0
	};
	var centerX = $(window).width()/2;;
	var centerY = $(window).height()/2;
	var position = $(hash_id).position();
	var pieceX = position.left;
	var pieceY = position.top;
	relativeCoordinates.x = centerX - pieceX;
	relativeCoordinates.y = centerY - pieceY;
	console.log(hash_id + " " + relativeCoordinates.x + ", " + relativeCoordinates.y);
	return relativeCoordinates;
}

SHAPULAR.coordinatesMatch = function(levelDataCoordinates, pieceCoordinates){
	if(levelDataCoordinates.x >= pieceCoordinates.x - SHAPULAR.allowedError && levelDataCoordinates.x <= SHAPULAR.allowedError + pieceCoordinates.x &&
		levelDataCoordinates.y >= pieceCoordinates.y - SHAPULAR.allowedError && levelDataCoordinates.y <= SHAPULAR.allowedError + pieceCoordinates.y){
		return true;
	}
	return false;	
}