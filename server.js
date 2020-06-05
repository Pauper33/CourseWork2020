'use strict';

const port = 3001;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');

let users = [];
let connection = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));

io.sockets.on('connection', function(socket) {
  console.log("Connect " + socket.id);
  connection.push(socket);

  socket.on('disconnect', function(data) {
    connection.slice(connection.indexOf(socket), 1)
    console.log("Disconnect " + socket.id)
  });

  socket.on('Send message', (data) => {
    io.sockets.emit('Add message', data);
  });
});


server.listen(port, () => console.log("Work on port " + port));