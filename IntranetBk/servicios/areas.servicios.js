const sql = require('mssql');
const {conexion} = require('../config/db');


//2. SERVICIOS DE AREAS
const lasAreas = async () =>{


    await conexion();


    console.log('--SE HIZO UNA CONSULTA DE AREAS')


    const resultado =  await sql.query(`


        SELECT 
            A.ID,
            A.NOMBRE,
            A.PISO,
            A.IDSEDE,
            S.NOMBRE AS SEDE
        FROM AREASCLB A
        INNER JOIN SEDESCLB S
            ON A.IDSEDE = S.ID


        `)


    return resultado.recordset


}


module.exports = {


    lasAreas


}