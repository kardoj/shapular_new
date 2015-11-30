// A function for vertically centering a div by id
SHAPULAR.verticallyCenter = function(hash_id){
	var height = parseInt($(hash_id).css("height"));
	var topMargin = -(height/2) - 10; // 10 px is the border width
	$(hash_id).css("margin-top", topMargin);
}