const express = require('express');
const router = express.Router();

const conteControlador = require('../controlador/conteo.controlador')
const validarToken = require('../middleware/validar.token');


/*
==================================================
INDICE
==================================================

1. LOSCONTEOSPORUSUARIO
2. LOSCONTEOSPORSOPORTE
3. CONTEODEDIFERENCIAPORTIEMPO
4. LOSCONTEOSINDIVIDUALPORSOPORTE

==================================================
*/


//1. LOSCONTEOSPORUSUARIO - APP.JSX
router.get('/conteo/usuario/:id/:mesa', validarToken, conteControlador.losConteoPorUsuairo)


//2. LOSCONTEOSPORSOPORTE - GESTIONTICKETS:TARJETAS.JSX
router.get('/conteo/:mesa', validarToken ,conteControlador.losConteosDeTickets)


//3. CONTEODEDIFERENCIAPORTIEMPO - INDICADORES.JSX
router.get('/conteo/diferencia', validarToken, conteControlador.lasDiferencia)


//4. LOSCONTEOSINDIVIDUALPORSOPORTE - GESTIONTICKETS:TARJETAS.JSX
router.get('/conteo/:id_rol/:mesa',validarToken ,conteControlador.losConteos)


module.exports=router





