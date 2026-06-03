import { useEffect, useState } from "react";
import {
    FaHeadset,
    FaPlus,
    FaSearch,
    FaEye,
    FaTimes
} from "react-icons/fa";

import { MdNoteAlt } from "react-icons/md";

function TablaGestionTi({ setAbrir, seleccionTicket, setSeleccionTicket, setOpen, respuesta, setRespuesta, logeo, getTickets, page, setPage, tickets, setTickets }) {

    const [filtro, setFiltro] = useState("TODOS");

    return (
        <div className="bg-white rounded-xl shadow-sm  overflow-hidden">

            {/* FILTROS */}
            <div className="p-4  flex items-center gap-3 flex-wrap">

                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />

                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="pl-8 pr-3 py-2  rounded-lg text-sm"
                    />
                </div>

                <button className="px-3 py-2 bg-gray-100 rounded-lg text-sm">
                    Todos
                </button>

                <button className="px-3 py-2 bg-gray-100 rounded-lg text-sm">
                    En Proceso
                </button>

                <button className="px-3 py-2 bg-gray-100 rounded-lg text-sm">
                    Cerrados
                </button>
                <button onClick={() => { setPage(page > 1 ? page - 1 : 1) }} className="hover:bg-blue-900">Atras</button>
                <p>Pagina {page}</p>
                <button onClick={() => { setPage(tickets.length > 9 ? page + 1 : page) }} className="hover:bg-blue-900">Siguiente</button>
            </div>

            {/* TABLA */}
            <div className="overflow-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">DEPENDENCIA</th>
                            <th className="px-4 py-3 text-left">SOLICITUD</th>
                            <th className="px-4 py-3 text-left">PRIORIDAD</th>
                            <th className="px-4 py-3 text-left">ESTADO</th>
                            <th className="px-4 py-3 text-center">FECHA</th>
                        
                            <th className="px-4 py-3 text-center">IP/VNC</th>
                            <th className="px-4 py-3 text-center">CONTESTACION</th>
                            <th className="px-4 py-3 text-center">SOLICITANTE</th>

                            <th className="px-4 py-3 text-center">ASIGNADO</th>
                            <th className="px-4 py-3 text-center">Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tickets.map((ticket) => (

                            <tr
                                key={ticket.ID_TICKET}
                                className="hover:bg-gray-50">
                                <td className="px-4 py-3">{ticket.ID_TICKET}</td>
                                <td className="px-4 py-3">{ticket.AREA},{ticket.SEDE}</td>
                                <td className="px-4 py-3">{ticket.INCIDENTE},{ticket.DESCRIPCION}</td>
                                <td className="px-4 py-3">{ticket.PRIORIDAD}</td>
                                <td className="px-4 py-3">{ticket.ESTADO}</td>
                                <td className="px-4 py-3">

  {ticket.HORAREGISTRO.split("T")[0]
    .split("-")
    .reverse()
    .join("/")}

  {" "}

  {ticket.HORAREGISTRO.split("T")[1].substring(0,5)}

</td>
                                
                                <td className="px-4 py-3">{ticket.DIRIP}</td>
                                <td className="px-4 py-3 text-xs">{ticket.CONTESTACION ?? "SIN RESPUESTA"}</td>
                                <td className="px-4 py-3">{ticket.USUARIO_SOLICITANTE}</td>
                                <td className="px-4 py-3">{ticket.USUARIO_ASIGNADO ?? 'AUN NO ESTA ASIGNADO'}</td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => {
                                            if (!ticket?.ID_TICKET) return;


                                            setSeleccionTicket(ticket.ID_TICKET);
                                            setAbrir(true);
                                        }}
                                        className="p-2 rounded-lg hover:bg-blue-100"
                                    >
                                        <FaEye />
                                    </button>
                                    <div>
                                        <button onClick={() => { setRespuesta(ticket); setOpen(true) }} className="p-2 rounded-lg hover:bg-blue-100"><MdNoteAlt /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default TablaGestionTi;