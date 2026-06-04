const sql = require('mssql');
const { conexion } = require('../config/db');

const losTickets = async (page, id_usuario, idsoporte, filtroTickets) => {
    await conexion();
    console.log('ID USUARIO EN SERVICIO DE TICKETS:', id_usuario);
    console.log('ID SOPORTE EN SERVICIO DE TICKETS:', idsoporte);
    console.log('PAGE EN SERVICIO DE TICKETS:', page);
    console.log('filtro', filtroTickets)
    let anexo = '';
    let anexo2 = '';
    if (id_usuario == 372 || id_usuario == 531 || id_usuario == 972 || id_usuario == 1892) {
        anexo = `WHERE T.IDSOPORTE  = ${idsoporte}`;
        if (filtroTickets === '1' || filtroTickets === '2' || filtroTickets === '3') {
            anexo2 = `  AND T.ESTADO = ${filtroTickets} `
        }

    } else {
        anexo = "";
        if (filtroTickets === '1' || filtroTickets === '2' || filtroTickets === '3') {
            anexo2 = `  WHERE T.ESTADO = ${filtroTickets} `
        } else {
            anexo2 = ``
        }
    }



    const resultado = await sql.query(`
SELECT 
    T.ID AS ID_TICKET,
    T.DIRIP,
    T.UBICACIONFISICA,
    T.HORAREGISTRO,
    T.HORACIERRE,
    T.PRIORIDAD,
    T.DESCRIPCION,
    T.CONTESTACION,
    T.IDSOPORTE,
    US.NOMBRE AS USUARIO_ASIGNADO,

    I.NOMBRE AS INCIDENTE,
    A.NOMBRE AS AREA,
    SD.NOMBRE AS SEDE,
    M.NOMBRE AS MESA_AYUDA,
    U.NOMBRE AS USUARIO_SOLICITANTE,

    CASE 
        WHEN T.ESTADO = 1 THEN 'POR ASIGNAR'
        WHEN T.ESTADO = 2 THEN 'EN PROCESO'
        WHEN T.ESTADO = 3 THEN 'SOLUCIONADO'
        ELSE 'SIN ESTADO'
    END AS ESTADO

FROM TICKETSMESA T

LEFT JOIN INCIDENTESMESA I
    ON T.IDINCIDENTE = I.ID

LEFT JOIN AREASCLB A
    ON T.IDAREA = A.ID

LEFT JOIN SEDESCLB SD
    ON T.IDSEDE = SD.ID

LEFT JOIN MESASAYUDA M
    ON T.IDMESA = M.ID

LEFT JOIN USUARIOSMESA U
    ON T.IDUSUARIO = U.ID

LEFT JOIN SOPORTESMESA S
    ON T.IDSOPORTE = S.ID

LEFT JOIN USUARIOSMESA US
    ON S.IDUSUARIO = US.ID
    ${anexo}
    ${anexo2}
ORDER BY T.HORAREGISTRO DESC

OFFSET ${(page - 1) * 10} ROWS
FETCH NEXT 10 ROWS ONLY;

        `)

    return resultado.recordset
}

const crearLosTickets = async (datos) => {

    await conexion();

    const request = new sql.Request();

    request.input("incidente", sql.Int, datos.incidente);
    request.input("area", sql.Int, datos.area);
    request.input("sede", sql.Int, datos.sede);
    request.input("prioridad", sql.VarChar, datos.prioridad);
    request.input("descripcion", sql.VarChar, datos.descripcion);
    request.input("ubicacion", sql.VarChar, datos.ubicacion);
    request.input("direccion", sql.VarChar, datos.direccion);
    request.input("idusuario", sql.Int, datos.logeo.id_usuario);


    const resultado = await request.query(`
    INSERT INTO TICKETSMESA
    (
      IDINCIDENTE,
      IDAREA,
      IDSEDE,
      PRIORIDAD,
      DESCRIPCION,
      UBICACIONFISICA,
      ESTADO,
      DIRIP,
      IDUSUARIO,
      IDMESA
    )
    VALUES
    (
      @incidente,
      @area,
      @sede,
      @prioridad,
      @descripcion,
      @ubicacion,
      1,
        @direccion,
      @idusuario,
      1
      
    )
  `);

    return resultado;
};

const asiganrUsuarios = async (datos) => {

    const pool = await conexion();

    const ticketId = datos.params.id;
    const { usuario_id } = datos.body;


    console.log('Ticket', ticketId);
    console.log('Usuario', usuario_id);

    const query = `
    UPDATE TICKETSMESA
    SET IDSOPORTE = @usuario_id,
        HORACIERRE = GETDATE()
    WHERE ID = @idTicket
  `;

    const request = pool.request();

    request.input('usuario_id', sql.Int, usuario_id);
    request.input('idTicket', sql.Int, ticketId);

    const resultado = await request.query(query);

    return resultado;
}


const ticketsPorUsuarioSoporte = async (id_soporte) => {
    const pool = await conexion();
    const query = `
          SELECT * FROM TICKETSMESA
          WHERE IDSOPORTE = @id_soporte
        `;
}
/*const losTicketsUsuarios = async (page, id_usuario ) => {


    const pool = await conexion();

    page = Number(page);
    id_usuario = Number(id_usuario);

if (isNaN(page) || isNaN(id_usuario)) {
   return res.status(400).json({
      error: "Parámetros inválidos"
   });
}
    const limit = 10;
    const offset = (page - 1) * limit;

    const result = await pool.request()
      .input("id_usuario", sql.Int, id_usuario)
      .query(`

        SELECT 
            T.ID AS ID_TICKET,
            T.DIRIP,
            T.UBICACIONFISICA,
            T.HORAREGISTRO,
            T.HORACIERRE,
            T.PRIORIDAD,
            T.DESCRIPCION,
            T.CONTESTACION, 

            US.NOMBRE AS USUARIO_ASIGNADO,

            I.NOMBRE AS INCIDENTE,
            A.NOMBRE AS AREA,
            SD.NOMBRE AS SEDE,
            M.NOMBRE AS MESA_AYUDA,
            U.NOMBRE AS USUARIO_SOLICITANTE,

            CASE 
                WHEN T.ESTADO = 1 THEN 'POR ASIGNAR'
                WHEN T.ESTADO = 2 THEN 'EN PROCESO'
                WHEN T.ESTADO = 3 THEN 'SOLUCIONADO'
                ELSE 'SIN ESTADO'
            END AS ESTADO

        FROM TICKETSMESA T

        LEFT JOIN INCIDENTESMESA I
            ON T.IDINCIDENTE = I.ID

        LEFT JOIN AREASCLB A
            ON T.IDAREA = A.ID

        LEFT JOIN SEDESCLB SD
            ON T.IDSEDE = SD.ID

        LEFT JOIN MESASAYUDA M
            ON T.IDMESA = M.ID

        LEFT JOIN USUARIOSMESA U
            ON T.IDUSUARIO = U.ID

        LEFT JOIN SOPORTESMESA S
            ON T.IDSOPORTE = S.ID

        LEFT JOIN USUARIOSMESA US
            ON S.IDUSUARIO = US.ID

       WHERE T.IDUSUARIO = @id_usuario

        ORDER BY T.ID DESC

        OFFSET ${(page - 1) * 10} ROWS
        FETCH NEXT 10 ROWS ONLY;

  

      `);

    return result.recordset;
}
*/

module.exports = { losTickets, crearLosTickets, asiganrUsuarios, ticketsPorUsuarioSoporte/*, losTicketsUsuarios */ };