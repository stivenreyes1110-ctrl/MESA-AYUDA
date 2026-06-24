import { useEffect, useState } from "react";
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

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";

function Indicadores({ logeo }) {
    const [conteo, setConteo] = useState([]);
    const [conteoTickets, setConteoTickets] = useState([]);
    const [diferencia, setDiferencia] = useState([]);
    const mesa = logeo.mesa
    let total = 0;
    const colors = ["#0b5fd3", "#22c55e", "#f59e0b", "#8b5cf6"];

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

    useEffect(() => {
        getConteo();
        getConteoTickets();
        getDiferencia();
    }, []);
   /*onst sumaHoras = diferencia.reduce(
        (total, ticket) => total + Number(ticket.HORA_DIFF || 0),
        0
    );*/

    /*let promedio = Math.round(sumaHoras / diferencia.length);
    console.log("Este es el promedio de atencion", promedio, "minutos");*/
    const getConteo = async () => {
        try {
            const id = logeo.id_usuario;

            const respuesta = await fetch(
                `http://128.0.18.50:3011/api/conteo/${id}/${mesa}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/json",
                        "Authorization":
                            `Bearer ${logeo.token}`
                    }
                }
            );

            const data = await respuesta.json();
            setConteo(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getDiferencia = async () => {
        try {
            const respuesta = await fetch(`http://128.0.18.50:3011/api/conteo/diferencia`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/json",
                        "Authorization":
                            `Bearer ${logeo.token}`
                    }
                });

            const data = await respuesta.json();
            setDiferencia(data);
           /* total = diferencia.reduce((acc, fila) => {
                return acc + fila[fila.length - 1];
            }, 0);
            console.log(diferencia);
            console.log("promedio de respuesta:", total);*/
        } catch (error) {
            console.log(error);
        }
    };
    const getConteoTickets = async () => {
        try {
            const respuesta = await fetch(
                `http://128.0.18.50:3011/api/conteo/${mesa}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/json",
                        "Authorization":
                            `Bearer ${logeo.token}`
                    }
                }
            );

            const data = await respuesta.json();
            setConteoTickets(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f5f9ff] p-6">

            {/* HEADER */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">

                <div className="flex items-center justify-between">

                    {/* Información */}
                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                            <FaHeadset className="text-blue-600 text-2xl" />
                        </div>

                        <div>

                            <h1 className="text-3xl font-bold text-[#0b2756]">
                                Dashboard TIC
                            </h1>

                            <p className="text-slate-500 text-sm mt-1">
                                Indicadores y métricas de la Mesa de Ayuda
                            </p>

                            <div className="flex items-center gap-2 mt-2">

                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

                                <span className="text-xs text-slate-400">
                                    <p>tiempo estimado de solucion de tickets  minutos</p>
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* TARJETAS RESUMEN */}

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

            {/* GRAFICOS PRINCIPALES */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

                {/* BARRAS */}
                <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 h-[420px]">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-[#0b2756]">
                            Tickets por Estado
                        </h2>

                        <p className="text-sm text-slate-500">
                            Resumen general de solicitudes
                        </p>
                    </div>

                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={conteo}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                            />
                            <XAxis
                                dataKey="ESTADO"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend />

                            <Bar
                                dataKey="TOTAL"
                                radius={[12, 12, 0, 0]}
                            >
                                {conteo.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* TORTA */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 h-[420px]">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-[#0b2756]">
                            Distribución
                        </h2>

                        <p className="text-sm text-slate-500">
                            Porcentaje por estado
                        </p>
                    </div>

                    <ResponsiveContainer width="100%" height="85%">
                        <PieChart>
                            <Pie
                                data={conteo.filter(item => item.ESTADO !== "TOTAL GENERAL")}
                                dataKey="TOTAL"
                                nameKey="ESTADO"
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                innerRadius={55}
                                label
                            >
                                {conteo
                                    .filter(item => item.ESTADO !== "TOTAL GENERAL")
                                    .map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={colors[index % colors.length]}
                                        />
                                    ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* SOPORTE TIC */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 h-[430px]">

                <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#0b2756]">
                        Estadística de Soporte TIC
                    </h2>

                    <p className="text-sm text-slate-500">
                        Tickets gestionados por soporte
                    </p>
                </div>

                <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                        data={conteoTickets}
                        layout="vertical"
                        margin={{
                            top: 20,
                            right: 30,
                            left: 80,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                        />

                        <XAxis
                            type="number"
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            dataKey="IDSOPORTE"
                            type="category"
                            tick={{ fontSize: 12 }}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="TOTAL"
                            fill="#0b5fd3"
                            radius={[0, 12, 12, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default Indicadores;
