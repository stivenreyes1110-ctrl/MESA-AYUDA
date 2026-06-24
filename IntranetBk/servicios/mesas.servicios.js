const sql = require('mssql');
const { conexion } = require('../config/db');


/*
==================================================
INDICE
==================================================

1. MESASDEAYUDA

==================================================
*/


//1. MESASDEAYUDA
const lasMesas = async() =>{

    const pool = await conexion();


    const query =   `
                    SELECT * FROM MESASAYUDA
                    `

                    
    const resultado = await pool.request
    .query(query);


    return resultado.recordset;


}


module.exports = {lasMesas};