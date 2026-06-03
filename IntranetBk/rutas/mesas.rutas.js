const express = require('express');
const router = express.Router();
const mesasControlador = require('../controlador/mesas.controlador');

router.get('/mesas', mesasControlador.lasMesas);

module.exports = router;