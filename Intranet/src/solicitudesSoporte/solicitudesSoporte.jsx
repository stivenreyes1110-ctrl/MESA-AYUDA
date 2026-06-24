import { useState, useEffect } from "react";
import {
   FaHeadset,
   FaPlus,
   FaSearch,
   FaEye,
   FaTimes
} from "react-icons/fa";

import TarjetasSolicitudesSoporte from "./solicitudesSoporte.tarjetas";
import ModalSolicitudesSoporte from "./solicitudesSoporte.modal";
import HeaderSolicitudesSoporte from "./solicitudesSoporte.header";
import TablaSolicitudesSoporte from "./solicitudesSoporte.tabla";
import { useRenderProfiler } from "../utils/logger";

function SolicitudesSoporte({ 
   //VARIABLES DE USUARIO
   usuario,
   getUsuarios, 
   
   //VARIABLES DE LOGEO
   logeo,
   
   //VARIABLES DE TICKETS
   getTickets,
   tickets,
   setTickets, 
   page,
   setPage, 
   filtroTickets,
   setFiltroTickets,

   //VARIABLE DE AREAS
   getArea,
   areas, 

   //VARIABLE DE CONTEO
   getConteo,
   conteo,
   setConteo,
   
   //VARIABLE DE SEDES
   getSede,
   sedes,
   setSedes,

   //VARIABLE DE INCIDENTES
   getIncidentes,
   incidentes,
   setIncidentes,

   //VARIABLE DE FECHA HORA
   fechaHora,
   setFechaHora,
}) {
   useRenderProfiler("SolicitudesSoporte", { page, filtroTickets });

   const [modalAbierto, setModalAbierto] = useState(false);
   const [abrir, setAbrir] = useState(false);
   const [seleccionTicket, setSeleccionTicket] = useState(null);

   return (
      <div className="w-full bg-gray-50 p-6 flex flex-col gap-5 min-h-screen">

         {/* HEADER */}
         <HeaderSolicitudesSoporte
            setModalAbierto={setModalAbierto}
            fechaHora={fechaHora}
            setFechaHora={setFechaHora}
         />

         {/* CARDS */}
         <TarjetasSolicitudesSoporte
            logeo={logeo}
            getConteo={getConteo}
            conteo={conteo}
            
            modalAbierto={modalAbierto}
            setModalAbierto={setModalAbierto}
         />

         {/* TABLA */}
         <TablaSolicitudesSoporte
            //VARIABLE DE LOGEO
            logeo={logeo}

            //VARIABLES DE TICKET POR USUARIO
            seleccionTicket={seleccionTicket}
            setSeleccionTicket={setSeleccionTicket}
            getTickets={getTickets}
            page={page}
            setPage={setPage}
            tickets={tickets}
            setTickets={setTickets}  
            setFiltroTickets={setFiltroTickets}
            filtroTickets={filtroTickets}

            //VARIABLE DE FECHA HORA
            fechaHora={fechaHora}
            setFechaHora={setFechaHora}
         />

         {/* MODAL */}
         <ModalSolicitudesSoporte
            //VARIABLE DE ABRIR
            modalAbierto={modalAbierto}
            setModalAbierto={setModalAbierto}

            //VARIBLE DE LOGEO
            logeo={logeo}

            //VARIABLES DE TICKET POR USUARIO
            getTickets={getTickets}
            tickets={tickets}
            setTickets={setTickets}
            page={page}
            setPage={setPage}

            //VARIABLES MODAL
            getArea={getArea}
            areas={areas}

            getSede={getSede}
            sedes={sedes}

            getIncidentes={getIncidentes}
            incidentes={incidentes}
         />

      </div>
   );
}

export default SolicitudesSoporte;
