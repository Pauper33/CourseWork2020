'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));

app.listen(8080, () => console.log("Work on port 8080"));