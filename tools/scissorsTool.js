//Scissors Tool
//Users can cut the selected area
function ScissorsTool(){
	this.icon = "assets/scissors.png";
	this.name = "scissorsTool";
    let selectMode, selectedArea, selectButton, selectedPixels;
    
    //set default select options
    noFill();
    stroke(0);
    selectMode = 0;
	selectedArea = {x: 0, y:0, w: 100, h: 100};

    this.draw = function(){
        if(mouseIsPressed){
            if(selectMode == 0){
                //check if they previousX and Y are -1. set them to the current
                //mouse X and Y if they are.
                if (previousMouseX == -1){
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }
                //if we already have values for previousX and Y we can draw a line from 
                //there to the current mouse location
                else{
                    stroke(0);
                    noFill();
                    line(previousMouseX, previousMouseY, mouseX, mouseY);
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }
            }
            else if(selectMode == 1){
                updatePixels();
                noStroke();
                fill(255,0,0,100);
                rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
            }
        }
        else{
            //if the user has released the mouse we want to set the previousMouse values 
            //back to -1.
            previousMouseX = -1;
            previousMouseY = -1;
        }
    };
    
    //deselect options to reset option settings
    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    if (mouseIsPressed && selectMode == 1) {
        selectedArea.x = mouseX;
        selectedArea.y = mouseY;
        
        var w = mouseX - selectedArea.x;
        var h = mouseY - selectedArea.y;
        
        selectedArea.w = w;
        selectedArea.h = h;
    }
    this.populateOptions = function(){
        //add pop up modal
        select(".options").html(
            "<button class='open-modal'>Tip</button><div class='modal-container'><div class='modal select-modal'><button id='close-modal'>X</button><div><h2>Scissors Tool</h2><p>User can select and cut the selected area.</p></div></div></div>"
        );
        //click handler for pop up modal
        select(".open-modal").mouseClicked(function(){
            select(".modal-container").addClass("visible");
        });
        select("#close-modal").mouseClicked(function(){
            select(".modal-container").removeClass("visible");
        });

        selectButton = createButton('Select Area');
        selectButton.parent(select(".options"));
        selectButton.addClass('scissors-button');
        
        selectButton.mousePressed(function(){
            //event code will go here
            if(selectMode == 0){
                selectMode += 1;
                selectButton.html("Cut");
                loadPixels(); // store current frame
            }
            else if(selectMode == 1){
                selectMode += 1;
                selectButton.html("End Paste");
                
                //refresh the screen
                updatePixels();
            
                //store the pixels
                selectedPixels = get(selectedArea.x , selectedArea.y , selectedArea.w, selectedArea.h);
                
                //draw a rectangle over it
                fill(255);
                noStroke();
                rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
            }
            else if(selectMode == 2){
                selectMode = 0;
                loadPixels();
                selectedArea = {x: 0, y: 0, w: 100, h:100};
                selectButton.html("select area");
            };
        });
    };

        
    function mousePressed(){	
        if(selectMode == 1){
            selectedArea.x = mouseX;
            selectedArea.y = mouseY;
        }
        else if(selectMode == 2){
            image(selectedPixels, mouseX, mouseY);
        };
    };

    function mouseDragged() {
        if(selectMode == 1){
            var w = mouseX - selectedArea.x;
            var h = mouseY - selectedArea.y;
    
            selectedArea.w = w;
            selectedArea.h = h;
        };
    };
};