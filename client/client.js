'use strict';

const socket = io();

const getEl = e => document.getElementById(e);

let name = '';
let message = '';

const fild_username = getEl('username');
const fild_message = getEl('messages');
const fild_send_message = getEl('send-message');
const button_send = getEl('send');
const button_reload = getEl('reload');

button_send.addEventListener('click', () => {
  sendMessage();
});

button_reload.addEventListener('click', () => {
  socket.emit('Reload chat', {})
});

const sendMessage = () => {

  socket.emit('Send message', { 
    message: fild_send_message.value,
    name: fild_username.value
  });
  fild_send_message.value = '';
};

socket.on('Read message', (data) => {
  fild_message.textContent = data.message;
});

