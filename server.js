'use strict';

const port = 3001;
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const fs = require('fs');

const connection = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));

io.sockets.on('connection', socket => {
  console.log('Connect ' + socket.id);
  connection.push(socket);

  socket.on('disconnect', () => {
    connection.slice(connection.indexOf(socket), 1);
    console.log('Disconnect ' + socket.id);
  });

  fs.readFile('message_fild.txt', 'utf8', (err, file) => {
    io.sockets.emit('Read message', { message: file });
  });

  socket.on('Send message', data => {
    fs.appendFile('message_fild.txt', '\n' + data.name + ': ' +
    data.message, () => {});
    fs.readFile('message_fild.txt', 'utf8', (err, file) => {
      socket.emit('Read message', { message: file });
    });
  });

  socket.on('Reload chat', () => {
    fs.readFile('message_fild.txt', 'utf8', (err, file) => {
      socket.emit('Read message', { message: file });
    });
  });

});


server.listen(port, () => console.log('Work on port ' + port));
