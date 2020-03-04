const express = require('express');

const message = require('../components/message/network')
/* console.log(message); */
const routes = function (server) {
    server.use('/message', message);
}

module.exports = routes;