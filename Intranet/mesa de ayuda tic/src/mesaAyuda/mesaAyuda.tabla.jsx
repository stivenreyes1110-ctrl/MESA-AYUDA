import { useEffect, useState } from "react";
import {
    FaHeadset,
    FaPlus,
    FaSearch,
    FaEye,
    FaTimes
} from "react-icons/fa";
import { TiMinus } from "react-icons/ti";


function TablaMesaAyuda({


    //VARIABLES DE LOGEO
    logeo,


    //VARIABLES DE TICKETS
    seleccionTicket, setSeleccionTicket,
    getTickets, 
    page, setPage, 
    tickets, setTickets,
    filtroTickets, setFiltroTickets,


    //VARIABLES DE FECHA
    fechaHora, setFechaHora


}) {


    const [filtro, setFiltro] = useState("TODOS");
    const [id_usuario, setId_usuario] = useState(logeo.id_usuario)
    const cambiarFiltro = (estado) => {
        setFiltroTickets(estado);
        setPage(1);
    };


    /*console.log(((new Date(fechaHora) - new Date(tickets[0]?.HORAREGISTRO)) / (1000 * 60 * 60) % (1000 * 60 * 60)) / (1000 * 60)) - 18000000*/


    useEffect(() => {


        const iniciarTabla = async () => {


            await getTickets(page, id_usuario, filtroTickets);


        };


        iniciarTabla();


    }, [page, filtroTickets]);

    
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

            {/* ENCABEZADO DE LA TABLA */}
            <div className="bg-white border-b border-slate-100 px-6 py-5">

                {/* FILA 1 */}
                <div className="flex items-center justify-between">

                    <div>
                        <h3 className="text-2xl font-bold text-[#0b2756]">
                            Tickets Registrados
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Gestión y seguimiento de solicitudes
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => setPage(page > 1 ? page - 1 : 1)}
                            className="
                    w-11 h-11
                    rounded-xl
                    bg-blue-300
                    text-white
                    hover:bg-blue-700
                    transition
                "
                        >
                            ←
                        </button>

                        <div className="
                px-5 py-2
                rounded-xl
                bg-blue-50
                text-blue-700
                font-bold
            ">
                            Página {page}
                        </div>

                        <button
                            onClick={() =>
                                setPage(tickets.length > 9 ? page + 1 : page)
                            }
                            className="
                    w-11 h-11
                    rounded-xl
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                    transition
                "
                        >
                            →
                        </button>

                    </div>

                </div>

                {/* FILA 2 */}
                <div className="flex items-center gap-3 mt-5 flex-wrap">

                    <button
                        onClick={() => cambiarFiltro("1")}
                        className={`
                px-5 py-2.5 rounded-xl text-sm font-semibold
                flex items-center gap-2
                transition
                ${filtroTickets === "1"
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-blue-50 text-blue-700"}
            `}
                    >
                        <TiMinus />
                        Pendientes
                    </button>

                    <button
                        onClick={() => cambiarFiltro("2")}
                        className={`
                px-5 py-2.5 rounded-xl text-sm font-semibold
                flex items-center gap-2
                transition
                ${filtroTickets === "2"
                                ? "bg-cyan-600 text-white shadow-lg"
                                : "bg-cyan-50 text-cyan-700"}
            `}
                    >
                        <TiMinus />
                        En Proceso
                    </button>

                    <button
                        onClick={() => cambiarFiltro("3")}
                        className={`
                px-5 py-2.5 rounded-xl text-sm font-semibold
                flex items-center gap-2
                transition
                ${filtroTickets === "3"
                                ? "bg-green-600 text-white shadow-lg"
                                : "bg-green-50 text-green-700"}
            `}
                    >
                        <TiMinus />
                        Solucionados
                    </button>

                    <button
                        onClick={() => cambiarFiltro("4")}
                        className={`
                px-5 py-2.5 rounded-xl text-sm font-semibold
                flex items-center gap-2
                transition
                ${filtroTickets === "4"
                                ? "bg-purple-600 text-white shadow-lg"
                                : "bg-purple-50 text-purple-700"}
            `}
                    >
                        <TiMinus />
                        Todos
                    </button>

                </div>

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
                            const fecha1 = new Date(ticket.HORACIERRE);
                            
                            const fecha2 = new Date(ticket.HORAREGISTRO);
                            
                            const diferencia = Math.abs(fecha1.getTime() - fecha2.getTime()) ;

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
                            
                            let textoCompleto = `${dias} Dia(s) ${horas} Hora(s) ${minutos} Minuto(s)`

                            if (minutosTotales > 55) {
                                color = "bg-red-400";
                            } else if (minutosTotales > 30) {
                                color = "bg-orange-400";
                            } else if (minutosTotales > 20) {
                                color = "bg-yellow-400";
                            } else {
                                color = "bg-green-400";
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

                                        <span className={`px-4 py-1 rounded-full ${color} text-white text-xs font-bold`}>
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
