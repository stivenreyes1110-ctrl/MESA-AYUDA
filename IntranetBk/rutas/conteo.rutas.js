const express = require('express');
const router = express.Router();

const conteControlador = require('../controlador/conteo.controlador')


router.get('/conteo',conteControlador.losConteosDeTickets)
router.get('/conteo/diferencia', conteControlador.lasDiferencia)
router.get('/conteo/:id_rol', conteControlador.losConteos)
router.get('/conteo/usuario/:id/:mesa', conteControlador.losConteoPorUsuairo)

module.exports=router





