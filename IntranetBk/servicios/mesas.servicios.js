const sql = require('mssql');
const { conexion } = require('../config/db');

const lasMesas = async() =>{
    await conexion();

    const resultado = await sql.query(`
        SELECT * FROM MESASAYUDA
        `);
    return resultado.recordset;
}


module.exports = {lasMesas};