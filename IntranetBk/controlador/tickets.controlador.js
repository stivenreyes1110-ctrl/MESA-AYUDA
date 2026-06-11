const sql = require('mssql');
const { conexion } = require('../config/db');
const ticketsServie = require('../servicios/tickets.servicios')


const losTickets = async (req, res) => {
  try {
    console.log('SE HIZO UNA CONSULTA DE TICKETS')
    const { page } = req.params;
    const { id_usuario } = req.params;
    const { idsoporte } = req.params;
    const { filtroTickets } = req.params;
    const ticket = await ticketsServie.losTickets(page, id_usuario, idsoporte, filtroTickets);
    res.json(ticket)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Error del servidor'
    })
  }
}

const crearLosTickets = async (req, res) => {
  try {

    console.log(req.body);

    const data = await ticketsServie.crearLosTickets(req.body);

    res.json({
      ok: true,
      mensaje: "Ticket creado",
      data
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      ok: false,
      mensaje: error.message
    });

  }
};

const asignarLos = async (req, res) => {
  try {
    console.log('SE HIZO UNA ASIGNACION DE TICKETS')
    const data = await ticketsServie.asiganrUsuarios(req);
    res.json({
      ok: true,
      mensaje: "se asigno el ticket",
      data
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, mensaje: "Error al asignar ticket" });
  }
}

const actualizarEstado = async (req, res) => {
  try {
    console.log("Entro a el endpoint")
    const pool = await conexion();
    const { estado, id_ticket, descripcion,id_usuario } = req.body;
    const query = `
  UPDATE TICKETSMESA 
  SET ESTADO = @estado,
      CONTESTACION = @descripcion,
      HORACIERRE = GETDATE()
  WHERE ID = @id_ticket;

  INSERT INTO HISTORIALTICKETSMESA 
  (IDTICKET, ESTADO_ANTERIOR, ESTADO_NUEVO, FECHA_CAMBIO, IDUSUARIO, OBSERVACION)
  VALUES
  (@id_ticket, NULL, @estado, GETDATE(), @id_usuario, @descripcion);
`;

    const registro = ``
    console.log(req.body)
    await pool.request()
      .input("estado", sql.Int, estado)
      .input("id_ticket", sql.Int, id_ticket)
      .input("descripcion", sql.VarChar(999), descripcion)
      .input("id_usuario", sql.Int, id_usuario)
      .query(query, registro);
    console.log(query)
    res.json({ ok: true, mensaje: "Estado actualizado" });
    console.log("LLEGO")
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, mensaje: "Error del servidor" });
  }
};

const ticketsPorUsuarioSoporte = async (req, res) => {
  try {
    console.log("ENTRO A NUEVO ENDPOINT");
    const pool = await conexion();
    const { id_soporte } = req.params;
    const result = await pool.request()
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, mensaje: "Error del servidor" });
  }

}


/*
const losTicketsUsuarios = async (req, res) => {
  try {
    console.log("ENTRO A LOS TICKET DE USUARIO");
    const pool = await conexion();
    const { id_usuario } = req.params; 
    const { page } = req.params;
     const ticketUsuario = await ticketsServie.losTicketsUsuarios(page,id_usuario);
    const result = await pool.request()
  } catch (error) {
    console.log(error);
  }
}
*/

module.exports = {
  losTickets,
  crearLosTickets,
  asignarLos,
  actualizarEstado,
  ticketsPorUsuarioSoporte,
  /* losTicketsUsuarios*/
}