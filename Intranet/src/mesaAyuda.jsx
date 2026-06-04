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


   //VARIABLES DE USUARIO
   usuario,getUsuarios, 
   

   //VARIABLES DE LOGEO
   logeo,
   

  //VARIABLES DE TICKETS
   getTickets, tickets, setTickets, 
   page, setPage, 
   filtroTickets, setFiltroTickets,


   //VARIABLE DE AREAS
   getArea , areas, 


   //VARIABLE DE CONTEO
   getConteo,conteo, setConteo,
   

   //VARIABLE DE SEDES
   getSede,sedes, setSedes,


   //VARIABLE DE INCIDENTES
   getIncidentes,incidentes,setIncidentes,


   //VARIABLE DE FECHA HORA
   fechaHora, setFechaHora,


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
         <ModalMesaAyuda


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

export default MesaAyuda;