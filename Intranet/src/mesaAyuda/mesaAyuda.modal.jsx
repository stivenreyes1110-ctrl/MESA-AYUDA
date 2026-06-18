import { useEffect, useState } from "react";
import {
    FaHeadset,
    FaPlus,
    FaSearch,
    FaEye,
    FaTimes
} from "react-icons/fa";
function ModalMesaAyuda({
    modalAbierto, setModalAbierto,

    logeo,

    getTickets,
    page, setPage,
    tickets, setTickets,

    getArea, areas,

    getSede, sedes,

    getIncidentes, incidentes, }) {

    const [incidente, setIncidente] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [sede, setSede] = useState("");
    const [area, setArea] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [usuarios, setUsuarios] = useState("");
    const [direccion, setDireccion] = useState(logeo.ip);

    const [seleccionSede, setSeleccionSede] = useState("");
    const [archivo, setArchivo] = useState(null)

    useEffect(() => {


        getArea();


        getSede();


        getIncidentes();


    }, [])
    if (!modalAbierto) return null;




    const guardarTickets = async () => {
        const formData = new FormData();

        formData.append("incidente", incidente);
        formData.append("prioridad", prioridad);
        formData.append("sede", sede);
        formData.append("area", area);
        formData.append("ubicacion", ubicacion);
        formData.append("descripcion", descripcion);
        formData.append("usuarios", logeo.nombre);
        formData.append("direccion", logeo.ip);
        formData.append("idusuario", logeo.id_usuario);
        formData.append("mesa", logeo.mesa)

        if (archivo) {
            formData.append("archivo", archivo);
        }

        const res = await fetch("http://128.0.18.50:3011/api/tickets", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            alert("Ticket creado");
            setModalAbierto(false);
            setIncidente("");
            setPrioridad("");
            setSede("");
            setArea("");
            setUbicacion("");
            setDescripcion("");
            setUsuarios("");
            setArchivo(null);
            await getTickets(page, logeo.id_usuario);
        } else {
            alert("Error");
        }
    };
    return (
        <div className="fixed inset-0 bg-[#0b2756]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-100">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-[#083b82] to-[#0b5fd3] text-white px-7 py-5 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-2xl">Crear Ticket</h2>
                        <p className="text-blue-100 text-sm mt-1">
                            Registra una nueva solicitud de soporte
                        </p>
                    </div>

                    <button
                        onClick={() => setModalAbierto(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/15 transition"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#f8fbff]">

                    <select
                        value={sede}
                        onChange={(e) => setSede(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Sede --</option>
                        {sedes.map((sede) => (
                            <option key={sede.ID} value={sede.ID}>
                                {sede.NOMBRE}
                            </option>
                        ))}
                    </select>

                    <select
                        value={incidente}
                        onChange={(e) => setIncidente(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Incidente --</option>
                        {incidentes.map((incidente) => (
                            <option key={incidente.ID} value={incidente.ID}>
                                {incidente.NOMBRE}
                            </option>
                        ))}
                    </select>

                    <input
                        value={logeo.ip}
                        onChange={(e) => setDireccion(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Dirección IP"
                    />

                    <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Área --</option>
                        {areas.filter((area) => area.IDSEDE === Number(sede)).map((area) => (


                            <option key={area.ID} value={area.ID}>
                                {area.NOMBRE}
                            </option>
                        ))}
                    </select>

                    <input
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        className="md:col-span-2 h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Descripción de la ubicación física"
                    />

                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="md:col-span-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none resize-none focus:ring-2 focus:ring-blue-400"
                        rows="4"
                        placeholder="Descripción del problema"
                    />

                    <select
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Prioridad --</option>
                        <option value="BAJA">BAJA</option>
                        <option value="MEDIA">MEDIA</option>
                        <option value="ALTA">ALTA</option>
                    </select>

                    <input
                        value={logeo.nombre}
                        readOnly
                        onChange={(e) => setUsuarios(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-500 outline-none cursor-not-allowed"
                        placeholder="Usuario"
                    />
                    <input
                        type="file"
                        onChange={(e) => setArchivo(e.target.files[0])}
                        className="md:col-span-2 h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Descripción de la ubicación física"
                    />
                </div>

                {/* FOOTER */}
                <div className="bg-white px-7 py-5 flex gap-4 justify-end border-t border-slate-100">
                    <button
                        onClick={() => setModalAbierto(false)}
                        className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200 transition"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={guardarTickets}
                        className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#0b5fd3] to-[#1976ff] text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all"
                    >
                        Guardar Ticket
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ModalMesaAyuda;