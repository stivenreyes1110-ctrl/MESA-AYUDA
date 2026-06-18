// ======================================================
// 1. IMPORTACIÓN DE LIBRERÍAS Y CONFIGURACIÓN
// ======================================================

const sql = require('mssql');

const { conexion } = require('../config/db');




// ======================================================
// 2. SERVICIO: CONSULTAR TICKETS
// ======================================================

const losTickets = async (
    page,
    id_usuario,
    idsoporte,
    filtroTickets
) => {


    
    // ======================================================
    // 2.1 REQUEST
    // ======================================================

    const pool = await conexion();
    const request = pool.request();



    // ======================================================
    // 2.1 LOGS DE CONTROL
    // ======================================================

    console.log(
        'ID USUARIO EN SERVICIO DE TICKETS:',
        id_usuario
    );

    console.log(
        'ID SOPORTE EN SERVICIO DE TICKETS:',
        idsoporte
    );

    console.log(
        'PAGE EN SERVICIO DE TICKETS:',
        page
    );

    console.log(
        'FILTRO EN SERVICIO DE TICKETS:',
        filtroTickets
    );




    // ======================================================
    // 2.2 VARIABLES PARA ARMAR FILTROS SQL
    // ======================================================

    let anexo = '';

    let anexo2 = '';




    // ======================================================
    // 2.3 VALIDACIÓN DE USUARIOS SOPORTE
    // Estos usuarios ven únicamente los tickets asignados
    // a su soporte.
    // ======================================================

    if (
        id_usuario == 372 ||
        id_usuario == 531 ||
        id_usuario == 972 ||
        id_usuario == 1892
    ) {

        anexo = `
            WHERE T.IDSOPORTE = ${idsoporte}
        `;



        // --------------------------------------------------
        // 2.3.1 Filtro por estado del ticket
        // --------------------------------------------------

        if (
            filtroTickets === '1' ||
            filtroTickets === '2' ||
            filtroTickets === '3'
        ) {

            anexo2 = `
                AND T.ESTADO = ${filtroTickets}
            `;

        }

    } else {



        // ======================================================
        // 2.4 USUARIOS NO SOPORTE
        // Pueden ver todos los tickets según el filtro elegido.
        // ======================================================

        anexo = "";



        // --------------------------------------------------
        // 2.4.1 Filtro por estado
        // --------------------------------------------------

        if (
            filtroTickets === '1' ||
            filtroTickets === '2' ||
            filtroTickets === '3'
        ) {

            anexo2 = `
                WHERE T.ESTADO = ${filtroTickets}
            `;

        } else {

            anexo2 = ``;

        }

    }




    // ======================================================
    // 2.5 CONSULTA SQL PRINCIPAL
    // ======================================================

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

        ORDER BY T.ID DESC

        OFFSET ${(page - 1) * 10} ROWS

        FETCH NEXT 10 ROWS ONLY;

    `);




    // ======================================================
    // 2.6 RETORNAR RESULTADO AL CONTROLADOR
    // ======================================================

    return resultado.recordset;

};




// ======================================================
// 3. SERVICIO: CREAR TICKET
// ======================================================

const crearLosTickets = async (datos) => {

    await conexion();




    // ======================================================
    // 3.1 CREAR REQUEST SQL
    // ======================================================

    const request = new sql.Request();




    // ======================================================
    // 3.2 PARÁMETROS RECIBIDOS DESDE EL BODY
    // ======================================================

    request.input(
        "incidente",
        sql.Int,
        datos.incidente
    );

    request.input(
        "area",
        sql.Int,
        datos.area
    );

    request.input(
        "sede",
        sql.Int,
        datos.sede
    );

    request.input(
        "prioridad",
        sql.VarChar,
        datos.prioridad
    );

    request.input(
        "descripcion",
        sql.VarChar,
        datos.descripcion
    );

    request.input(
        "ubicacion",
        sql.VarChar,
        datos.ubicacion
    );

    request.input(
        "direccion",
        sql.VarChar,
        datos.direccion
    );

    request.input(
        "idusuario",
        sql.Int,
        datos.idusuario
    );

    request.input(
        "archivoUrl",
        sql.VarChar,
        datos.archivoUrl
    );
    request.input(
        "mesa",
        sql.Int,
        datos.mesa
    )




    // ======================================================
    // 3.3 INSERTAR NUEVO TICKET
    // Estado 1 = Pendiente
    // IDMESA 1 = Mesa TIC
    // IDMESA 2 = Mesa BIOMEDICA
    // ======================================================

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

    `);




    // ======================================================
    // 3.4 RETORNAR RESULTADO
    // ======================================================

    return resultado;

};




// ======================================================
// 4. SERVICIO: ASIGNAR USUARIO SOPORTE A UN TICKET
// ======================================================

const asiganrUsuarios = async (datos) => {

    const pool = await conexion();




    // ======================================================
    // 4.1 OBTENER DATOS DEL REQUEST
    // ======================================================

    const ticketId = datos.params.id;

    const { usuario_id } = datos.body;




    // ======================================================
    // 4.2 LOGS DE CONTROL
    // ======================================================

    console.log(
        'Ticket:',
        ticketId
    );

    console.log(
        'Usuario asignado:',
        usuario_id
    );




    // ======================================================
    // 4.3 QUERY PARA ASIGNAR SOPORTE
    // También actualiza HORACIERRE con la fecha actual.
    // ======================================================

    const query = `

        UPDATE TICKETSMESA

        SET 
            IDSOPORTE = @usuario_id,
            HORACIERRE = GETDATE()

        WHERE ID = @idTicket

    `;




    // ======================================================
    // 4.4 EJECUTAR QUERY PARAMETRIZADO
    // ======================================================

    const request = pool.request();

    request.input(
        'usuario_id',
        sql.Int,
        usuario_id
    );

    request.input(
        'idTicket',
        sql.Int,
        ticketId
    );

    const resultado =
        await request.query(query);




    // ======================================================
    // 4.5 RETORNAR RESULTADO
    // ======================================================

    return resultado;

};




// ======================================================
// 5. SERVICIO: CONSULTAR TICKETS POR SOPORTE
// ======================================================

const ticketsPorUsuarioSoporte = async (id_soporte) => {

    const pool = await conexion();




    // ======================================================
    // 5.1 QUERY CONSULTA POR SOPORTE
    // ======================================================

    const query = `

        SELECT *

        FROM TICKETSMESA

        WHERE IDSOPORTE = @id_soporte

        WHERE IDMESA = 2

    `;



    // OJO:
    // Actualmente esta función está incompleta.
    // Falta ejecutar el request y retornar los datos.

};




// ======================================================
// 6. EXPORTACIÓN DE SERVICIOS
// ======================================================

module.exports = {

    losTickets,
    crearLosTickets,
    asiganrUsuarios,
    ticketsPorUsuarioSoporte

};