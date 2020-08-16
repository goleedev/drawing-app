//Line To Tool
//A tool to draw straight lines on the screen. 
//It Allows users to create a straight line from the current mouse position to the last point that user moved.
function LineToTool() {
	this.icon = "assets/lineto.png";
	this.name = "lineToTool";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	var strokeWidth = 1;

	//draw the line on the screen
	this.draw = function() {
		//allow only drawing when mouse is clicked
		strokeWeight(strokeWidth);
		if (mouseIsPressed) {
		//If a new line is drawing
		if (startMouseX == -1){
			startMouseX = mouseX;
			startMouseY = mouseY;
			drawing = true;
			//save the current pixel Array
			loadPixels();
		}
		else{
			//update the screen with the saved pixels to hide any previous lines between mouse pressed and released
			updatePixels();
			//draw the line
			line(startMouseX, startMouseY, mouseX, mouseY);
		}
		}
		else if(drawing){
		//save the pixels with the most recent line and reset the drawing bool and start locations
		loadPixels();
		drawing = false;
		startMouseX = -1;
		startMouseY = -1;
		};
	};

	this.unselectTool = function() {
		updatePixels();
		//clear options
		select(".options").html("");
		strokeWeight(1);
	};

	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizonatl to vertical
	this.populateOptions = function() {
		select(".options").html(
			"<form oninput='StrokeOutput.value=StrokeWeight.value'>Stroke Weight<br /><input type='range' id='StrokeWeight' min='0' max='50'> <output name='StrokeOutput' for='StrokeWeight'></output><\/form>");
		select("#StrokeWeight").value(strokeWidth);
		//click handler
		select("#StrokeWeight").input(function() {
			if (this.value() !== "") {
				let newWidth = parseInt(this.value());
				if (!isNaN(newWidth) && newWidth > 0 && newWidth < 51) {
					strokeWidth = newWidth;
				}
			}
		});
	};
};