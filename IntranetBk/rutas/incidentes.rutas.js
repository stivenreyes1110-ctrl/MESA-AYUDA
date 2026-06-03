const express = require('express');
const router = express.Router();


const validarToken = require('../middleware/validar.token');
const incidentesControlador = require('../controlador/incidentes.controlador')


//RUTAS DE INCIDENTES
router.get('/incidentes', validarToken, incidentesControlador.losIncidentes)


module.exports = router;