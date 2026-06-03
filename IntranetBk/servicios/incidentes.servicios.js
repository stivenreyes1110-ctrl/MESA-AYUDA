const sql = require("mssql");


const { conexion } = require('../config/db');


//SERVICIOS DE INCIDENTES
const losIncidentes = async () => {


    await conexion();


    console.log('--SE HIZO UNA CONSULTA DE INCIDENTES')


    const resultado = await sql.query(
        `

        
        SELECT * FROM INCIDENTESMESA


        `
    )


    return resultado.recordset


}


module.exports = {


    losIncidentes

    
}
