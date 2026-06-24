const express = require('express');
const router = express.Router();


const validarToken = require('../middleware/validar.token');
const incidentesControlador = require('../controlador/incidentes.controlador')


/*
==================================================
INDICE
==================================================

1. INCIDENTESPORMESA

==================================================
*/


//1. INCIDENTESPORMESA
router.get('/incidentes', validarToken, incidentesControlador.losIncidentes)


module.exports = router;