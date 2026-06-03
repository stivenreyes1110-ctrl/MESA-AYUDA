const express = require('express');
const router = express.Router();


const loginControlador = require('../controlador/login.controlador')


router.post ('/login', loginControlador.losLogin)


module.exports = router;