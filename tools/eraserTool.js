//Eraser Tool
//It's a simple function that is a duplicate of the free hand tool using 'white color only' instead.
//To use white color as default, it works like wiping out the drawings on the canvas.
function EraserTool() {
    this.icon = "assets/eraser.png";
    this.name = "eraserTool";
    
	//smoothly draw we'll draw a line from the previous mouse location
	//current mouse location. The following values store
	//locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
    var previousMouseX = -1;
	var previousMouseY = -1;

	var strokeWidth = 1;

    this.draw = function() {
		strokeWeight(strokeWidth);
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
                push();
                //override stroke color to white
                stroke("#fff");
                line(previousMouseX, previousMouseY, mouseX, mouseY);
                pop(); // restroke original state
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else{
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
			"<div>Stroke Weight <br /> <input type='range' id='StrokeWeight'><\/div>");
		select("#StrokeWeight").value(strokeWidth);
		// 	//click handler
		select("#StrokeWeight").input(function() {
			if (this.value() !== "") {
				let newWidth = parseInt(this.value());
				if (!isNaN(newWidth) && newWidth > 0 && newWidth < 101) {
					strokeWidth = newWidth;
				}
			}
		});
	};
};