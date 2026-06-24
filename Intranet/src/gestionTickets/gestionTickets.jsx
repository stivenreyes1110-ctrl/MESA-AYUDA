import { useState, useEffect } from "react";
import {
   FaHeadset,
   FaPlus,
   FaSearch,
   FaEye,
   FaTimes
} from "react-icons/fa";

import TarjetasGestionTickets from "./gestionTickets.tarjetas";
import ModalGestionTickets from "./gestionTickets.modal";
import HeaderGestionTickets from "./gestionTickets.header";
import TablaGestionTickets from "./gestionTickets.tabla";
import AsignacionGestionTickets from "./gestionTickets.asignacion";
import ProcesoGestionTickets from "./gestionTickets.proceso";

function GestionTickets({ logeo, fechaHora, filtroTickets, setFiltroTickets }) {
   const [modalAbierto, setModalAbierto] = useState(false);
   const [abrir, setAbrir] = useState(false);
   const [seleccionTicket, setSeleccionTicket] = useState(null);
   const [open, setOpen] = useState(false);

   const [conteo, setConteo] = useState([]);
   const [usuarios, setUsuarios] = useState([]);
   const [incidentes, setIncidentes] = useState([]);
   const [mesas, setMesas] = useState([]);
   const [sedes, setSedes] = useState([]);
   const [areas, setAreas] = useState([]);
   const [soporte, setSoporte] = useState([]);

   const [respuesta, setRespuesta] = useState([]);
   const [tickets, setTickets] = useState([]);

   const [page, setPage] = useState(1);

   const [idsoporte, setIdSoporte] = useState(logeo.id);
   const [id_usuario, setIdUsuario] = useState(logeo.id_usuario);

   const mesa = logeo.mesa;
   const idrol = logeo.idrol

   useEffect(() => {
      getTickets();
   }, [abrir,open,page, filtroTickets,modalAbierto]);

   const getTickets = async () => {
      try {
         const res = await fetch(`http://128.0.18.50:3011/api/tickets/${page}/${id_usuario}/${idsoporte}/${filtroTickets}/${mesa}/${idrol}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":
              `Bearer ${logeo.token}`
          }
        });
         const data = await res.json();
         setTickets(data);
      } catch (error) {
         console.log("Error de red:", error);
      }
   };

   return (
      <div className="w-full bg-gray-50 p-6 flex flex-col gap-5 min-h-screen">

         {/* HEADER */}
         <HeaderGestionTickets
            fechaHora={fechaHora}
         />

         {/* CARDS */}
         <TarjetasGestionTickets
            logeo={logeo}
            modalAbierto={modalAbierto}
            setModalAbierto={setModalAbierto}
            open = {open}
            setOpen={setOpen}
         />

         {/* TABLA */}
         <TablaGestionTickets
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
            getTickets={getTickets}
         />

         {/* ASIGNACION */}
         <AsignacionGestionTickets
            logeo={logeo}
            abrir={abrir}
            setAbrir={setAbrir}
            seleccionTicket={seleccionTicket}
            tickets={tickets}
            getTickets={getTickets}
            page={page}
            setPage={setPage}
         />

         {/* MODAL */}
         <ModalGestionTickets
            modalAbierto={modalAbierto}
            setModalAbierto={setModalAbierto}
            tickets={tickets}
            getTickets={getTickets}
            page={page}
            setPage={setPage}
         />

         {/* PROCESO */}
         <ProcesoGestionTickets

            open={open}
            onClose={() => setOpen(false)}
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

export default GestionTickets;
