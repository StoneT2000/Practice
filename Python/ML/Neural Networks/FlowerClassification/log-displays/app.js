var express = require('express')
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io')(http);

let watchedFile = '../json-logs/logs.json';
var jsonData = require(watchedFile);
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/stats', function(req, res){
    res.sendFile(__dirname + '/stats/index.html');
});
app.get('/settings', function(req, res){
    res.sendFile(__dirname + '/settings/index.html');
});
app.use(express.static(__dirname + '/public'));

io.on('connect', function(socket){
  console.log('a user connected');
  io.emit('jsonLoad', jsonData);
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});



fs.watch(watchedFile, { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    console.log(filename);

    // Prints: <Buffer ...>
    delete require.cache[require.resolve(watchedFile)]
    var jsonData = require(watchedFile);
    if (jsonData.length) {
      io.emit('jsonUpdate', [jsonData[jsonData.length-1],jsonData.length]);
      console.log(jsonData[jsonData.length-1])
      //('hello world! file changed!<br>Val_acc is now:' + jsonData[jsonData.length-1]['val_acc'])
    }
    else {
      console.log("empty json data")
    }
  }
});

