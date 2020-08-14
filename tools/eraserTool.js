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

    this.draw = function() {

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
                //set stroke weight to 10 as default
                strokeWeight(10);
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
};