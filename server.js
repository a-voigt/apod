'use strict';

const express = require('express');
const nodeAPOD = require('node-apod');
const secrets = require('./secrets');

const app = express();
const apod = new nodeAPOD(secrets.API_KEY)

app.set('port', (process.env.PORT || 8080));

app.get('/apod/:date', (req, res) => apod.get({DATE: req.params.date}, (err, data) => {
  if (err) {
    console.log(err);
  }
  else {
    res.send(data);
  }
}));

app.use('/:date', express.static('client/build'));
app.use(express.static('client/build'));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});