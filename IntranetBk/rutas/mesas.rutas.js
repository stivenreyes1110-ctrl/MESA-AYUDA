const express = require('express');
const router = express.Router();


const validarToken = require('../middleware/validar.token');
const mesasControlador = require('../controlador/mesas.controlador');


/*
==================================================
INDICE
==================================================

1. MESASDEAYUDA

==================================================
*/


//1. MESASDEAYUDA
router.get('/mesas', validarToken, mesasControlador.lasMesas);


module.exports = router;