function HelperFunctions() {
	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object
	//event handler for the dark mode button. dark mode
	//set default darkmode to false
	let darkmode = false;
	select("#darkmodeButton").mouseClicked(function(){
		//check if darkmode is on
		if(!darkmode){
			//creates a confirm message to ask if it's okay to cover the canvas with black
			if(confirm("Are you sure to reset the canvas with color black?")){
				//set background to dark mode
				background('#000');
				//call loadPixels to update the drawing state
				//this is needed for the mirror tool
				loadPixels();
				//set darkmode back to true
				darkmode = true;
			};
		}
		else{
			//creates a confirm message to ask if it's okay to cover the canvas with white
			if(confirm("Are you sure to reset the canvas with color white?")){
				//set background to light mode
				background('#fff');
				loadPixels();
				//set darkmode back to false
				darkmode = false;
			};
		};
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function () {
		//creates a confirm message to ask if the user wants to save the image
		if (confirm("Are you sure you want to save?")) {
			saveCanvas("myPicture", "jpg");
		};
	});

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		//creates a confirm message to ask if the user wants to clear the canvas
		if (confirm("Are you sure you want to clear?")) {
			background('#fff');
			//call loadPixels to update the drawing state
			//this is needed for the mirror tool
			loadPixels();
		};
	});

	//set default color palette as false
	let colorShow = false;
	//event handler for color picker. Selects the color that user wants.
	//click the button to display the palette and click again to hide it
	select("#colorPickerButton").mouseClicked(function () {
		if (colorShow) {
			select(".colourPalette").removeClass("visible");
			colorShow = false;
		}
		else {
			select(".colourPalette").addClass("visible");
			colorShow = true;
		}
	});
};