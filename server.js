const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const routes = require('./network/routes');

db('mongodb+srv://db_user_telegramer:e9WvIgjhkFXy6taw@cluster0-eeq7m.mongodb.net/test?retryWrites=true&w=majority')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

routes(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');