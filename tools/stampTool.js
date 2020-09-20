//Stamp object literal
//Users can draw with sprayed colors
function StampTool(){
    this.icon = "assets/stamp.png";
    this.name = "stampTool";
    //load the image before tool is drawing
    var smile = loadImage("assets/smile.jpg");
    var tearjoy = loadImage("assets/tearjoy.jpg");
    var kiss = loadImage("assets/kiss.jpg");
    var heart = loadImage("assets/heart.jpg");
    var thumbsUp = loadImage("assets/thumbsUp.jpg");
    var sparkles = loadImage("assets/sparkles.jpg");
    //list stamp items in array and default stamp as the smile emoji
    var stamps = ["😃", "😂", "😘", "💖","👍", "✨"];
    var selectedStamp = stamps[0];
    //set default stamp size
    var stampSize = 50;

    this.draw = function(){
        if(innerCanvas()){
            //center the image position when stamp is displayed
            imageMode(CENTER);
            //check what stamp option that users pick to draw stamps with the selected size
            if (selectedStamp === "😃"){
                image(smile, mouseX, mouseY, stampSize, stampSize);
                loadPixels();
            }
            else if (selectedStamp === "😂"){
                image(tearjoy, mouseX, mouseY, stampSize, stampSize);
                loadPixels();
            }
            else if (selectedStamp === "😘"){
                image(kiss, mouseX, mouseY, stampSize, stampSize);
                loadPixels();
            }
            else if (selectedStamp === "💖"){
                image(heart, mouseX, mouseY, stampSize, stampSize);
                loadPixels();
            }
            else if (selectedStamp === "👍"){
                image(thumbsUp, mouseX, mouseY, stampSize, stampSize);
                loadPixels();
            }
            else if (selectedStamp === "✨"){
                image(sparkles, mouseX, mouseY, stampSize, stampSize);
                loadPixels();
            }
        };
    };
    
    //deselect options to reset option settings
    this.unselectTool = function(){
        //update pixels
        updatePixels();
        //clear options
        select(".options").html("");
        //reset stamp size
        stampSize = 50;
    };

    //create dropdown options at the bottom to select emoji
    this.populateOptions = function(){
        //add pop up modal and size slider
        select(".options").html(
            "<form id='shapeSlider' oninput='SizeOutput.value=Size.value'>Size <input type='range' id='Size' min='1' max='100'> <output name='SizeOutput' for='Size'>50</output><\/form><button class='open-modal'>Tip</button><div class='modal-container'><div class='modal'><button id='close-modal'>X</button><div><h2>Stamp Tool</h2><p>User can put a Emoji stamp sticker on the canvas.</p></div></div></div>"
        );
        //click handler for pop up modal
        select(".open-modal").mouseClicked(function(){
            select(".modal-container").addClass("visible");
        });
        select("#close-modal").mouseClicked(function(){
            select(".modal-container").removeClass("visible");
        });
        //create stamp selection
        var stampDropDown = createSelect();
        //loop through the length of stamps arrays to set options
        for(var i = 0; i < stamps.length; i++){
            stampDropDown.option(stamps[i]);
        };
        //add set option to HTML
        stampDropDown.parent(select(".options"));
        //modify status of stamp's value when changed
        stampDropDown.changed(function(){
            selectedStamp = stampDropDown.value();
        });
        //update size slider value
        select("#Size").value(stampSize);
		select("#Size").input(function(){
			if(!innerCanvas() && this.value() !== ""){
				let newSize = parseInt(this.value());
				if(!isNaN(newSize) && newSize > 0 && newSize < 101){
					stampSize = newSize;
                };
            };
		});
    };
};