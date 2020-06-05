'use strict';

const socket = io();

const getEl = e => document.getElementById(e);

let name = '';
let message = '';

const fild_username = getEl('username');
const fild_message = getEl('messages');
const fild_send_message = getEl('send-message');
const button_send = getEl('send');

button_send.addEventListener('click', () => {
  sendMessage();
});

const sendMessage = () => {
  socket.emit('Send message', { message: fild_send_message.value });
  fild_send_message.value = '';
}

socket.on('Add message', (data) => {
  fild_message.value += data.message;
});


