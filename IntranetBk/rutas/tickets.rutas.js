const express = require('express');
const router = express.Router();



const ticketsControlador = require('../controlador/tickets.controlador');
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

//RUTAS DE TICKETS


router.get('/tickets/:page/:id_usuario/:idsoporte/:filtroTickets', ticketsControlador.losTickets );


/*router.get('/tickets/usuario/:page/:id_usuario', ticketsControlador.losTicketsUsuarios);*/


router.post('/tickets', upload.single('archivo') ,ticketsControlador.crearLosTickets);


router.patch('/tickets/estado', ticketsControlador.actualizarEstado);


router.patch('/tickets/:id', ticketsControlador.asignarLos);


module.exports = router;
    