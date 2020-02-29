const express = require('express');

const response = require('../../network/response');

const router = express.Router();

router.get('/', function (req, res) {
    console.log(req.headers);
    res.header({
        'custom-header': 'Nuestro valor personalizado',
    })
    response.success(req, res, 'Lista de mensajes');
});

router.post('/', function (req, res) {
    console.log(req.query);
    if (req.query.error == 'ok') {
        response.error(req, res, 'Error inesperado (para el cliente/usuario)', 500, 'Es solo una simulación de los errores y que solo puedo ver yo como dev');
    } else { 
        response.success(req, res, 'Creado correctamente', 201);
    }

});

module.exports = router;