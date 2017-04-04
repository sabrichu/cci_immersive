const fs = require('fs');
const chokidar = require('chokidar');
const osc = require('node-osc');
// const oscServer = new osc.Server(8000, 'localhost');

const express = require('express');
const app = express();

//instantiate a server on port 3000
const server = app.listen(3000);
const io = require('socket.io')(server);

// XXX: Render any pictures already in the folder?
// let filenames = [];
// fs.readdir('./dist/images/', (err, files) => {
//     filenames = files;
// });

const watcher = chokidar.watch('./dist/images/', {
    ignored: /[\/\\]\./
});

//expose the local public folder for inluding files js, css etc..
app.use(express.static('dist'));

//on a request to / serve index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

watcher.on('add', (path) => {
    io.sockets.emit('newSnapshot', path.toString().replace('dist/images/', ''));
});
//When we recieve a message send it as a web socket
// oscServer.on('message', (msg, rinfo) => {
//     console.log('TUIO message: ');
//     console.log(msg);

//     let ctrl = msg[0];
//     let filename = msg[1];

//     io.sockets.emit('newSnapshot', filename);
// });
