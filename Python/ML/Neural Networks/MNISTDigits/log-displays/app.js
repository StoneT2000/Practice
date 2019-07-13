var express = require('express')
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io')(http);

let watchedFile = '../json-logs/logs.json';
delete require.cache[require.resolve(watchedFile)]
var jsonData;

// Try to load the jsonData, if its not valid, don't load it and leave jsonData undefined
try{
  jsonData = require(watchedFile);
}
catch(err) {
  console.log("Json Data inappropriate. Stack Trace:\n")
}
// Serve /
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/stats', function(req, res){
    res.sendFile(__dirname + '/stats/index.html');
});
app.get('/settings', function(req, res){
    res.sendFile(__dirname + '/settings/index.html');
});
//All files under /public can be served statically and with correct MIME types
app.use(express.static(__dirname + '/public'));

io.on('connect', function(socket){
  loadJSONDataFirstTime()
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});


let previousMTime = new Date(0);
fs.watch(watchedFile, { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    if (jsonData == undefined) {
      if(loadJSONDataFirstTime() == false) {
        return;
      }
    }
    
    console.log(filename);
    
    // Only proceed if the file actually changed and is saved
    const stats = fs.statSync(watchedFile);
    if (stats.mtime.valueOf() === previousMTime.valueOf()) {
      return;
    }
    previousMTime = stats.mtime;

    //Attempt to delete the cache
    delete require.cache[require.resolve(watchedFile)]
    try{
      jsonData = require(watchedFile);
    }
    catch(err){
      console.log("Json data loaded invalid, please submit the stack trace to github...\n",err)
      return;
    }
    
    //given valid jsonData, proceed to update all connected users
    if (jsonData.length > 1) {
      io.emit('jsonUpdate', [jsonData[jsonData.length-1],jsonData.length]);
      console.log(jsonData[jsonData.length-1])
      //('hello world! file changed!<br>Val_acc is now:' + jsonData[jsonData.length-1]['val_acc'])
    }
    else if (jsonData.length === 1) {
      loadJSONDataFirstTime()
    }
    else {
      console.log("empty json data")
    }
  }
});
function loadJSONDataFirstTime() {
  console.log('Loading New Data');
  console.log(require.resolve(watchedFile));
  delete require.cache[require.resolve(watchedFile)]
  try{
    jsonData = require(watchedFile);
  }
  catch(err) {
    console.log("Json Data inappropriate. Stack Trace:\n", err)
    //send a popup banner at top of page to remind user that something happened
    return false;
  }
  console.log("JSON DATA:",jsonData)
  io.emit('jsonLoad', jsonData);
}
