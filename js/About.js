SHAPULAR.loadAbout = function(){
	console.log("loading about");
	SHAPULAR.setPageTitle(this.aboutTitle);
	$(this.container).empty();
	
	// Remove border
	$(this.container).removeClass("white-border");
	
	// Elements
	$(this.container).append("<div id='about-info-container'><span class='big-text'>Shapular</span> was made by<br><br>Kardo Jõeleht,<br>Hardo Kampus,<br>Sander Peerna,<br>Aleksei Trohlev,<br>Lauri Valma<br><br>as a learning project in Computer Games course.<br>Tallinn University, 2015.</div>");
	$("#about-info-container").append("<div class='menu-link-small' id='back-link'>Back</div>");

	// Event listeners
	$("#back-link").on("click", function(){
		SHAPULAR.loadMenu(this.mainMenuTitle);
	});
}