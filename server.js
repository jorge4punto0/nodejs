const express = require('express');
const router = express.Router();


var app = express();

app.use(router);
router.get('/', (req, res) => res.send('Hola, vengo desde GET'));
router.post('/message', (req, res) => res.send('Hola, vengo desde POST'));



/* app.use('/', (req, res) => res.send('Hola soy Server hecho con nodejs')); */

app.listen(3000);
console.log('La aplicación está escuchando http://localhost:3000');