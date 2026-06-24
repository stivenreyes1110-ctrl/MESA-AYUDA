const sql = require('mssql');
const express = require('express');
const cors = require('cors');
const path = require('path');


const { conexion } = require("./config/db");
const validarToken = require('./middleware/validar.token');


const rutaUsuarios = require('./rutas/usuario.rutas');
const rutaTickets = require('./rutas/tickets.rutas');
const rutaMesa = require('./rutas/mesas.rutas');
const rutaAreas = require('./rutas/areas.rutas');
const rutaIncidentes = require('./rutas/incidentes.rutas');
const rutaSedes = require('./rutas/sedes.rutas');
const rutaConteo = require('./rutas/conteo.rutas');
const rutaLogin = require('./rutas/login.rutas');


const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());


app.use('/api', rutaUsuarios);
app.use('/api', rutaTickets);
app.use('/api', rutaMesa);
app.use('/api', rutaAreas);
app.use('/api', rutaIncidentes);
app.use('/api', rutaSedes);
app.use('/api', rutaConteo);
app.use('/api', rutaLogin);


app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


app.listen(3011, "0.0.0.0", () => {
  console.log('🚀 Servidor en puerto 3011');
});