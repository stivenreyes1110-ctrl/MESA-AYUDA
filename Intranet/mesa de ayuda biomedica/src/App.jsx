import { useState, useEffect } from 'react';
import Slider from './slider';
import Login from './login';
import './App.css';



function App() {


  //VARIABLES DE LOGEO
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
  const [filtroTickets, setFiltroTickets] = useState('3');
  const [page, setPage] = useState(1);


  //✔ CONTEO
  const [conteo, setConteo] = useState([])



  const IPBASE = 'http://128.0.18.50:3011'
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


        }


      } catch (error) {


        console.log("Error al iniciar FetchPrincipales:", error);


      }
    };


    iniciarFetchPrincipales();


  }, []);


  //FETCH PRINCIPAL 
  ///✔ AREAS
  const getArea = async () => {
    try {

      const respuesta = await fetch(`${IPBASE}/api/areas`, {


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


  //✔ SEDES
  const getSede = async () => {
    try {


      const respuesta = await fetch(`${IPBASE}/api/sedes`,
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


  //✔ USUARIOS
  const getUsuarios = async () => {
    try {


      const respuesta = await fetch(`${IPBASE}/api/usuarios`, {
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

  //✔ INCIDENTES
  const getIncidentes = async () => {
    try {


      const respuesta = await fetch(`${IPBASE}/api/incidentes`, {
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


      const res = await fetch(`${IPBASE}/api/filtro/${page}/${id_usuario}/${filtroTickets}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${logeo.token}`
        }
      });


      console.log("ID USUARIO EN GETTICKETS DE APP.JSX: ", res)


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


  //✔ CONTEO
  const getConteo = async (id) => {
    try {


      const respuesta = await fetch(`${IPBASE}/api/conteo/usuario/${id}`)


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


        //✔ VARIABLE DE LOGEO
        logeo={logeo} setLogeado={setLogeado}
 

        //✔ VARIABLE DE TICKETS
        getTickets={getTickets}
        tickets={tickets}
        setTickets={setTickets}
        page={page} setPage={setPage}
        setFiltroTickets={setFiltroTickets}
        filtroTickets={filtroTickets}


        //✔ VARIABLE DE CONTEO
        getConteo={getConteo}
        conteo={conteo} setConteo={setConteo}


        //✔ VARIABLE DE MODAL
        areas={areas} setAreas={setAreas}
        getArea={getArea}


        //✔VARIABLE DE SEDES
        sedes={sedes} setSedes={setSedes}
        getSede={getSede}
        usuarios={usuarios}


        //✔VARIABLE DE INCIDENTES
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
