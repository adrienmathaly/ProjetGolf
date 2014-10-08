// file setting's name
var appFileSettings = "golfChallengeSettings.txt";

// Start the verification of id
function initializeId(){
    // request the acces to the file system, on sucess call onFileSystemForReadSuccess
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemForReadSuccess, fail);
}

// Retrieve the correct file or create if not exist
function onFileSystemForReadSuccess(fileSystem) {
    fileSystem.root.getFile(appFileSettings, {create: true, exclusive: false}, readFileEntry, fail);
}

// Create a file object to manipulate it in reading mode
function readFileEntry(fileEntry) {
        fileEntry.file(readAsText, fail);
}

// Read in file to retrieve the id and ask the server if nothing found
function readAsText(file) {
    // create an object to be able to read in file
    var reader = new FileReader();
    
    // on load file finish succefull event handler
    reader.onload = function(evt) {
        // if nothing in the file ask the server for a new id
        if(evt.target.result == ''){
            getInformation('token', writeNewId);
        }
        // use the id in the file
        else{
            gameID = evt.target.result;
            identification = true;
            receivedEvent('onIdentification', true);
            requestStartingGame();
        }
    };
    // read the file given in param as simple text
    reader.readAsText(file);
}

// Extract the id receive in JSON format and start the process of writting in setting file
function writeNewId(id){
    id = id['token'];    
    gameID = id;
   
    // request the acces to the file system, on sucess call onFileSystemForWriteSuccess
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemForWriteSuccess, fail); 
    receivedEvent('onIdentification', true);
}

// Retrieve the correct file or create if not exist
function onFileSystemForWriteSuccess(fileSystem) {
    fileSystem.root.getFile(appFileSettings, {create: true, exclusive: false}, writeFileEntry, fail);
}

// Create a file object to manipulate it in writting mode
function writeFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

// Write the id in the file
function gotFileWriter(writer) {
    // on write file finish succefull event handler
    writer.onwrite = function(evt) {
        identification = true;
        receivedEvent('onIdentification', true);
        requestStartingGame();
    };
    writer.write(gameID);

    // use only when user reset game
    // to be sure to get localisation and init ball with the last gameID
    // cause of asynch method (read, write and http request)  
    getInformation('lastlocation?token=' + gameID, initializeBall);
}

// Display the fail code
function fail(evt) {
    alert(evt.target.error.code);
}

// User request to reset the game
function resetGame(){
    //Clean POI marker on map
    for(marker in markersPoi){
        markersPoi[marker].setMap(null);
    }
    markersPoi = [];

    requestDeleteToken(gameID);
    getInformation('token', writeNewId);
}

