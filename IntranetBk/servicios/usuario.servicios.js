const sql = require('mssql');
const { conexion } = require('../config/db');


/*
==================================================
INDICE
==================================================

1. LOSUSUARIOS
2. LOSSOPORTES

==================================================
*/


// 1. LOSUSUARIOS
const losUsuarios = async () => {

    
    const pool = await conexion();


    const query =`
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
                `


    console.log('-- CONSULTA DE USUARIOS');


    const resultado = await pool.query();


    return resultado.recordset;


};



// 2. LOSSOPORTES
const losSoportes = async (mesa) => {

    
    const pool = await conexion();


    const query =`
                    SELECT 
                        S.ID AS IDSOPORTE,
                        S.IDMESA,
                        U.ID AS IDUSUARIO,
                        U.NOMBRE,
                        U.USUARIO,
                        U.ESTADO,
                        U.IDROL


                    FROM SOPORTESMESA S


                    INNER JOIN USUARIOSMESA U


                    ON S.IDUSUARIO = U.ID


                    WHERE U.IDROL = 2 AND S.IDMESA = @mesa;
                `


    console.log('-- CONSULTA DE SOPORTES');
    

    const resultado = await sql.query(query)
    .input('mesa',sql.Int,mesa);


    return resultado.recordset;


};


module.exports = {


    losUsuarios,
    losSoportes

    
};