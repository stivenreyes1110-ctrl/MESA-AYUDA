import { useState } from "react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiOutlineDocument } from "react-icons/hi2";

import { FaHeadset } from "react-icons/fa";

import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiHeadphones } from "react-icons/ci";
import { BsGearFill } from "react-icons/bs";
import { ImLab } from "react-icons/im";
import { MdOutlineEmail } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { GoCalendar } from "react-icons/go";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { GiShare } from "react-icons/gi";
import { AiOutlineSound } from "react-icons/ai";

import { CiMenuKebab } from "react-icons/ci";
import { AiFillPlayCircle } from "react-icons/ai";
import { data } from "react-router-dom";
function Tickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getTickets();
    }, []);


    const getTickets = async () => {
        try {
            const respuesta = await fetch("http://localhost:3011/api/tickets")
            const data = await respuesta.json();
            setTickets(data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(tickets)
    return (
        <div className="w-full h-full flex flex-col bg-gray-200 ">

            <div className="w-full flex flex-row justify-center items-centerp-3">
                <div className="flex flex-col bg-white w-66 h-37 rounded-lg shadow-md m-2  hover:h-48 transition-all duration-300">
                    <div className="flex  justify-center items-center">
                        <div>
                            <div className="bg-blue-100 w-15 h-15 rounded-full flex items-center justify-center m-3">
                                <AiOutlineFileSearch className="w-6 h-6 text-blue-700" />
                            </div>
                        </div>

                        <div className="w-60 mt-4">
                            <div><h3 ></h3></div>
                            <div><p className="w-10 text-sm font-semibold">Total</p></div>
                            <div><p className="w-30 text-xs font-semibold">Todas tus solicitudes</p></div>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col bg-white w-66 h-37 rounded-lg shadow-md m-2 hover:h-48 transition-all duration-300">
                    <div className="flex  justify-center items-center">
                        <div>
                            <div className="bg-orange-100 w-15 h-15 rounded-full flex items-center justify-center m-3">
                                <HiOutlineDocument className="w-6 h-6 text-orange-700" />
                            </div>
                        </div>

                        <div className="w-60 mt-4">
                            <div><h3 ></h3></div>
                            <div><p className="w-30 text-sm font-semibold">En proceso</p></div>
                            <div><p className="w-30 text-xs font-semibold">Solicitudes en Curso</p></div>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col bg-white w-66 h-37 rounded-lg shadow-md m-2 hover:h-48 transition-all duration-300">
                    <div className="flex  justify-center items-center">
                        <div>
                            <div className="bg-green-100 w-15 h-15 rounded-full flex items-center justify-center m-3">
                                <HiOutlineDocument className="w-6 h-6 text-green-700" />
                            </div>
                        </div>

                        <div className="w-60 mt-4">
                            <div><h3 ></h3></div>
                            <div><p className="w-30 text-sm font-semibold">Resueltas</p></div>
                            <div><p className="w-30 text-xs font-semibold">Solicitudes Resueltas</p></div>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col bg-white w-66 h-37 rounded-lg shadow-md m-2 hover:h-48 transition-all duration-300">
                    <div className="flex  justify-center items-center">
                        <div>
                            <div className="bg-red-100 w-15 h-15 rounded-full flex items-center justify-center m-3">
                                <HiOutlineDocument className="w-6 h-6 text-red-700" />
                            </div>
                        </div>

                        <div className="w-60 mt-4">
                            <div><h3 ></h3></div>
                            <div><p className="w-30 text-sm font-semibold">Cerradas</p></div>
                            <div><p className="w-30 text-xs font-semibold">Solicitudes cerradas</p></div>
                        </div>
                    </div>

                </div>


            </div>
            <div className="w-full flex justify-center items-center  m-2 rounded-2xl h-230 m-3 ">
                <div className="w-full overflow-x-auto rounded-2xl">
                    <table className="min-w-full bg-white shadow border border-gray-200">

                        <thead>
                            <tr className="h-14 bg-gray-50">
                                <th className="px-4 text-center">ID</th>
                                <th className="px-4 text-center">VNC</th>
                                <th className="px-4 text-center">Categoría</th>
                                <th className="px-4 text-center">Prioridad</th>
                                <th className="px-4 text-center">Estado</th>
                                <th className="px-4 text-center">Actualizado</th>
                                <th className="px-4 text-center">Reportado por</th>
                                <th className="px-4 text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.map((ticket) => (
                                <tr
                                    key={ticket.ID_TICKET}
                                    className="border-t h-14 hover:bg-blue-50"
                                >
                                    <td className="px-4 text-center border border-gray-200">{ticket.ID_TICKET}</td>
                                    <td className="px-4 text-center border border-gray-200">{ticket.DIRIP}</td>
                                    <td className="px-4 text-center border border-gray-200">{ticket.INCIDENTE}</td>

                                    <td className="px-4 text-center border border-gray-200 ">
                                        <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-md font-semibold">
                                            {ticket.PRIORIDAD}
                                        </span>
                                    </td>

                                    <td className="px-4 text-center border border-gray-200">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-md font-semibold">
                                            {ticket.ESTADO}
                                        </span>
                                    </td>

                                    <td className="px-4 text-center whitespace-nowrap border border-gray-200">
                                        {ticket.HORAREGISTRO}
                                    </td>

                                    <td className="px-4 text-center border border-gray-200">
                                        {ticket.USUARIO_SOLICITANTE}
                                    </td>

                                    <td className=" px-4 text-center  border border-gray-200">
                                        <button className=" flex justify-center  items-center w-10 h-10 border border border-gray-200 rounded-lg hover:bg-gray-100">
                                            <CiMenuKebab />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default Tickets;