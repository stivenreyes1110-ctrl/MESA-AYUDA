const sql = require('mssql');

const config = {
  user: 'BELEN',
  password: 'DGH2013',
  server: '128.0.13.1',
  database: 'MESAAYUDADB',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function conexion() {

  try {

    const pool = await sql.connect(config);


    return pool;

  } catch (error) {

    console.log(error);

  }

}

module.exports = {
  conexion
};