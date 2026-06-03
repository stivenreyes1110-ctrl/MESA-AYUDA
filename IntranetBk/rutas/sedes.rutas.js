const express  =  require('express')
const router = express.Router()

const validarToken = require('../middleware/validar.token');
const sedesControlador =  require('../controlador/sedes.controlador')


//RUTA DE SEDES
router.get('/sedes', validarToken, sedesControlador.lasSedes)



module.exports = router
