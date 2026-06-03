import { useState,useEffect } from "react";
import {
   FaHeadset,
   FaPlus,
   FaSearch,
   FaEye,
   FaTimes
} from "react-icons/fa";

import TajertasMesaAyuda from "./mesaAyuda/mesaAyuda.tarjetas";
import ModalMesaAyuda from "./mesaAyuda/mesaAyuda.modal";
import HeaderMesaAyuda from "./mesaAyuda/mesaAyuda.header"
import TablaMesaAyuda from "./mesaAyuda/mesaAyuda.tabla";


function MesaAyuda({ 
   usuario, logeo,
   
  
   getArea , areas, 
   
   getUsuarios, 
   
   getConteo,
   
   page, setPage,
   
   getTickets, 
   tickets, setTickets  
   
   ,conteo, setConteo,
   
   getSede, 
   sedes, setSedes,

   getIncidentes,
   incidentes,setIncidentes,

   fechaHora, setFechaHora

}) {


   const [modalAbierto, setModalAbierto] = useState(false);


   const [abrir, setAbrir] = useState(false);


   const [seleccionTicket, setSeleccionTicket] = useState(null)  


   return (
      <div className="w-full bg-gray-50 p-6 flex flex-col gap-5 min-h-screen">

         {/* HEADER */}
         <HeaderMesaAyuda

            setModalAbierto={setModalAbierto}

            fechaHora={fechaHora}
            setFechaHora={setFechaHora}

         />

         {/* CARDS */}
         <TajertasMesaAyuda
            logeo={logeo}

            getConteo={getConteo}
            conteo={conteo}
         />

         {/* TABLA */}
         <TablaMesaAyuda
            setAbrir={setAbrir}
            seleccionTicket={seleccionTicket}
            setSeleccionTicket={setSeleccionTicket}
            logeo={logeo}


            getTickets={getTickets}
            page={page}
            setPage={setPage}
            tickets={tickets}
            setTickets={setTickets}  
            
            fechaHora={fechaHora}
            setFechaHora={setFechaHora}
         />
         {/* MODAL */}
         <ModalMesaAyuda

            modalAbierto={modalAbierto}
            setModalAbierto={setModalAbierto}

            logeo={logeo}
            getTickets={getTickets}

            tickets={tickets}
            setTickets={setTickets}
            page={page}
            setPage={setPage}

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

export default MesaAyuda;