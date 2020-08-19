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
        
        //add pop up modal
        select(".options").html(
            "<button class='open-modal'>tip</button><div class='modal-container'><div class='modal select-modal'><button id='close-modal'>X</button><div><h2>Snapshot Tool</h2><p>User can take a snapshot of the moment. *Camera access required</p></div></div></div>");
        //click handler for pop up modal
        select('.open-modal').mouseClicked(function () {
            select('.modal-container').addClass('visible');
        })
        select('#close-modal').mouseClicked(function() {
            select('.modal-container').removeClass('visible');
        })

        //add set option to HTML
        snapshot.parent(select(".options"));
        snapshot.addClass('snap-button');
        //modify status of stamp's value when changed
        snapshot.mousePressed(takeSnapshot);
    };
};