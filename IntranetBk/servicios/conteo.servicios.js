const sql = require('mssql');
const { conexion } = require('../config/db')

const losConteos = async (req) => {
  await conexion();
  const { id_rol } = req.params;
  let anexo = '';
  if (id_rol == 5 || id_rol == 6 || id_rol == 7 || id_rol == 9) {
    anexo = `WHERE T.IDSOPORTE = ${id_rol}`;
  }
  const resultado = await new sql.Request()
    .input("id_rol", sql.Int, id_rol)
    .query
    (`        
SELECT 
    CASE T.ESTADO
        WHEN 1 THEN 'POR ASIGNAR'
        WHEN 2 THEN 'EN PROCESO'
        WHEN 3 THEN 'SOLUCIONADO'
        ELSE 'SIN ESTADO'
    END AS ESTADO,

    COUNT(*) AS TOTAL

FROM TICKETSMESA T

${anexo}

GROUP BY T.ESTADO

UNION ALL

SELECT 
    'TOTAL GENERAL' AS ESTADO,

    COUNT(*) AS TOTAL

FROM TICKETSMESA T

${anexo}
        `)
  return resultado.recordset
}

const losConteoPorUsuairo = async (req) => {

  await conexion();

  const { id } = req.params;

  const resultado = await new sql.Request()
    .input("id", sql.Int, id)
    .query(`
    
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

      GROUP BY E.ID, E.ESTADO

      UNION ALL

      SELECT 
          'TOTAL GENERAL',
          COUNT(*)
      FROM TICKETSMESA
      WHERE IDUSUARIO = @id
    
    `);

  return resultado.recordset;
};

module.exports = {
  losConteos,
  losConteoPorUsuairo
}