//Scissors Tool
//Users can cut the selected area
function ScissorsTool() {
	//set an icon and a name for the object
	this.icon = "assets/scissors.png";
	this.name = "scissorsTool";
    
    var selectButton;
    var selectMode = 0;
    var selectedArea = {x:0, y:0, w: 100, h:100};
 
    this.populateOptions = function () {
        //add pop up modal
        select(".options").html(
			"<button class='open-modal'>Tip</button><div class='modal-container'><div class='modal select-modal'><button id='close-modal'>X</button><div><h2>Scissors Tool</h2><p>User can select and cut the selected area.</p></div></div></div>");
        //click handler for pop up modal
		select('.open-modal').mouseClicked(function () {
			select('.modal-container').addClass('visible');
		})
		select('#close-modal').mouseClicked(function() {
			select('.modal-container').removeClass('visible');
		})
        
        //add select and cut button
        selectButton = createButton();
        selectButton.addClass('scissors-button');
        selectButton.html('Select Area');
        selectButton.parent(select(".options"));
        //click handler
        selectButton.mouseClicked(function() {
            if(selectMode == 0) {
                selectMode += 1;
                selectButton.html("cut");
                loadPixels();
            }
        })
    };

	//smoothly draw we'll draw a line from the previous mouse location
	//current mouse location. The following values store
	//locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

    this.draw = function() {
		//if the mouse is pressed
        if (mouseIsPressed) {
            if (selectMode == 0) {
                //check if they previousX and Y are -1. set them to the current
                //mouse X and Y if they are.
                if(previousMouseX == -1){
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }
                //if we already have values for previousX and Y we can draw a line from 
                //there to the current mouse location
                else{
                    push();
                    line(previousMouseX, previousMouseY, mouseX, mouseY);
                    pop(); 
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }  
            }
            else if (selectMode == 1) {
                updatePixels();

                noStroke();
                fill(255, 0, 0, 100);

                rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                console.log(selectedArea);
            }
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!            
        else {
			previousMouseX = -1;
			previousMouseY = -1;
        }

        //deselect options to reset option settings
        this.unselectTool = function() {
            select(".options").html("");
        }

        if (mouseIsPressed && selectMode == 1) {
            selectedArea.x = mouseX;
            selectedArea.y = mouseY;
            
            var w = mouseX - selectedArea.x;
            var h = mouseY - selectedArea.y;
            
            selectedArea.w = w;
            selectedArea.h = h;
        }
	};
};