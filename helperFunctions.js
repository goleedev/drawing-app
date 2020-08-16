function HelperFunctions() {
	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

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

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function () {
		//creates a confirm message to ask if the user wants to save the image
		if (confirm("Are you sure you want to save?")) {
			saveCanvas("myPicture", "jpg");
		};
	});

	//event handler for the import button. Imports the images to the canvas.
	select("#importButton").mouseClicked(function () {
		
	});
};