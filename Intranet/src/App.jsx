// ======================================================
// 1. IMPORTACIONES
// ======================================================
import { useState, useEffect } from 'react';

import Slider from './slider';
import Login from './login';

import './App.css';



// ======================================================
// 2. COMPONENTE PRINCIPAL
// ======================================================
function App() {



  // ======================================================
  // 2.1 CONFIGURACIÓN GENERAL
  // ======================================================

  const IPBASE = 'http://128.0.18.50:3011';



  // ======================================================
  // 2.2 VARIABLES DE AUTENTICACIÓN
  // ======================================================

  const [logeado, setLogeado] = useState(false);

  const [logeo, setLogeo] = useState([]);




  // ======================================================
  // 2.3 VARIABLES MAESTRAS
  // ======================================================

  const [areas, setAreas] = useState([]);

  const [sedes, setSedes] = useState([]);

  const [usuarios, setUsuarios] = useState([]);

  const [incidentes, setIncidentes] = useState([]);




  // ======================================================
  // 2.4 VARIABLES DE TICKETS
  // ======================================================

  const [tickets, setTickets] = useState([]);

  const [filtroTickets, setFiltroTickets] = useState('3');

  const [page, setPage] = useState(1);




  // ======================================================
  // 2.5 VARIABLES DE DASHBOARD
  // ======================================================

  const [conteo, setConteo] = useState([]);




  // ======================================================
  // 2.6 VARIABLES DERIVADAS
  // ======================================================

  const mesa = logeo.mesa;




  // ======================================================
  // 3. INICIALIZACIÓN DE SESIÓN
  // ======================================================

  useEffect(() => {

    const iniciarFetchPrincipales = async () => {

      try {

        const usuarioGuardado =
          localStorage.getItem("usuario");



        if (usuarioGuardado) {

          const usuario =
            JSON.parse(usuarioGuardado);

          setLogeo(usuario);

          setLogeado(true);

          console.log(
            "SE ESTAN INCIANDO LOS FETCH PRINCIPALES"
          );

          console.log(
            "1.DATOS DE LOGEO:",
            usuario
          );

        }

      } catch (error) {

        console.log(
          "Error al iniciar sesión:",
          error
        );

      }

    };

    iniciarFetchPrincipales();

  }, []);




  // ======================================================
  // 4. FETCH AREAS
  // ======================================================

  const getArea = async () => {

    try {

      const respuesta = await fetch(
        `${IPBASE}/api/areas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              `Bearer ${logeo.token}`
          }
        }
      );

      if (!respuesta.ok) {

        throw new Error(
          "Error al obtener áreas"
        );

      }

      const data =
        await respuesta.json();

      setAreas(data);

      console.log(
        "2.DATOS DE ÁREAS:",
        data
      );

      return data;

    } catch (error) {

      console.log(error);

      cerrarSesion();

    }

  };




  // ======================================================
  // 5. FETCH SEDES
  // ======================================================

  const getSede = async () => {

    try {

      const respuesta = await fetch(
        `${IPBASE}/api/sedes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              `Bearer ${logeo.token}`
          }
        }
      );

      const data =
        await respuesta.json();

      setSedes(data);

      console.log(
        "3.DATOS DE SEDES:",
        data
      );

      return data;

    } catch (error) {

      console.log(error);

      cerrarSesion();

    }

  };




  // ======================================================
  // 6. FETCH USUARIOS
  // ======================================================

  const getUsuarios = async () => {

    try {

      const respuesta = await fetch(
        `${IPBASE}/api/usuarios`,
        {
          method: "GET",
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

      const data =
        await respuesta.json();

      setUsuarios(data);

      console.log(
        "4.DATOS DE USUARIOS:",
        data
      );

      return data;

    } catch (error) {

      console.log(error);

      cerrarSesion();

    }

  };




  // ======================================================
  // 7. FETCH INCIDENTES
  // ======================================================

  const getIncidentes = async () => {

    try {

      const respuesta = await fetch(
        `${IPBASE}/api/incidentes`,
        {
          method: "GET",
          headers: {
            "Content-Type":
              "application/json",
            "Authorization":
              `Bearer ${logeo.token}`
          }
        }
      );

      const data =
        await respuesta.json();

      setIncidentes(data);

      console.log(
        "5.DATOS DE INCIDENTES:",
        data
      );

      return data;

    } catch (error) {

      console.log(error);

      cerrarSesion();

    }

  };




  // ======================================================
  // 8. FETCH TICKETS
  // ======================================================

  const getTickets = async (
    page,
    id_usuario
  ) => {

    try {

      const respuesta = await fetch(
        `${IPBASE}/api/filtro/${page}/${id_usuario}/${filtroTickets}/${mesa}`,
        {
          method: "GET",
          headers: {
            "Content-Type":
              "application/json",
            "Authorization":
              `Bearer ${logeo.token}`
          }
        }
      );

      const data =
        await respuesta.json();

      setTickets(data);

      console.log(
        "6.DATOS DE TICKETS:",
        data
      );

      return data;

    } catch (error) {

      console.log(error);

      cerrarSesion();

    }

  };




  // ======================================================
  // 9. FETCH CONTEO DASHBOARD
  // ======================================================

  const getConteo = async (id) => {

    try {

      const respuesta = await fetch(
        `${IPBASE}/api/conteo/usuario/${id}/${mesa}`
      );

      const data =
        await respuesta.json();

      setConteo(data);

      console.log(
        "7.DATOS DE CONTEO:",
        data
      );

      return data;

    } catch (error) {

      console.log(error);

      cerrarSesion();

    }

  };




  // ======================================================
  // 10. UTILIDADES
  // ======================================================

  const cerrarSesion = () => {

    setLogeado(false);

    localStorage.removeItem("token");

    localStorage.removeItem("usuario");

  };




  // ======================================================
  // 11. RENDER PRINCIPAL
  // ======================================================

  return (
    <>
      {logeado ? (

        <Slider

          // AUTENTICACIÓN
          logeo={logeo}
          setLogeado={setLogeado}

          // TICKETS
          getTickets={getTickets}
          tickets={tickets}
          setTickets={setTickets}
          page={page}
          setPage={setPage}
          filtroTickets={filtroTickets}
          setFiltroTickets={setFiltroTickets}

          // DASHBOARD
          getConteo={getConteo}
          conteo={conteo}
          setConteo={setConteo}

          // ÁREAS
          getArea={getArea}
          areas={areas}
          setAreas={setAreas}

          // SEDES
          getSede={getSede}
          sedes={sedes}
          setSedes={setSedes}

          // USUARIOS
          usuarios={usuarios}

          // INCIDENTES
          getIncidentes={getIncidentes}
          incidentes={incidentes}
          setIncidentes={setIncidentes}

        />

      ) : (

        <Login
          setLogeado={setLogeado}
          setLogeo={setLogeo}
        />

      )}
    </>
  );

}



// ======================================================
// 12. EXPORTACIÓN
// ======================================================
export default App;