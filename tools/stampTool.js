//Stamp object literal
//Users can draw with sprayed colors
function StampTool() {
    this.icon = "assets/stamp.png";
    this.name = "stampTool";

    //load the image before tool is drawing
    var smile = loadImage('assets/smile.jpg');
    var tearjoy = loadImage('assets/tearjoy.jpg');
    var kiss = loadImage('assets/kiss.jpg');
    var heart = loadImage('assets/heart.jpg');
    var thumbsUp = loadImage('assets/thumbsUp.jpg');
    var sparkles = loadImage('assets/sparkles.jpg');
    
    var stamps = ["😃", "😂", "😘", "💖","👍", "✨"];
    var selectedStamp = stamps[0];
    
    this.draw = function() {
        if(mouseIsPressed){
            //center the image position when stamp is displayed
            imageMode(CENTER);
            //check what stamp option that users pick to draw stamps
            if(selectedStamp == "😃"){
                image(smile, mouseX, mouseY, 50, 50);
            }
            else if(selectedStamp == "😂"){
                image(tearjoy, mouseX, mouseY, 50, 50); 
            }
            else if(selectedStamp == "😘"){
                image(kiss, mouseX, mouseY, 50, 50); 
            }
            else if(selectedStamp == "💖"){
                image(heart, mouseX, mouseY, 50, 50); 
            }
            else if(selectedStamp == "👍"){
                image(thumbsUp, mouseX, mouseY, 50, 50); 
            }
            else if(selectedStamp == "✨"){
                image(sparkles, mouseX, mouseY, 50, 50); 
            }
        }
    }
    
    //deselect options to reset option settings
    this.unselectTool = function() {
        select(".options").html("");
    }

    //create dropdown options at the bottom to select emoji
    this.populateOptions = function () {
        //create stamp selection
        var stampDropDown = createSelect();
        //loop through the length of stamps arrays to set options
        for (var i = 0; i < stamps.length; i++) {
            stampDropDown.option(stamps[i]);
        }
        //add set option to HTML
        stampDropDown.parent(select(".options"));
        //modify status of stamp's value when changed
        stampDropDown.changed(function () {
            selectedStamp = stampDropDown.value();
        });
    };
};