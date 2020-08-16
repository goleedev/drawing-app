function FreehandTool() {
	//set an icon and a name for the object
	this.icon = "assets/freehand.png";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	var strokeWidth = 1;

	this.draw = function() {
		strokeWeight(strokeWidth);
		//if the mouse is pressed
		if (mouseIsPressed) {
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from
			//there to the current mouse location
			else {
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values
		//back to -1.
		//try and comment out these lines and see what happens!
		else {
			previousMouseX = -1;
			previousMouseY = -1;
		}
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
		// 	//click handler
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