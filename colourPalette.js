//Displays and handles the colour palette.
function ColourPalette() {
	//a list of web colour strings
	this.colours = [
		"black", "gray", "silver", "palegray", "white",
		"maroon", "red", "orangered", "tomato", "salmon",
		"firebrick", "orange", "yellow", "khaki", "palegoldenrod",
		"darkgreen", "forestgreen", "green", "lightgreen", "palegreen",
		"navy", "darkblue", "blue", "steelblue", "lightskyblue", 
		"indigo", "purple", "darkviolet", "violet", "plum"
	];

	//make the start colour be black
	this.selectedColour = "black";
	let self = this;

	let colourClick = function() {
		//remove the old border
		let current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");
		//get the new colour from the id of the clicked element
		let c = this.id().split("Swatch")[0];
		//set the selected colour and fill and stroke
		selectedColour = c;
		fill(c);
		stroke(c);
		//add a new border to the selected colour
		this.style("border", "2px solid blue");
	}

	//load in the colours
	this.loadColours = function() {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0]);
		stroke(this.colours[0]);
		//for each colour create a new div in the html for the colourSwatches
		for (let i = 0; i < this.colours.length; i++) {
			let colourID = this.colours[i] + "Swatch";
			//using JQuery add the swatch to the palette and set its background colour
			//to be the colour value.
			let colourSwatch = createDiv()
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);
			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i]);
			colourSwatch.mouseClicked(colourClick)
		}
		select(".colourSwatches").style("border", "2px solid blue");
	};
	
	//call the loadColours function now it is declared
	this.loadColours();
};