const sql  =  require('mssql')
const { conexion } = require('../config/db')


//SERVICIOS DE SEDES
const lasSedes = async () =>{


    await conexion()


    console.log('--SE HIZO UNA CONSULTA DE SEDES')


    const resultado = await sql.query(`


        SELECT * FROM SEDESCLB 
        

        `)

        return resultado.recordset


}


module.exports = {


    lasSedes

    
}