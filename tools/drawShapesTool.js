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
    
    //set defulat stroke weight to 1
    strokeWeight(1);
	var strokeWidth = 1;
    
    //stores shape options in an array
    var shapes = ["Rectangle", "Triangle", "Circle"];
    //set default shape option
    var selectedShapes = shapes[0];
    var shapesDropDown, fillButton, noFillButton, slider;
    noFill();

    this.draw = function () {
        strokeWeight(strokeWidth);
        //if mouse is pressed
        if(innerCanvas()){
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
        //update pixels
		updatePixels();
		//clear options
		select(".options").html("");
		//set stroke weight back to 1
        strokeWidth = 1;
    }

    //create dropdown options at the bottom to select shapes
    this.populateOptions = function() {
        //create shape selection, fill & no fill button, and slider
        slider = createDiv("<form id='shapeSlider' oninput='StrokeOutput.value=StrokeWeight.value'>Stroke Weight <input type='range' id='StrokeWeight' min='1' max='50'> <output name='StrokeOutput' for='StrokeWeight'>1</output><\/form>");
        shapesDropDown = createSelect();
        fillButton = createButton('Fill');
        noFillButton = createButton('No Fill');
        fillButton.addClass('shapesButton');
        noFillButton.addClass('shapesButton');
        noFillButton.hide();
        
        //add pop up modal
        select(".options").html(
			"<button class='open-modal'>Tip</button><div class='modal-container'><div class='modal select-modal'><button id='close-modal'>X</button><div><h2>Draw Shapes Tool</h2><p>User can draw shapes with/without filling them and can change the stroke weight.</p></div></div></div>");
        //click handler for pop up modal
		select('.open-modal').mouseClicked(function () {
			select('.modal-container').addClass('visible');
		})
		select('#close-modal').mouseClicked(function() {
			select('.modal-container').removeClass('visible');
		})
        
        //loop through the length of shape array to set options
        for(var i = 0; i< shapes.length; i++) {
            shapesDropDown.option(shapes[i]);
        }
        
        //add set option to HTML
        shapesDropDown.parent(select(".options"));
        fillButton.parent(select(".options"));
        fillButton.addClass('shapes-fill-button');
        noFillButton.parent(select(".options"));
        noFillButton.addClass('shapes-fill-button');
        slider.parent(select(".options"));
        
        //set storke
        select("#StrokeWeight").value(strokeWidth);
		//click handler
		select("#StrokeWeight").input(function() {
			if (!innerCanvas() && this.value() !== "") {
				let newWidth = parseInt(this.value());
				if (!isNaN(newWidth) && newWidth > 0 && newWidth < 51) {
					strokeWidth = newWidth;
				}
			}
        });
        
        //modify status of shape's value when changed
        shapesDropDown.changed(function() {
            selectedShapes = shapesDropDown.value();
        });

        //fill button pressed no fill button shows up and fill the selected color
        fillButton.mousePressed(function (selectedColour) {
            fillButton.hide();
            noFillButton.show();
            fill(parseInt(selectedColour));
        });
        
        //no fill button pressed fill button shows up and fills no color
        noFillButton.mousePressed(function () {
            noFillButton.hide();
            fillButton.show();
            noFill();
        });
    };
};