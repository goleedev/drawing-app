//Draw shapes tool
//Users can draw shapes of their choice, rect & triangle & circl, with the color they picked
//Reference url: https://jsfiddle.net/richardcwc/ukqhf54k/
function DrawShapesTool() {
    this.icon = "assets/drawshapes.png";
    this.name = "drawShapesTool";
    
    //set start position X, Y to -1 and declare W, and H
    //set dragging value to false
	var startMouseX = -1;
	var startMouseY = -1;
	var startMouseW, startMouseH;
    var dragging = false;
    
    //stores shape options in an array
    var shapes = ["Rectangle", "Triangle", "Circle"];
    //set default shape option
    var selectedShapes = shapes[0];
    
    this.draw = function() {
        //if mouse is pressed
        if(mouseIsPressed){
            //check if nothing is drawn on the canvas yet
            //replace start postion X and Y with current postion of X and Y
            if(startMouseX == -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                //change dragging value true while dragging
                dragging = true;
                //save the current pixel Array
				loadPixels();
            }
            else{
                //update position W and H as below
                startMouseW = mouseX - startMouseX;
                startMouseH = mouseY - startMouseY;
                //update the screen with the saved pixels to hide any previous
                updatePixels();
                
                //check what shape option that users pick to draw shapes
                //check if selected option is Rectangle
                if(selectedShapes == "Rectangle"){
                    //draw rectangle with each value of position X, Y, W, and H
                    rect(startMouseX, startMouseY, startMouseW, startMouseH);
                }
                //check if selected option is Triangle
                else if(selectedShapes == "Triangle"){
                    //draw triangle with each value of position X, Y, W, and H
                    triangle(startMouseX, startMouseY, 
                             startMouseX - startMouseW, startMouseY + startMouseH, 
                             startMouseX + startMouseW, startMouseY + startMouseH)
                }
                //check if selected option is Circle
                else if(selectedShapes == "Circle"){
                    //draw circle with each value of position X, Y and H for radius 
                    ellipse(startMouseX, 
                            startMouseY,
                            startMouseH * 2.1);
                }
            } 
        }
        //while still dragging mouse
        else if(dragging){
        //save the current pixel Array
        loadPixels();
        //change dragging value to false
        dragging = false;
        //reset position X and Y to -1
        startMouseX = -1;
        startMouseY = -1;
        }
    }
    
    //deselect options to reset option settings
    this.unselectTool = function() {
        select(".options").html("");
    }

    //create dropdown options at the bottom to select shapes
    this.populateOptions = function() {
        //create shape selection
        var shapesDropDown = createSelect();
        //loop through the length of shape array to set options
        for(var i = 0; i< shapes.length; i++) {
            shapesDropDown.option(shapes[i]);
        }
        //add set option to HTML
        shapesDropDown.parent(select(".options"));
        //modify status of shape's value when changed
        shapesDropDown.changed(function() {
            selectedShapes = shapesDropDown.value();
        });
    };
};