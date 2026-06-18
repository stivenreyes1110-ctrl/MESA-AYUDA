const sql = require('mssql');
const express = require('express');
const cors = require('cors');
const multer = require('multer')
const { conexion } = require("./config/db")
const path = require('path')

const app = express();
app.set('trust proxy', true);
app.use(cors());


const validarToken = require('./middleware/validar.token');




const rutaUsuarios = require('./rutas/usuario.rutas');
const rutaTickets = require('./rutas/tickets.rutas');
const rutaMesa = require('./rutas/mesas.rutas');
const rutaAreas = require('./rutas/areas.rutas');
const rutaIncidentes = require('./rutas/incidentes.rutas');
const rutaSedes = require('./rutas/sedes.rutas');
const rutaConteo = require('./rutas/conteo.rutas');
const rutaLogin = require('./rutas/login.rutas');


app.use(express.json());


app.use('/api', rutaUsuarios);
app.use('/api', rutaTickets);
app.use('/api', rutaMesa);
app.use('/api', rutaAreas);
app.use('/api', rutaIncidentes);
app.use('/api', rutaSedes);
app.use('/api', rutaConteo)
app.use('/api', rutaLogin)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

//2. TICKETS PRINCIPAL MESA AYUDA
app.get('/api/filtro/:page/:id_usuario/:filtroTickets/:mesa', validarToken, async (req, res) => {
    try {



        let anexo = "";


        const { page, id_usuario, filtroTickets,mesa } = req.params;


        console.log("2.ENTRO A TICKETS MESA DE AYUDA POR USUARIO:", id_usuario, "PAGE:", page, "FILTRO TICKETS: ", filtroTickets ,'mesa', mesa);
        console.log(" ")
        console.log(" ")

        if (filtroTickets === '1' || filtroTickets === '2' || filtroTickets === '3') {


            anexo = `  AND T.ESTADO = ${filtroTickets}  AND T.IDMESA = ${mesa}`


        } else {


            anexo = `  AND T.IDMESA = ${mesa}` ;


        }

        let  query = `
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

                WHERE U.ID = @id_usuario ${anexo}

                ORDER BY T.ID DESC    

                OFFSET ${(page - 1) * 10} ROWS
                FETCH NEXT 10 ROWS ONLY;


`
        const pool = await conexion();


        const result = await pool.request()
            .input("id_usuario", sql.Int, id_usuario)
            .input("page", sql.Int, page)
            .query(query)

        console.log(query)


        await res.json(result.recordset);


    } catch (error) {


        console.log(error);


        res.status(500).json({


            error: "Error del servidor"


        });
    }
});

app.listen(3011,"0.0.0.0", () => {
    console.log('🚀 Servidor en puerto 3011');
    console.log(" ");
    console.log(" ");
});             