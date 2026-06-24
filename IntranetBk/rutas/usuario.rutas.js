const express = require('express');
const router = express.Router();


const validarToken = require('../middleware/validar.token');
const usuariosControlador = require('../controlador/usuario.controlador');


/*
==================================================
INDICE
==================================================

1. LOSUSUARIOS
2. LOSSOPORTES

==================================================
*/


//1. LOSUSUARIOS
router.get('/usuarios',validarToken,usuariosControlador.losUsuarios);


//2. LOSSOPORTES 
router.get('/usuarios/soporte/:mesa',usuariosControlador.losSoportes);


module.exports = router;