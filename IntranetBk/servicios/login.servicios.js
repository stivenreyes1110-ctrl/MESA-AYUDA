require('dotenv').config();


const sql = require('mssql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { conexion } = require('../config/db');


const losLogin = async ({ usuario, password }, req) => {


    const pool = await conexion();


    let direccionIpUsuario =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;

    direccionIpUsuario = direccionIpUsuario.replace("::ffff:", "");

    console.log('--DIRECCION IP DEL USUARIO:', direccionIpUsuario);


    /*console.log("SERVIDOR DE LA BASE DE DATOS:", process.env.DB_SERVER);*/


    let consultaAcesso = `
            SELECT 
                U.ID AS IDUSUARIO,
                U.NOMBRE,
                U.USUARIO,
                U.ESTADO,
                U.IDROL,
                U.CONTRASENA,

                S.ID AS IDSOPORTE,
                S.IDMESA

            FROM USUARIOSMESA U

            LEFT JOIN SOPORTESMESA S
                ON U.ID = S.IDUSUARIO
            WHERE USUARIO = @usuario
        `


    const ejecucionConsulta = await pool.request()
        .input("usuario", sql.VarChar, usuario)
        .query(consultaAcesso);


    const usuarioConsultado = ejecucionConsulta.recordset[0];


    if (!usuarioConsultado) {
        throw new Error("Usuario no encontrado");
    }


    console.log('--ESTA INGRESANDO EL USUARIO:', usuarioConsultado.NOMBRE)
    console.log(" ");
    console.log(" ");


    const hashIngresado = crypto.createHash('sha256').update(password).digest('hex').toUpperCase();



    if (hashIngresado !== usuarioConsultado.CONTRASENA) {
        throw new Error("Contraseña incorrecta");
    }


    const token = jwt.sign(
        {
            id: usuarioConsultado.ID,
            usuario: usuarioConsultado.USUARIO
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );


    return {
        token,
        ip: direccionIpUsuario,
        id: usuarioConsultado.IDSOPORTE,
        id_usuario: usuarioConsultado.IDUSUARIO,
        usuario: usuarioConsultado.USUARIO,
        nombre: usuarioConsultado.NOMBRE,
        idrol: usuarioConsultado.IDROL,

    };


};


module.exports = {


    losLogin


};