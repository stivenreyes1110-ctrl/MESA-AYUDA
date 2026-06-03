const express = require('express');
const router = express.Router();


const validarToken = require('../middleware/validar.token');
const usuariosControlador = require('../controlador/usuario.controlador');


//1. RUTAS DE USUARIOS
router.get('/usuarios',validarToken,usuariosControlador.losUsuarios);


//2. RUTAS DE USUARIOS SOPORTES
router.get('/usuarios/soporte',usuariosControlador.losSoportes);


module.exports = router;