import { useState, useEffect } from 'react';
import './App.css';
import Slider from './slider';
import Login from './login';


function App() {


  const [logeado, setLogeado] = useState(false);
  const [logeo, setLogeo] = useState([])


  //VARIABLES DATOS FETCH PRINCIPALES
  //✔ AREAS
  const [areas, setAreas] = useState([])

  //✔ SEDES
  const [sedes, setSedes] = useState([])


  const [usuarios, setUsuarios] = useState([])

  //✔ INCIDENTES
  const [incidentes, setIncidentes] = useState([])

  //✔ TICKETS
  const [tickets, setTickets] = useState([])
  const [page, setPage] = useState(1);

  //✔ CONTEO
  const [conteo, setConteo] = useState([])


  useEffect(() => {


    const iniciarFetchPrincipales = async () => {
      try {


        const usuarioGuardado = localStorage.getItem("usuario");


        if (usuarioGuardado) {


          const usuario = JSON.parse(usuarioGuardado);


          setLogeo(usuario);
          setLogeado(true);


          console.log("SE ESTAN INCIANDO LOS FETCH PRINCIPALES DE APP.JSX");
          console.log("1.Datos de logeo: ", usuario);
          let id_usuario = usuario.id_usuario;
          let id = usuario.id_usuario;


          /* await getUsuarios();*/

          //✔ TICKETS - TABLA MESA DE AYUDA
          /* await getTickets(page,id_usuario);*/

          //✔ CONTEO - TARJETAS DE MESA DE AYUDA
          /*await getConteo(id);*/

          //✔ AREAS - MODAL MESA DE AYUDA
          /*await getArea();;*/

          //✔ SEDES - MODAL MESA DE AYUDA
          /*await getSede();*/

          //✔ INCIDENTES - MODAL MESA DE AYUDA
          /*await getIncidentes();*/


        }


      } catch (error) {


        console.log("Error al iniciar FetchPrincipales:", error);


      }
    };


    iniciarFetchPrincipales();


  }, []);


  //FETCH PRINCIPAL 
  ///✔AREAS
  const getArea = async () => {
    try {

      const respuesta = await fetch("http://128.0.18.50:3011/api/areas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${logeo.token}`
        }
      })

      if (!respuesta.ok) {

        throw new Error("Error al obtener las áreas");

      }

      const data = await respuesta.json();


      setAreas(data)


      console.log("2.Datos de area: ", data);


      return data;


    } catch (error) {


      console.log(error)
       setLogeado(false);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

    }
  }


  //✔SEDES
  const getSede = async () => {
    try {


      const respuesta = await fetch("http://128.0.18.50:3011/api/sedes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${logeo.token}`
          }
        }
      )
      const data = await respuesta.json()


      setSedes(data)


      console.log("3.Datos de sede: ", data);



      return data;


    } catch (error) {


      console.log(error)
      setLogeado(false);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

    }
  }


  //USUARIOS
  const getUsuarios = async () => {
    try {


      const respuesta = await fetch("http://128.0.18.50:3011/api/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          /*"Authorization": `Bearer ${logeo.token}`*/
        }
      })
      const data = await respuesta.json();


      setUsuarios(data)


      console.log("4.Datos de usuarios: ", data);


      return data;


    } catch (error) {


      console.log(error)
       setLogeado(false);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

    }
  }

  //✔NCIDENTES
  const getIncidentes = async () => {
    try {


      const respuesta = await fetch("http://128.0.18.50:3011/api/incidentes", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          "Authorization": `Bearer ${logeo.token}`
        }
      })
      const data = await respuesta.json();


      setIncidentes(data)

      console.log("5.Datos de incidentes: ", data);


      return data;


    } catch (error) {


      console.log(error)
       setLogeado(false);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

    }
  }


  //✔ TICKETS
  const getTickets = async (page, id_usuario) => {
    try {


      const res = await fetch(`http://128.0.18.50:3011/api/filtro/${page}/${id_usuario}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${logeo.token}`
        }
      });

      /*console.log("ID USUARIO EN GETTICKETS DE APP.JSX: ", res)*/


      const data = await res.json();


      setTickets(data);


      console.log("6.Datos de tickets: ", data);


      return data;


    } catch (error) {


      console.log("Error de red:", error);

       setLogeado(false);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    }
  }

  //✔CONTEO
  const getConteo = async (id) => {
    try {


      const respuesta = await fetch(`http://128.0.18.50:3011/api/conteo/usuario/${id}`)


      const data = await respuesta.json();


      setConteo(data)

      console.log("7.Datos de conteo Mesa de Ayuda: ", data);


      return data;


    } catch (error) {


      console.log(error)
       setLogeado(false);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

    }
  }

  return (


    <>

      {/*PANTALLA PRINCIPAL*/}
      {logeado ? (<Slider

        //✔ LOGEO
        logeo={logeo} setLogeado={setLogeado}

        //✔ TICKETS
        getTickets={getTickets}
        tickets={tickets}
        setTickets={setTickets}
        page={page} setPage={setPage}

        //✔ CONTEO
        getConteo={getConteo}
        conteo={conteo} setConteo={setConteo}

        //✔ MODAL
        areas={areas} setAreas={setAreas}
        getArea={getArea}

        //✔ SEDES
        sedes={sedes} setSedes={setSedes}
        getSede={getSede}
        usuarios={usuarios}

        //✔ INCIDENTES
        getIncidentes={getIncidentes}
        incidentes={incidentes}
        setIncidentes={setIncidentes}

      />)


        :


        (<Login setLogeado={setLogeado} setLogeo={setLogeo} />)}


    </>


  );


}


export default App 
