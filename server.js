const express = require('express');

var app = express();

app.use('/', (req, res) => res.send('Hola soy Server hecho con nodejs'));

app.listen(3000);
console.log('La aplicación está escuchando http://localhost:3000');