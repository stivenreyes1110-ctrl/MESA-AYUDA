const express = require('express');
const router = express.Router();

const validarToken = require('../middleware/validar.token');
const areasControlador = require('../controlador/areas.controlador');


//2. RUTA DE AREAS
router.get('/areas', validarToken, areasControlador.lasAreas);


module.exports = router 