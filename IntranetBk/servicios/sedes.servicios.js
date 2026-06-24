const sql  =  require('mssql')
const { conexion } = require('../config/db')


/*
==================================================
INDICE
==================================================

1. SEDES

==================================================
*/


//1. SEDES
const lasSedes = async () =>{


    const pool = await conexion()
    const query = `


                  SELECT * FROM SEDESCLB 
                    

                  `

    console.log('--SE HIZO UNA CONSULTA DE SEDES')


    const resultado = await pool.query(query)


    return resultado.recordset


}


module.exports = {


    lasSedes

    
}