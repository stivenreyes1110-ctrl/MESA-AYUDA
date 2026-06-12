import { useState, useEffect } from "react";
import {
   FaHeadset,
   FaPlus,
   FaSearch,
   FaEye,
   FaTimes
} from "react-icons/fa";

import TajertasGestionTi from "./gestionTI/gestionTi.tarjetas";
import ModalGestionTi from "./gestionTI/gestionTi.modal";
import HeaderGestionTi from "./gestionTI/gestionTi.header"
import TablaGestionTi from "./gestionTI/gestionTi.tabla";
import AsignacioGestionTi from "./gestionTI/gestionTi.asignacion";
import Proceso from "./gestionTI/gestionTi.proceso";

function GestionTi({ logeo, fechaHora ,filtroTickets,setFiltroTickets}) {
   const [modalAbierto, setModalAbierto] = useState(false);
   const [abrir, setAbrir] = useState(false);
   const [seleccionTicket, setSeleccionTicket] = useState(null)
   const [open, setOpen] = useState(false)

   const [conteo, setConteo] = useState([])
   const [usuarios, setUsuarios] = useState([])
   const [incidentes, setIncidentes] = useState([])
   const [mesas, setMesas] = useState([])
   const [sedes, setSedes] = useState([])
   const [areas, setAreas] = useState([])
   const [soporte, setSoporte] = useState([])

   const [respuesta, setRespuesta] = useState([]);
   const [tickets, setTickets] = useState([]);

   const [page, setPage] = useState(1);


   const [idsoporte, setIdSoporte] = useState(logeo.id);
   const [id_usuario, setIdUsuario] = useState(logeo.id_usuario);

   


   useEffect(() => {
      getTickets();

   }, [page,filtroTickets]);
   const getTickets = async () => {
      try {
         const res = await fetch(`http://128.0.18.50:3011/api/tickets/${page}/${id_usuario}/${idsoporte}/${filtroTickets}`);
         console.log(res)
         const data = await res.json();
         setTickets(data);
      } catch (error) {
         console.log("Error de red:", error);
      }
   }


   return (
      <div className="w-full bg-gray-50 p-6 flex flex-col gap-5 min-h-screen">

         {/* HEADER */}
         <HeaderGestionTi


            fechaHora={fechaHora}


         />

         {/* CARDS */}
         <TajertasGestionTi


            logeo={logeo}


         />

         {/* TABLA */}
         <TablaGestionTi


            setAbrir={setAbrir}


            seleccionTicket={seleccionTicket}
            setSeleccionTicket={setSeleccionTicket}
            setOpen={setOpen}
            tickets={tickets}
            page={page}
            setPage={setPage}
            filtroTickets={filtroTickets}
            setFiltroTickets={setFiltroTickets}


            respuesta={respuesta}
            setRespuesta={setRespuesta}


            logeo={logeo}


         />

         <AsignacioGestionTi
            abrir={abrir}
            setAbrir={setAbrir}
            seleccionTicket={seleccionTicket}
            tickets={tickets}
            getTickets={getTickets}
            page={page}
            setPage={setPage}

         />


         {/* MODAL */}
         <ModalGestionTi
            modalAbierto={modalAbierto}
            setModalAbierto={setModalAbierto}
            tickets={tickets}
            getTickets={getTickets}
            page={page}
            setPage={setPage}


         />

         <Proceso
            open={open}
            onClose={() => setOpen(false)}
            tickets={tickets}
            respuesta={respuesta}
            setOpen={setOpen}
            tickets={tickets}
            getTickets={getTickets}
            page={page}
            setPage={setPage}
            logeo={logeo}

         />

      </div>
   );
}

export default GestionTi;