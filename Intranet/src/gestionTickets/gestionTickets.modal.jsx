import { useState } from "react";
import {
    FaHeadset,
    FaPlus,
    FaSearch,
    FaEye,
    FaTimes
} from "react-icons/fa";

function ModalGestionTickets({ modalAbierto, setModalAbierto }) {
    const [incidente, setIncidente] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [sede, setSede] = useState("");
    const [area, setArea] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [descripcion, setDescripcion] = useState("");

    if (!modalAbierto) return null;

    const guardarTickets = async () => {
        const res = await fetch("http://128.0.18.50:3011/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                incidente,
                prioridad,
                sede,
                area,
                ubicacion,
                descripcion
            })
        });
        const data = await res.json();
        if (res.ok) {
            alert("Ticket creado");
            setModalAbierto(false);
        } else {
            alert("Error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
                {/* HEADER */}
                <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Crear Ticket</h2>

                    <button
                        onClick={() => setModalAbierto(false)}
                        className="p-2 hover:bg-blue-700 rounded-lg"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6 grid grid-cols-2 gap-4">
                    <input value={incidente} onChange={(e) => setIncidente(e.target.value)} className="border rounded-lg px-3 py-2" placeholder="Incidente" />
                    <input value={prioridad} onChange={(e) => setPrioridad(e.target.value)} className="border rounded-lg px-3 py-2" placeholder="Prioridad" />
                    <input value={sede} onChange={(e) => setSede(e.target.value)} className="border rounded-lg px-3 py-2" placeholder="Sede" />
                    <input value={area} onChange={(e) => setArea(e.target.value)} className="border rounded-lg px-3 py-2" placeholder="Área" />

                    <input
                        className="border rounded-lg px-3 py-2 col-span-2"
                        placeholder="Ubicación"
                    />

                    <textarea
                        className="border rounded-lg px-3 py-2 col-span-2"
                        rows="4"
                        placeholder="Descripción"
                    />
                </div>

                {/* FOOTER */}
                <div className="p-6 pt-0 flex gap-3">
                    <button
                        onClick={() => setModalAbierto(false)}
                        className="border px-4 py-2"
                    >
                        Cancelar
                    </button>

                    <button 
                        onClick={guardarTickets}
                        className="flex-1 bg-blue-600 text-white rounded-lg py-2"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalGestionTickets;
