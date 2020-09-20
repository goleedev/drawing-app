//Eraser Tool
//It's a simple function that is a duplicate of the free hand tool using 'white color only' instead.
//To use white color as default, it works like wiping out the drawings on the canvas.
function EraserTool(){
    this.icon = "assets/eraser.png";
    this.name = "eraserTool";
	
	//smoothly draw we'll draw a line from the previous mouse location
	//current mouse location. The following values store
	//locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
    let previousMouseX = -1;
	let previousMouseY = -1;
	
	//set defulat stroke weight to 1
	let strokeWidth = 1;
	
    this.draw = function(){
		strokeWeight(strokeWidth);
		//if the mouse is pressed
		if(innerCanvas()){
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
                pop(); //restroke original state
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
	
	//when the tool is deselected update the pixels to just show the drawing and
	//hide the line of symmetry. Also clear options
	this.unselectTool = function(){
		//update pixels
		updatePixels();
		//clear options
		select(".options").html("");
		//set stroke weight back to 1
		strokeWidth = 1;
	};

	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizonatl to vertical
	this.populateOptions = function(){
		//add stroke weight slider and pop up modal
		select(".options").html(
			"<form oninput='StrokeOutput.value=StrokeWeight.value'>Stroke Weight <input type='range' id='StrokeWeight' min='1' max='50'> <output name='StrokeOutput' for='StrokeWeight'>1</output><\/form><button class='open-modal'>Tip</button><div class='modal-container'><div class='modal'><button id='close-modal'>X</button><div><h2>Eraser Tool</h2><p>User can erase the drawings on the canvas. To clear all, press Clear button.</p></div></div></div>"
		);
		//click handler for pop up modal
		select(".open-modal").mouseClicked(function(){
			select(".modal-container").addClass("visible");
		});
		select("#close-modal").mouseClicked(function(){
			select(".modal-container").removeClass("visible");
		});
		//event handler for stroke weight slider
		select("#StrokeWeight").value(strokeWidth);
		select("#StrokeWeight").input(function() {
			if(!innerCanvas() && this.value() !== ""){
				let newWidth = parseInt(this.value());
				if(!isNaN(newWidth) && newWidth > 0 && newWidth < 51){
					strokeWidth = newWidth;
				};
			};
		});
	};
};