const express = require('express');
const router = express.Router();


const ticketsControlador = require('../controlador/tickets.controlador');
const validarToken = require('../middleware/validar.token');
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {


    cb(null, "uploads/TICS");


  },
  filename: (req, file, cb) => {


    const extension = path.extname(file.originalname);
    const nombreTemporal = Date.now() + extension;
    cb(null, nombreTemporal);


  }
});



const upload = multer({ storage });



router.post(


  "/tickets",
  upload.single("archivo"),
  ticketsControlador.crearLosTickets


);


/*
==================================================
INDICE
==================================================

1. TABLATICKETGENERALCONFILTRO
2. CREARTICKETCONFOTO
3. ACTUALIZACIONESTADOTICKET
4. ASIGNACIONTICKET
5. TICKETSPORUSUARIOSOPORTE

==================================================
*/


//1. TABLATICKETGENERALCONFILTROSOPORTE
router.get('/tickets/:page/:id_usuario/:idsoporte/:filtroTickets/:mesa/:idrol',validarToken ,ticketsControlador.losTickets );


//2. CREARTICKETCONFOTO
router.post('/tickets', upload.single('archivo') ,ticketsControlador.crearLosTickets);


//3. ACTUALIZACIONESTADOTICKET
router.patch('/tickets/estado',validarToken ,ticketsControlador.actualizarEstado);


//4. ASIGNACIONTICKET
router.patch('/tickets/:id',validarToken ,ticketsControlador.asignarLos);


//5. TICKETSPORUSUARIOSOPORTE
router.get('/filtro/:page/:id_usuario/:filtroTickets/:mesa', validarToken,ticketsControlador.ticketsPorUsuarioSoporte)


module.exports = router;
    