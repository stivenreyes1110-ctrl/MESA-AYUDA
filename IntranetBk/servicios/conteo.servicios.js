const sql = require('mssql');
const { conexion } = require('../config/db')


/*
==================================================
INDICE
==================================================

1. LOSCONTEOSPORUSUARIO
2. LOSCONTEOSPORSOPORTE
3. CONTEODEDIFERENCIAPORTIEMPO
4. LOSCONTEOSINDIVIDUALPORSOPORTE

==================================================
*/


//1. LOSCONTEOSPORUSUARIO
const losConteoPorUsuairo = async (req) => {


  const pool = await conexion();


  const { id, mesa } = req.params;


  const query = `
                SELECT 


                    E.ESTADO,
                    ISNULL(COUNT(T.ESTADO),0) AS TOTAL


                FROM (


                    SELECT 1 AS ID, 'POR ASIGNAR' AS ESTADO


                    UNION ALL


                    SELECT 2, 'EN PROCESO'


                    UNION ALL


                    SELECT 3, 'SOLUCIONADO'


                ) E

                LEFT JOIN TICKETSMESA T 


                    ON T.ESTADO = E.ID
                    AND T.IDUSUARIO = @id
                    AND T.IDMESA = @mesa


                GROUP BY E.ID, E.ESTADO


                UNION ALL


                SELECT 


                    'TOTAL GENERAL',
                    COUNT(*)


                FROM TICKETSMESA

                WHERE IDUSUARIO = @id AND IDMESA = @mesa
                `
  const resultado = await pool.request()
    .input("id", sql.Int, id)
    .input("mesa", sql.Int, mesa)
    .query(query);

  return resultado.recordset;


};


//2. LOSCONTEOSPORSOPORTE
const losConteos = async (req) => {


  const pool = await conexion();


  const { id_rol, mesa,id_soporte } = req.params;


  let where = `WHERE T.IDMESA = @mesa`;


  // SOPORTE: solo tickets asignados a él
  if (Number(id_rol) === 2) {
    where += ` AND T.IDSOPORTE = @id_soporte`;
  }



  const query = `        
                  SELECT 
                  CASE T.ESTADO

                    WHEN 1 THEN 'PENDIENTE'
                    WHEN 2 THEN 'EN PROCESO'
                    WHEN 3 THEN 'SOLUCIONADO'
                    ELSE 'SIN ESTADO'
                    END AS ESTADO,

                    COUNT(*) AS TOTAL

                  FROM TICKETSMESA T

                  ${where}

                  GROUP BY T.ESTADO


                  UNION ALL


                  SELECT 

                      'TOTAL GENERAL' AS ESTADO,

                      COUNT(*) AS TOTAL

                  FROM TICKETSMESA T

                  ${where}
        `


  const resultado = await pool.request()
    .input("id_rol", sql.Int, id_rol)
    .input("mesa", sql.Int, mesa)
    .input("id_soporte", sql.Int, id_soporte)
    .query(query)


  return resultado.recordset


}


//3. CONTEODEDIFERENCIAPORTIEMPO
const lasDiferencia = async () => {


  const pool = await conexion()


  const query = `
                SELECT 

                *,
                DATEDIFF(MINUTE,HORAREGISTRO,HORACIERRE) AS HORA_DIFF

                FROM TICKETSMESA

                WHERE ID >= 299
                `


  const resulta = await pool.request()
    .query(query)


  return resulta.recordset;


}


//4. LOSCONTEOSINDIVIDUALPORSOPORTE
const losConteosDeTickets = async (req, res) => {


  const pool = await conexion();


  const { mesa } = req.params


  const query = `
                SELECT 
                CASE T.IDSOPORTE
                    WHEN 5 THEN 'CLAUDIA '
                    WHEN 6 THEN 'ALEJANDRO '
                    WHEN 7 THEN 'STEVENS'
                    WHEN 8 THEN 'MONICA'
                    WHEN 9 THEN 'YEFERSON'
                    WHEN 10 THEN 'NICOL'

                    WHEN 11 THEN 'HERNAN'
                    WHEN 12 THEN 'BERTULIO'

                    WHEN 13 THEN 'KAROL'
                    WHEN 14 THEN 'FABIAN'

                    WHEN 15 THEN 'WILLIAN'
                    WHEN 16 THEN 'HECTOR'

                      ELSE 'SIN ASIGNAR'

                END AS IDSOPORTE,

                COUNT(*) AS TOTAL

                FROM TICKETSMESA T

                WHERE IDMESA = @mesa

                GROUP BY T.IDSOPORTE
                ORDER BY TOTAL DESC
                `


  const resultado = await pool.request()
    .input('mesa', sql.VarChar, mesa)
    .query(query)


  return resultado.recordset;


}


module.exports = {

  losConteos,
  losConteoPorUsuairo,
  losConteosDeTickets,
  lasDiferencia

}