//Freehand Tool
//Users can draw freely
function SnapshotTool() {
    //set an icon and a name for the object
    this.icon = "assets/snapshot.png";
    this.name = "snapshotTool";

    let camera = createCapture(VIDEO);
    camera.hide();

    function takeSnapshot() {
        let sourceX = camera.width / 3;
        let sourceY = (camera.height - 4 * camera.width / 9) / 2;
        let sourceWidth = camera.width / 3;
        let sourceHeight = 4 * camera.width / 9;
        
        camera.get(sourceX, sourceY, sourceWidth, sourceHeight); 
    }

    this.draw = function() {
        let frameStartX = windowWidth / 3;
        let frameStartY = (windowWidth / 5) / 2;
        let frameWidth = windowWidth / 3;
        let frameHeight = windowWidth / 5;
      
        let sourceX = camera.width / 3;
        let sourceY = (camera.width / 5) / 2;
        let sourceWidth = camera.width / 3;
        let sourceHeight = camera.width / 5;
      
        image(camera, frameStartX, frameStartY, frameWidth, frameHeight, sourceX, sourceY, sourceWidth, sourceHeight);
    }
    
    //deselect options to reset option settings
    this.unselectTool = function() {
        select(".options").html("");
        camera.get();
    }
    
    //create dropdown options at the bottom to select emoji
    this.populateOptions = function () {
        //create stamp selection
        let snapshot = createButton('snap');

        //add set option to HTML
        snapshot.parent(select(".options"));
        //modify status of stamp's value when changed
        snapshot.mousePressed(takeSnapshot);
    };
};