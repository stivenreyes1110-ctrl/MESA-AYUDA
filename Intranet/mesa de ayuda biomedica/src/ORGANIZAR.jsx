function FecthMesaAyuda() {
    useEffect(() => {
        getTickets();
        getConteo()
        getArea();
        getSede();
        getIncidentes();
    }, [])

//CONTEO TARJETAS  
const [conteo, setConteo] = useState([]);

    const getConteo = async () => {
        try {
            const id = logeo.id_usuario;
            console.log('ID USUARIO', id)
            const respuesta = await fetch(`http://128.0.18.50:3011/api/conteo/usuario/${id}`)
            const data = await respuesta.json();
            setConteo(data)
        } catch (error) {
            console.log(error)
        }
    }

//TABLA TICKETS
const [seleccionTicket, setSeleccionTicket] = useState(null)
const [page, setPage] = useState(1);    
const [tickets, setTickets] = useState([]);

    const getTickets = async () => {
        try {

            console.log("ID USUARIO MESA AYUDA:", logeo.id_usuario)
            const res = await fetch(`http://128.0.18.50:3011/api/filtro/${page}/${logeo.id_usuario}/`);
            const data = await res.json();
            setTickets(data);
            console.log(data)
        } catch (error) {
            console.log("Error de red:", error);
        }
    }

//MODAL CREAR TICKET
const [incidente, setIncidente] = useState("");
const [prioridad, setPrioridad] = useState("");
const [sede, setSede] = useState("");

    const getArea = async () => {
        try {
            const respuesta = await fetch("http://128.0.18.50:3011/api/areas")
            const data = await respuesta.json();
            setAreas(data)
        } catch (error) {
            console.log(error)
        }

    }

    const getSede = async () => {
        try {
            const respuesta = await fetch("http://128.0.18.50:3011/api/sedes")
            const data = await respuesta.json()
            setSedes(data)
        } catch (error) {
            console.log(error)
        }
    }


    const getIncidentes = async () => {
        try {
            const respuesta = await fetch("http://128.0.18.50:3011/api/incidentes")
            const data = await respuesta.json();
            setIncidentes(data)
        } catch (error) {
            console.log(error)
        }
    }



// GUARDAR TICKETS    
const [area, setArea] = useState("");
const [ubicacion, setUbicacion] = useState("");
const [descripcion, setDescripcion] = useState("");
const [usuarios, setUsuarios] = useState("");
const [direccion, setDireccion] = useState("");

    const guardarTickets = async () => {
        const res = await fetch("http://128.0.18.50:3011/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                incidente,
                prioridad,
                sede,
                area,
                ubicacion,
                descripcion,
                usuarios,
                direccion,
                logeo
            })
        });
        const data = await res.json();
        if (res.ok) {
            alert("Ticket creado");
            setModalAbierto(false);
            setIncidente("");
            setPrioridad("");
            setSede("");
            setArea("");
            setUbicacion("");
            setDescripcion("");
            setUsuarios("");
            await getTickets();
        } else {
            alert("Error");
        }
    };
}
function FecthGestionTi() {

}