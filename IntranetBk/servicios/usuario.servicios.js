const sql = require('mssql');
const { conexion } = require('../config/db');


//1. SERVICIOS DE USUARIOS
const losUsuarios = async () => {


    await conexion();

    console.log('--SE HIZO UNA CONSULTA DE USUARIOS')


    const resultado = await sql.query(`


    SELECT 
        U.ID AS IDUSUARIO,
        U.NOMBRE,
        U.USUARIO,
        U.ESTADO,
        U.IDROL,

        S.ID AS IDSOPORTE,
        S.IDMESA

    FROM USUARIOSMESA U

    LEFT JOIN SOPORTESMESA S
    ON U.ID = S.IDUSUARIO;


        `);



    return resultado.recordset


}











const LosSoportes = async () => {
    await conexion();

    const resultado = await sql.query(`
          SELECT 
            S.ID,
            S.IDMESA,
            U.ID AS IDUSUARIO,
            U.NOMBRE,
            U.USUARIO,
            U.ESTADO,
            U.IDROL
        FROM SOPORTESMESA S
        INNER JOIN USUARIOSMESA U
            ON S.IDUSUARIO = U.ID
        WHERE U.IDROL = 2;
        `);

    return resultado.recordset
}



module.exports = { losUsuarios, LosSoportes };