const express = require('express');
const router = express.Router();

const validarToken = require('../middleware/validar.token');
const areasControlador = require('../controlador/areas.controlador');


/*
==================================================
INDICE
==================================================

1. RUTA DE AREAS

==================================================
*/


//1. RUTA DE AREAS
router.get('/areas', validarToken, areasControlador.lasAreas);


module.exports = router 