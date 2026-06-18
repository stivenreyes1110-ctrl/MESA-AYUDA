import { useState, useEffect } from 'react';
import './App.css';
import App from './App';

//VARIABLES DATOS FETCH PRINCIPALES
const [areas, setAreas] = useState([])
const [sedes, setSedes] = useState([])
const [usuarios, setUsuarios] = useState([])
const [incidentes, setIncidentes] = useState([])
const [tickets, setTickets] = useState([])
const [page, setPage] = useState(1);
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


        await getArea();
        await getSede();
        await getUsuarios();
        await getIncidentes();
        await getTickets(id_usuario);
        await getConteo(id);


      }


    } catch (error) {


      console.log("Error al iniciar FetchPrincipales:", error);


    }
  };


  iniciarFetchPrincipales();


}, []);


//FETCH PRINCIPAL 
//AREAS
export const getArea = async () => {
  try {

    const respuesta = await fetch("http://128.0.18.50:3011/api/areas")
    const data = await respuesta.json();


    setAreas(data)


    console.log("2.Datos de area: ", data);


    return data;


  } catch (error) {


    console.log(error)


  }
}


//SEDES
export const getSede = async () => {
  try {


    const respuesta = await fetch("http://128.0.18.50:3011/api/sedes")
    const data = await respuesta.json()


    setSedes(data)


    console.log("3.Datos de sede: ", data);


    return data;


  } catch (error) {


    console.log(error)


  }
}


//USUARIOS
export const getUsuarios = async () => {
  try {


    const respuesta = await fetch("http://128.0.18.50:3011/api/usuarios")
    const data = await respuesta.json();


    setUsuarios(data)


    console.log("4.Datos de usuarios: ", data);


    return data;


  } catch (error) {


    console.log(error)


  }
}


//INCIDENTES
export const getIncidentes = async () => {
  try {


    const respuesta = await fetch("http://128.0.18.50:3011/api/incidentes")
    const data = await respuesta.json();


    setIncidentes(data)

    console.log("5.Datos de incidentes: ", data);


    return data;


  } catch (error) {


    console.log(error)


  }
}


//TICKETS
export const getTickets = async (id_usuario) => {
  try {


    const res = await fetch(`http://128.0.18.50:3011/api/filtro/${page}/${id_usuario}`);
    const data = await res.json();


    setTickets(data);


    console.log("6.Datos de tickets: ", data);


    return data;


  } catch (error) {


    console.log("Error de red:", error);


  }
}


//CONTEO
export const getConteo = async (id) => {
  try {


    const respuesta = await fetch(`http://128.0.18.50:3011/api/conteo/usuario/${id}`)


    const data = await respuesta.json();


    setConteo(data)

    console.log("7.Datos de conteo Mesa de Ayuda: ", data);


    return data;


  } catch (error) {


    console.log(error)


  }
}

