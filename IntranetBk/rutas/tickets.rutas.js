const express = require('express');
const router = express.Router();



const ticketsControlador = require('../controlador/tickets.controlador');


//RUTAS DE TICKETS


router.get('/tickets/:page/:id_usuario/:idsoporte', ticketsControlador.losTickets );


/*router.get('/tickets/usuario/:page/:id_usuario', ticketsControlador.losTicketsUsuarios);*/


router.post('/tickets', ticketsControlador.crearLosTickets);


router.patch('/tickets/estado', ticketsControlador.actualizarEstado);


router.patch('/tickets/:id', ticketsControlador.asignarLos);


module.exports = router;
