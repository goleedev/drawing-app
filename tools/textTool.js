function TextTool(){
    this.icon = "assets/text.png";
    this.name = "textTool";
    
    //list font items and font styles in array
    let fontItems = ["Georgia", "Helvetica", "Impact", "Inconsolata", "Arial"];
    let fontStyles = ["Regular", "Italic", "Bold"];
    //set default font item and stlye
    let fontItem = fontItems[0];
    let fontStyle = fontStyles[0];
    
    //set default font size
    let fontSize = 10;

    this.draw = function () { 
        //check if text is within the canvas
        if (innerCanvas()) { 
            //reset stroke weight to 1
            strokeWeight(1);
            //set text align to center
            textAlign(CENTER);
            //check what font style has been chosen
            if (fontStyle === "Regular") {
                textStyle(NORMAL);
            }
            else if (fontStyle === "Italic") {
                textStyle(ITALIC);
            }
            else if (fontStyle === "Bold") {
                textStyle(BOLD);
            }
            //update pixels
            updatePixels();
            //set text font to selected item
            textFont(fontItem);
            //set text size to selected size
            textSize(fontSize);
            //display text from the typed input with the selected size
            text(textGetter(), mouseX, mouseY);
            //load pixels
            loadPixels();
        }
    }

    //function to get texts
    function textGetter(){
        let newText = document.getElementById("font-input").value;
        return newText;
    }

    //deselect options to reset option settings
    this.unselectTool = function(){
        //update pixels
        updatePixels();
        //clear options
        select(".options").html("");
        //reset font size
        fontSize = 10;
    };

    //create dropdown options at the bottom to select emoji
    this.populateOptions = function(){
        //add pop up modal and size slider
        select(".options").html(
            "<form id='sizeSlider' oninput='SizeOutput.value=Size.value'>Size <input type='range' id='Size' min='1' max='100'> <output name='SizeOutput' for='Size'>50</output><\/form><input id='font-input' type='text'></input><button class='open-modal'>Tip</button><div class='modal-container'><div class='modal'><button id='close-modal'>X</button><div><h2>Text Tool</h2><p>User can type anything with the selected styles on the canvas.</p></div></div></div>"
        );
        //click handler for pop up modal
        select(".open-modal").mouseClicked(function(){
            select(".modal-container").addClass("visible");
        });
        select("#close-modal").mouseClicked(function(){
            select(".modal-container").removeClass("visible");
        });
        //create font item and style selection
        let textFontDropDown = createSelect();
        let textStyleDropDown = createSelect();
        //add class to style dropdowns
        textFontDropDown.addClass("font-dropdown");
        textStyleDropDown.addClass("font-dropdown");
        //loop through the length of font items and style arrays to set options
        for(let i = 0; i < fontItems.length; i++){
            textFontDropDown.option(fontItems[i]);
        };
        for(let i = 0; i < fontStyles.length; i++){
            textStyleDropDown.option(fontStyles[i]);
        };
        //add set option to HTML
        textFontDropDown.parent(select(".options"));
        textStyleDropDown.parent(select(".options"));
        //modify status of font item and stlye value when changed
        textFontDropDown.changed(function(){
            fontItem = textFontDropDown.value();
        });
        textStyleDropDown.changed(function(){
            fontStyle = textStyleDropDown.value();
        });
        //update size slider value
        select("#Size").value(fontSize);
		select("#Size").input(function(){
			if(!innerCanvas() && this.value() !== ""){
				let newSize = parseInt(this.value());
				if(!isNaN(newSize) && newSize > 0 && newSize < 101){
					fontSize = newSize;
                };
            };
		});
    };
}