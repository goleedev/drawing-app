//Spray can object literal
//Users can draw with sprayed colors
function SprayCanTool() {
    this.icon = "assets/spraycan.png";
    this.name = "sprayCanTool";

    this.points = 13;
    let size = 10;

    this.draw = function() {
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if (innerCanvas()) {
            this.spread = size;
            for(var i = 0; i < this.points; i++){
                point(random(mouseX-this.spread, mouseX+this.spread), 
                    random(mouseY-this.spread, mouseY+this.spread));
            }
	    };
    };
    
    //deselect options to reset option settings
    this.unselectTool = function() {
        //update pixels
        updatePixels();
        //clear options
        select(".options").html("");
        size = 10;
    }

    this.populateOptions = function() { 
        select(".options").html(
			"<form oninput='SizeOutput.value=SpreadSize.value'>Spread Size <input type='range' id='SpreadSize' min='1' max='50'> <output name='SizeOutput' for='SpreadSize'>10</output><\/form>");
		select("#SpreadSize").value(size);
		//click handler
		select("#SpreadSize").input(function() {
			if (!innerCanvas() && this.value() !== "") {
				let newSize = parseInt(this.value());
				if (!isNaN(newSize) && newSize > 0 && newSize < 51) {
					size = newSize;
				}
			}
		});
    }
};