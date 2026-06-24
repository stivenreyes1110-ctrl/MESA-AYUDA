const sql = require("mssql");


const { conexion } = require('../config/db');


/*
==================================================
INDICE
==================================================

1. INCIDENTESPORMESA

==================================================
*/


//1. INCIDENTESPORMESA
const losIncidentes = async () => {


    const pool = await conexion();


    console.log('--SE HIZO UNA CONSULTA DE INCIDENTES')
    console.log(" ");
    console.log(" ");


    const resultado = await pool.query(
        `

        
        SELECT * FROM INCIDENTESMESA


        `
    )


    return resultado.recordset


}


module.exports = {


    losIncidentes


}
