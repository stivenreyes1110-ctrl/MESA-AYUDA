const express = require('express');
const router = express.Router();

const conteControlador = require('../controlador/conteo.controlador')


router.get('/conteo/:id_rol', conteControlador.losConteos)
router.get('/conteo/usuario/:id', conteControlador.losConteoPorUsuairo)

module.exports=router





