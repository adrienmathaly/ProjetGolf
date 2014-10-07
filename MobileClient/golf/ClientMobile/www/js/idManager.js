//Start the verification of id
function initializeId(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemForReadSuccess, fail);
}

function writeNewId(id){
    id = id['token'];    
    gameID = id;
   
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemForWriteSuccess, fail); 
    receivedEvent('onIdentification', true);
}

function resetGame(){
    requestDeleteToken(gameID);
    getIDConnection(writeNewId);
}

//Get the correct file or create if not exist
function onFileSystemForReadSuccess(fileSystem) {
    fileSystem.root.getFile("golfChallengeSettings.txt", {create: true, exclusive: false}, readFileEntry, fail);
}
function onFileSystemForWriteSuccess(fileSystem) {
        fileSystem.root.getFile("golfChallengeSettings.txt", {create: true, exclusive: false}, writeFileEntry, fail);
    }
function readFileEntry(fileEntry) {
        fileEntry.file(readAsText, fail);
}
function writeFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
}
function readAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        if(evt.target.result == ''){
            getIDConnection(writeNewId);
        }
        else{
            alert("Nice to see you again");
            gameID = evt.target.result;
            connectedToServer = true;
            receivedEvent('onIdentification', true);
            requestStartingGame();
        }
    };
    reader.readAsText(file);
}
function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        connectedToServer = true;
        requestStartingGame();
    };
    writer.write(gameID);
}

function fail(evt) {
    alert(evt.target.error.code);
}