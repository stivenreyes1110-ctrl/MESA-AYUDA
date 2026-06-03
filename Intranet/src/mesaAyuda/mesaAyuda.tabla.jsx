import { useEffect, useState } from "react";
import {
    FaHeadset,
    FaPlus,
    FaSearch,
    FaEye,
    FaTimes
} from "react-icons/fa";
import { TiMinus } from "react-icons/ti";

function TablaMesaAyuda({ setAbrir, seleccionTicket, setSeleccionTicket, logeo, getTickets, page, setPage, tickets, setTickets, fechaHora, setFechaHora }) {
    const [filtro, setFiltro] = useState("TODOS");
    const [id_usuario, setId_usuario] = useState(logeo.id_usuario)

    console.log(((new Date(fechaHora) - new Date(tickets[0]?.HORAREGISTRO)) / (1000 * 60 * 60) % (1000 * 60 * 60)) / (1000 * 60)) - 18000000



    useEffect(() => {
        const iniciarTabla = async () => {


            await getTickets(page, id_usuario);


        };
        iniciarTabla();
    }, [page]);

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

            {/* ENCABEZADO DE LA TABLA */}
            <div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0b2756]">
                    Tickets Registrados<p className="text-sm text-slate-500">
                        Gestión y seguimiento de solicitudes
                    </p>
                </h3>


                <button
                     onClick={() => { setPage(page > 1 ? page - 1 : 1) }} 
                    className="
                flex items-center gap-3
                bg-gradient-to-r from-[#0b5fd3] to-[#1976ff]
                text-white
                px-6 py-3
                rounded-2xl
                font-semibold
                shadow-lg
                hover:scale-105
                hover:shadow-xl
                transition-all
                duration-300
            "
                >
                   <TiMinus />
                    Anterior
                </button>
                <p className="font-semibold text-xl text-blue-900">Pagina {page}</p>
                <button
                    onClick={() => { setPage(tickets.length > 9 ? page + 1 : page) }}
                    className="
                flex items-center gap-3
                bg-gradient-to-r from-[#0b5fd3] to-[#1976ff]
                text-white
                px-6 py-3
                rounded-2xl
                font-semibold
                shadow-lg
                hover:scale-105
                hover:shadow-xl
                transition-all
                duration-300
            "
                >
                    <FaPlus />
                    Siguiente
                </button>
            </div>

            {/* CONTENEDOR CON SCROLL */}
            <div className="h-[65vh] overflow-auto">

                <table className="min-w-[2000px] w-full text-sm">

                    {/* HEADER */}
                    <thead className="sticky top-0 z-20 bg-[#f8fbff] border-b border-slate-200">

                        <tr>

                            <th className="px-6 py-4 text-left whitespace-nowrap">
                                Ticket
                            </th>

                            <th className="px-6 py-4 text-center whitespace-nowrap">
                                IP / VNC
                            </th>

                            <th className="px-6 py-4 text-left whitespace-nowrap">
                                Dependencia
                            </th>

                            <th className="px-6 py-4 text-left whitespace-nowrap">
                                Solicitud
                            </th>

                            <th className="px-6 py-4 text-center whitespace-nowrap">
                                Prioridad
                            </th>

                            <th className="px-6 py-4 text-center whitespace-nowrap">
                                Estado
                            </th>

                            <th className="px-6 py-4 text-center whitespace-nowrap">
                                Fecha Registro
                            </th>

                            <th className="px-6 py-4 text-center whitespace-nowrap">
                                Tiempo
                            </th>

                            <th className="px-6 py-4 text-center whitespace-nowrap">
                                Contestación
                            </th>

                            <th className="px-6 py-4 text-center whitespace-nowrap">
                                Solicitante
                            </th>

                            <th className="px-6 py-4 text-center whitespace-nowrap">
                                Asignado
                            </th>

                        </tr>

                    </thead>

                    {/* BODY */}
                    <tbody>

                        {tickets.map((ticket) => {

                            const colorPrioridad =
                                ticket.PRIORIDAD === "ALTA"
                                    ? "bg-red-100 text-red-700"
                                    : ticket.PRIORIDAD === "MEDIA"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-green-100 text-green-700";

                            const colorEstado =
                                ticket.ESTADO === "EN PROCESO"
                                    ? "bg-blue-100 text-blue-700"
                                    : ticket.ESTADO === "CERRADO"
                                        ? "bg-slate-200 text-slate-700"
                                        : "bg-green-100 text-green-700";






                            let color = "";
                            const fecha1 = new Date(fechaHora);
                            const fecha2 = new Date(ticket.HORAREGISTRO);
                            const diferencia = Math.abs(fecha1.getTime() - fecha2.getTime()) - 18000000;

                            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

                            const horas = Math.floor(
                                (diferencia % (1000 * 60 * 60 * 24)) /
                                (1000 * 60 * 60)
                            );

                            const minutos = Math.floor(
                                (diferencia % (1000 * 60 * 60)) /
                                (1000 * 60)
                            );

                            const minutosTotales = Math.floor(
                                diferencia / (1000 * 60)
                            );
                            console.log(`TKT-${ticket.ID_TICKET}: DIFERENCIA EN DIAS: `, minutosTotales)
                            let textoCompleto = `${dias} Dia(s) ${horas} Hora(s) ${minutos} Minuto(s)`

                            if (minutosTotales > 55) {
                                color = "bg-red-100";
                            } else if (minutosTotales > 30) {
                                color = "bg-orange-100";
                            } else if (minutosTotales > 20) {
                                color = "bg-yellow-100";
                            } else {
                                color = "bg-green-100";
                            }
                            return (

                                <tr
                                    key={ticket.ID_TICKET}
                                    className="border-b border-slate-100 hover:bg-blue-50 transition"
                                >

                                    {/* ID */}
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="font-bold text-[#0b2756]">
                                            TKT-{ticket.ID_TICKET}
                                        </span>
                                    </td>

                                    {/* IP */}
                                    <td className="px-6 py-5 text-center whitespace-nowrap">
                                        {ticket.DIRIP}
                                    </td>

                                    {/* DEPENDENCIA */}
                                    <td className="px-6 py-5 min-w-[250px]">

                                        <p className="font-semibold text-slate-700">
                                            {ticket.AREA}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            {ticket.SEDE}
                                        </p>

                                    </td>

                                    {/* SOLICITUD */}
                                    <td className="px-6 py-5 min-w-[400px]">

                                        <textarea
                                            readOnly
                                            value={`${ticket.DESCRIPCION}\n${ticket.INCIDENTE}`}
                                            className="
                                        w-full
                                        h-24
                                        resize-none
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        p-3
                                        text-sm
                                        text-slate-700
                                    "
                                        />

                                    </td>

                                    {/* PRIORIDAD */}
                                    <td className="px-6 py-5 text-center whitespace-nowrap">

                                        <span
                                            className={`px-4 py-1 rounded-full text-xs font-bold ${colorPrioridad}`}
                                        >
                                            {ticket.PRIORIDAD}
                                        </span>

                                    </td>

                                    {/* ESTADO */}
                                    <td className="px-6 py-5 text-center whitespace-nowrap">

                                        <span
                                            className={`px-4 py-1 rounded-full text-xs font-bold ${colorEstado}`}
                                        >
                                            {ticket.ESTADO}
                                        </span>

                                    </td>

                                    {/* FECHA */}
                                    <td className="px-6 py-5 whitespace-nowrap text-center text-xs text-slate-500">
                                        {ticket.HORAREGISTRO}
                                    </td>

                                    {/* TIEMPO */}
                                    <td className="px-6 py-5 whitespace-nowrap text-center">

                                        <span className="px-4 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                                            {textoCompleto}
                                        </span>

                                    </td>

                                    {/* CONTESTACION */}
                                    <td className="px-6 py-5 min-w-[350px]">

                                        <textarea
                                            readOnly
                                            value={ticket.CONTESTACION || "SIN RESPUESTA"}
                                            className="
                                        w-full
                                        h-24
                                        resize-none
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        p-3
                                        text-sm
                                        text-slate-700
                                    "
                                        />

                                    </td>

                                    {/* SOLICITANTE */}
                                    <td className="px-6 py-5 min-w-[200px] text-center">

                                        <span className="font-semibold text-slate-700">
                                            {ticket.USUARIO_SOLICITANTE}
                                        </span>

                                    </td>

                                    {/* ASIGNADO */}
                                    <td className="px-6 py-5 min-w-[200px] text-center">

                                        <span className="font-semibold text-slate-700">
                                            {ticket.USUARIO_ASIGNADO || "AÚN NO ASIGNADO"}
                                        </span>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>

        </div>);
}

export default TablaMesaAyuda;

/*
    return (
        <div className="bg-white rounded-xl shadow-sm  overflow-hidden">

            {/* FILTROS 
            <div className="p-4  flex items-center gap-3 flex-wrap">

                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />

                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="pl-8 pr-3 py-2 rounded-lg text-sm"
                    />
                </div>

                <button
                    onClick={() => setFiltro("TODOS")}
                    className={`px-3 py-2  rounded-lg text-sm hover:bg-blue-100 ${filtro === "TODOS"
                        ? "bg-blue-300"
                        : "bg-gray-100"}`}>
                    Todos
                </button>

                <button
                    onClick={() => setFiltro("EN PROCESO")}
                    className={`px-3 py-2  rounded-lg text-sm hover:bg-blue-100 ${filtro === "EN PROCESO" ? "bg-blue-300" : "bg-gray-100"}`}>
                    En Proceso
                </button>

                <button
                    onClick={() => setFiltro("CERRADO")}
                    className={`px-3 py-2  rounded-lg text-sm hover:bg-blue-100 ${filtro === "CERRADO" ? "bg-blue-300" : "bg-gray-100"}`}>
                    Cerrados
                </button>

                <button onClick={() => { setPage(page > 1 ? page - 1 : 1) }} className="hover:bg-blue-900">Atras</button>
                <p>Pagina {page}</p>
                <button onClick={() => { setPage(tickets.length > 9 ? page + 1 : page) }} className="hover:bg-blue-900">Siguiente</button>

            </div>

            {/* TABLA 
            <div className="overflow-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-50  text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-center">IP/VNC</th>
                            <th className="px-4 py-3 text-left">DEPENDENCIA</th>
                            <th className="px-4 py-3 text-left">SOLICITUD</th>
                            <th className="px-4 py-3 text-left">PRIORIDAD</th>
                            <th className="px-4 py-3 text-left">ESTADO</th>
                            <th className="px-4 py-3 text-center">FECHA</th>
                            <th className="px-4 py-3 text-center">CONTESTACION</th>
                            <th className="px-4 py-3 text-center">SOLICITANTE</th>
                            <th className="px-4 py-3 text-center">ASIGNADO</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tickets.filter((ticket) => {
                            if (filtro === "TODOS") return true
                            return ticket.ESTADO === filtro;

                        }).map((ticket) => {
                            let color = "";
                            const fecha1 = new Date(fechaHora);
                            const fecha2 = new Date(ticket.HORAREGISTRO);
                            const diferencia = Math.abs(fecha1.getTime() - fecha2.getTime())-18000000;

                            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

                            const horas = Math.floor(
                                (diferencia % (1000 * 60 * 60 * 24)) /
                                (1000 * 60 * 60)
                            );

                            const minutos = Math.floor(
                                (diferencia % (1000 * 60 * 60)) /
                                (1000 * 60)
                            );

                            const minutosTotales = Math.floor(
                                diferencia / (1000 * 60)
                            );
                            console.log(`TKT-${ticket.ID_TICKET}: DIFERENCIA EN DIAS: `, minutosTotales)
                            let textoCompleto = `Dias ${dias} Horas ${horas} Minutos ${minutos}`

                            if (minutosTotales > 55) {
                                color = "bg-red-100";
                            } else if (minutosTotales > 30) {
                                color = "bg-orange-100";
                            } else if (minutosTotales > 20) {
                                color = "bg-yellow-100";
                            } else {
                                color = "bg-green-100";
                            }

                            return (
                                <tr
                                    key={ticket.ID_TICKET}
                                    className={` hover:bg-gray-50`}>

                                    <td className="px-4 py-3">TKT-#{ticket.ID_TICKET}</td>
                                    <td className="px-4 py-3">{ticket.DIRIP}</td>
                                    <td className="px-4 py-3"><div><div>{ticket.AREA}</div><div className="text-xs text-gray-400 font-semibold">{ticket.SEDE}</div></div></td>
                                    <td className="px-4 py-3"><div><div className="uppercase">{ticket.DESCRIPCION}</div><div className="uppercase text-xs text-gray-400 font-semibold">{ticket.INCIDENTE}</div></div></td>
                                    <td className={`px-4 py-3 `}><div className={`flex justify-center items-center  rounded-lg text-xs h-5 ${ticket.PRIORIDAD === "MEDIA" ? "bg-blue-100" : ticket.PRIORIDAD === "BAJA" ? "bg-red-100" : "bg-green-100"}`}>{ticket.PRIORIDAD}</div></td>
                                    <td className="px-4 py-3"><div className={`flex justify-center items-center rounded-lg text-xs h-5 ${ticket.ESTADO === "EN PROCESO" ? "bg-blue-200" : ticket.ESTADO === "CERRADO" ? "bg-red-200" : "bg-green-200"}`}>{ticket.ESTADO}</div></td>
                                    <td className="px-4 py-3">

                                        {/*  {ticket.HORAREGISTRO.split("T")[0]
        .split("-")
        .reverse()
        .join("/")}

    {" "}

    {ticket.HORAREGISTRO.split("T")[1].substring(0,5)} 
                                        {ticket.HORAREGISTRO}
                                    </td>
                                    <td className={`px-4 py-3 text-xs ${color}`} >{


                                        textoCompleto

                                    }</td>

                                    <td className="px-4 py-3 text-xs">{ticket.CONTESTACION ?? "SIN RESPUESTA"}</td>
                                    <td className="px-4 py-3 text-xs">{ticket.USUARIO_SOLICITANTE}</td>
                                    <td className="px-4 py-3 text-xs" >{ticket.USUARIO_ASIGNADO ?? 'AUN NO ESTA ASIGNADO'}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>

            </div>
        </div>
    )
}*/
