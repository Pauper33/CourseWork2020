'use strict';

const socket = io();

const getEl = e => document.getElementById(e);

let username = '';
let message = '';

const usernameField = getEl('username');
const messageOut = getEl('messages');
const messageIn = getEl('send-message');
const sendBt = getEl('send');

