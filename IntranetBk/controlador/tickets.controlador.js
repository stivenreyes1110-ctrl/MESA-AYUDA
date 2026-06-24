const sql = require('mssql');
const { conexion } = require('../config/db');
const ticketsServie = require('../servicios/tickets.servicios')


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
const losTickets = async (req, res) => {
  try {


    console.log('SE HIZO UNA CONSULTA DE TICKETS')


    const { page } = req.params;
    const { id_usuario } = req.params;
    const { idsoporte } = req.params;
    const { filtroTickets } = req.params;
    const { mesa } = req.params;


    const ticket = await ticketsServie.losTickets(page, id_usuario, idsoporte, filtroTickets, mesa);


    res.json(ticket)


  } catch (error) {


    console.log(error)
    res.status(500).json({ error: 'Error del servidor' })


  }
}


//2. CREARTICKETCONFOTO
const crearLosTickets = async (req, res) => {
  try {


    console.log(req.body);
    const archivoUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/TICS/${req.file.filename}` : null


    console.log("BODY:", req.body);
    console.log("FILE:", req.file);


    datos = { ...req.body, archivoUrl }
    const data = await ticketsServie.crearLosTickets(datos);


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


//3. ACTUALIZACIONESTADOTICKET
const actualizarEstado = async (req, res) => {
  try {


    console.log("Entro a el endpoint")


    const pool = await conexion();


    const { estado, id_ticket, descripcion, id_usuario } = req.body;


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


    res.json({ ok: true, mensaje: "Estado actualizado" });


  } catch (error) {


    console.log(error);
    res.status(500).json({ ok: false, mensaje: "Error del servidor" });


  }
};


//4. ASIGNACIONTICKET
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





//5. TICKETSPORUSUARIOSOPORTE
const ticketsPorUsuarioSoporte = async (req, res) => {
  try {


    console.log("ENTRO A NUEVO ENDPOINT");


    const { page, id_usuario, filtroTickets, mesa } = req.params;


    const result = await ticketsServie.ticketsPorUsuarioSoporte(page,id_usuario,filtroTickets,mesa)


    return res.json(result);


  } catch (error) {


    console.log(error);
    res.status(500).json({ ok: false, mensaje: "Error del servidor" });


  }
}


module.exports = {


  losTickets,
  crearLosTickets,
  asignarLos,
  actualizarEstado,
  ticketsPorUsuarioSoporte,


}