import { useState, useEffect } from "react";
import {
    FaHeadset,
    FaPlus,
    FaSearch,
    FaEye,
    FaTimes
} from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LuClock9 } from "react-icons/lu";
import { MdChecklist } from "react-icons/md";
import { FaBoxesStacked } from "react-icons/fa6";


function TajertasGestionTi({ logeo }) {


    const [conteo, setConteo] = useState([]);
    const [id_rol, setIdRol] = useState(logeo.id);


    useEffect(() => {
        getConteo()
    }, []);


    const getConteo = async () => {
        try {


            const respuesta = await fetch(`http://128.0.18.50:3011/api/conteo/${id_rol}/`)
            const data = await respuesta.json();
            setConteo(data)


        } catch (error) {


            console.log(error)


        }
    }


    const estilosEstado = {
        "POR ASIGNAR": {
            bg: "bg-blue-50",
            text: "text-blue-600",
            line: "bg-blue-500",
            icon: <HiOutlineClipboardDocumentList />,
        },
        "EN PROCESO": {
            bg: "bg-cyan-50",
            text: "text-cyan-600",
            line: "bg-cyan-500",
            icon: <LuClock9 />,
        },
        "SOLUCIONADO": {
            bg: "bg-green-50",
            text: "text-green-600",
            line: "bg-green-500",
            icon: <MdChecklist />,
        },
        "TOTAL GENERAL": {
            bg: "bg-indigo-50",
            text: "text-indigo-600",
            line: "bg-indigo-500",
            icon: <FaBoxesStacked />,
        },
    };

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {conteo.map((conte) => {
                const estilo = estilosEstado[conte.ESTADO] || {
                    bg: "bg-blue-50",
                    text: "text-blue-600",
                    line: "bg-blue-500",
                    icon: <HiOutlineClipboardDocumentList />,
                };

                return (
                    <div
                        key={conte.ESTADO}
                        className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-4xl font-bold text-[#0b2756]">
                                    {conte.TOTAL}
                                </p>

                                <p className="text-sm text-slate-500 mt-2 uppercase">
                                    {conte.ESTADO}
                                </p>
                            </div>

                            <div
                                className={`w-14 h-14 rounded-2xl ${estilo.bg} ${estilo.text} flex items-center justify-center text-2xl`}
                            >
                                {estilo.icon}
                            </div>
                        </div>

                        <div className={`w-12 h-1 ${estilo.line} rounded-full mt-5`} />
                    </div>
                );
            })}
        </div>


    )
}
export default TajertasGestionTi;