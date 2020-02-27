const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

router.get('/', (req, res) =>  res.send('Lista de mensajes'));

router.delete('/message', function (req, res) {
    console.log(req.query);
    console.log(req.body);
 res.send(`Mensaje ${req.body.text} añadido correctamente`)
});

/* app.use('/', (req, res) => res.send('Hola soy Server hecho con nodejs')); */

app.listen(3000);
console.log('La aplicación está escuchando http://localhost:3000');