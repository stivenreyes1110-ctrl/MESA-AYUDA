import { useEffect } from "react";
import { useState } from "react";
import {
    FaHeadset,
    FaPlus
} from "react-icons/fa";

function HeaderSolicitudesSoporte({ setModalAbierto, fechaHora, setFechaHora }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">

            <div className="flex items-center justify-between">

                {/* Información */}
                <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                        <FaHeadset className="text-blue-600 text-2xl" />
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-[#0b2756]">
                            Mesa de Ayuda PRUEBAS
                        </h1>

                        <p className="text-slate-500 text-sm mt-1">
                            Gestión de tickets y soporte interno
                        </p>

                        <div className="flex items-center gap-2 mt-2">

                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

                            <span className="text-xs text-slate-400">
                                {fechaHora.toLocaleDateString()} · {fechaHora.toLocaleTimeString()}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Botón */}
                <button
                    onClick={() => setModalAbierto(true)}
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
                    Crear Ticket
                </button>

            </div>

        </div>);
}

export default HeaderSolicitudesSoporte;
