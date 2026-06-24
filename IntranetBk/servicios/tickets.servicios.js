const sql = require('mssql');

const { conexion } = require('../config/db');


/*
==================================================
INDICE
==================================================

1. TABLATICKETGENERALCONFILTROSOPORTE
2. CREARTICKETCONFOTO
3. ACTUALIZACIONESTADOTICKET
4. ASIGNACIONTICKET
5. TICKETSPORUSUARIOSOPORTE

==================================================
*/


//1. TABLATICKETGENERALCONFILTROSOPORTE
const losTickets = async (
  page,
  id_usuario,
  idsoporte,
  filtroTickets,
  mesa,
  idrol
) => {

    
  const pool = await conexion();


  const offset = (Number(page) - 1) * 10;


  let where = `WHERE T.IDMESA = @mesa`;


  // SOPORTE: solo tickets asignados a él
  if (Number(idrol) === 2) {
    where += ` AND T.IDSOPORTE = @idsoporte`;
  }

  // FILTRO DE ESTADO: 1 pendiente, 2 proceso, 3 solucionado
  if (["1", "2", "3"].includes(String(filtroTickets))) {
    where += ` AND T.ESTADO = @filtroTickets`;
  }



  const query = `
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
      T.IDMESA,
      US.NOMBRE AS USUARIO_ASIGNADO,
      T.ARCHIVO_URL,
      I.NOMBRE AS INCIDENTE,
      A.NOMBRE AS AREA,
      SD.NOMBRE AS SEDE,
      M.NOMBRE AS MESA_AYUDA,
      U.NOMBRE AS USUARIO_SOLICITANTE,
      CASE 
        WHEN T.ESTADO = 1 THEN 'PENDIENTE'
        WHEN T.ESTADO = 2 THEN 'EN PROCESO'
        WHEN T.ESTADO = 3 THEN 'SOLUCIONADO'
        ELSE 'SIN ESTADO'
      END AS ESTADO
    FROM TICKETSMESA T
    LEFT JOIN INCIDENTESMESA I ON T.IDINCIDENTE = I.ID
    LEFT JOIN AREASCLB A ON T.IDAREA = A.ID
    LEFT JOIN SEDESCLB SD ON T.IDSEDE = SD.ID
    LEFT JOIN MESASAYUDA M ON T.IDMESA = M.ID
    LEFT JOIN USUARIOSMESA U ON T.IDUSUARIO = U.ID
    LEFT JOIN SOPORTESMESA S ON T.IDSOPORTE = S.ID
    LEFT JOIN USUARIOSMESA US ON S.IDUSUARIO = US.ID
    ${where}
    ORDER BY T.ID DESC
    OFFSET @offset ROWS
    FETCH NEXT 10 ROWS ONLY;
  `;

  console.log(query)
  const resultado = await pool.request()
    .input("id_usuario", sql.Int, Number(id_usuario))
    .input("idsoporte", sql.Int, Number(idsoporte))
    .input("filtroTickets", sql.Int, Number(filtroTickets))
    .input("mesa", sql.Int, Number(mesa))
    .input("offset", sql.Int, offset)
    .query(query);


  return resultado.recordset;


};


//2. CREARTICKETCONFOTO
const crearLosTickets = async (datos) => {

    
    const pool = await conexion();

    const query = `
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
                                        IDMESA,
                                        ARCHIVO_URL
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
                                        @mesa,
                                        @archivoUrl
                                    )
                                `

    const resultado = await pool.request()
                                input("mesa",sql.Int,datos.mesa)
                                .input("incidente",sql.Int,datos.incidente)
                                .input("area",sql.Int,datos.area)
                                .input("sede",sql.Int,datos.sede)
                                .input("prioridad",sql.VarChar,datos.prioridad)
                                .input("descripcion",sql.VarChar,datos.descripcion)
                                .input("ubicacion",sql.VarChar,datos.ubicacion)
                                .input("direccion",sql.VarChar,datos.direccion)
                                .input("idusuario",sql.Int,datos.idusuario)
                                .input("archivoUrl",sql.VarChar,datos.archivoUrl)
                                .query(query);


    return resultado;


};


//4. ASIGNACIONTICKET
const asiganrUsuarios = async (datos) => {

    const pool = await conexion();


    const ticketId = datos.params.id;


    const { usuario_id } = datos.body;


    const query = `

        UPDATE TICKETSMESA

        SET 
            IDSOPORTE = @usuario_id,
            HORACIERRE = GETDATE()

        WHERE ID = @idTicket

    `;


    const resultado = await pool.request()
    .input('usuario_id',sql.Int,usuario_id)
    .input('idTicket',sql.Int,ticketId)
    .query(query);


    return resultado;

};


//5. TICKETSPORUSUARIOSOPORTE
const ticketsPorUsuarioSoporte = async(page,id_usuario,filtroTickets,mesa)=>{


    const pool = await  conexion();

    
        let anexo = "";


    
        if (filtroTickets === '1' || filtroTickets === '2' || filtroTickets === '3') {


          anexo = `AND T.ESTADO = @filtroTickets AND T.IDMESA = @mesa`;


        } else {


          anexo = `AND T.IDMESA = @mesa`;


        }
    
    
        const query = `


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
                            T.IDMESA,
                    
                            US.NOMBRE AS USUARIO_ASIGNADO,
                            I.NOMBRE AS INCIDENTE,
                            A.NOMBRE AS AREA,
                            SD.NOMBRE AS SEDE,
                            M.NOMBRE AS MESA_AYUDA,
                    
                            U.ID AS ID_SOLICITANTE,
                            U.NOMBRE AS USUARIO_SOLICITANTE,
                    
                            CASE 
                            WHEN T.ESTADO = 1 THEN 'PENDIENTE'
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
                    
                        WHERE U.ID = @id_usuario
                        ${anexo}
                    
                        ORDER BY T.ID DESC    
                    
                        OFFSET ${(page - 1) * 10} ROWS
                        FETCH NEXT 10 ROWS ONLY;

                        
                        `;
    

        const result = await pool.request()
          .input("id_usuario", sql.Int, id_usuario)
          .input("filtroTickets", sql.Int, filtroTickets)
          .input("mesa", sql.Int, mesa)
          .input("page",sql.Int,page)
          .query(query);
    
    
        return result.recordset;
    
}


module.exports = {

    losTickets,
    crearLosTickets,
    asiganrUsuarios,
    ticketsPorUsuarioSoporte

};