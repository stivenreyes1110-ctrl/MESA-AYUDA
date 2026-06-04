import { useState, useEffect } from "react";

function Proceso({ open, onClose, respuesta,setOpen,tickets,getTickets,page,setPage }) {

  const [estado, setEstado] = useState()
  const [cambioEstado ,setCambioEstado] = useState("")
 
  const postEstado = async () => {
    try {

      const res = await fetch("http://128.0.18.50:3011/api/tickets/estado",{
        method:'PATCH',
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          estado:estado,
          id_ticket:respuesta.ID_TICKET,
          descripcion:cambioEstado
        })
        
      });
      getTickets();
      setCambioEstado =("");
    } catch (error) {
      console.log(error)
    }
  }






  if (!open) return null

 return (
    <div className="fixed inset-0 bg-[#0b2756]/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh]">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#083b82] to-[#0b5fd3] text-white px-7 py-5 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">
                        Gestión de Ticket
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                        Panel de soporte técnico
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl hover:bg-white/15 transition"
                >
                    ✕
                </button>
            </div>

            {/* BODY */}
            <div className="p-7 bg-[#f8fbff] overflow-y-auto max-h-[70vh]">

                {/* RESUMEN */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <p className="text-xs text-slate-400 font-semibold">
                            ID TICKET
                        </p>
                        <p className="text-2xl font-bold text-[#0b2756] mt-1">
                            TKT-{respuesta.ID_TICKET}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <p className="text-xs text-slate-400 font-semibold">
                            ESTADO ACTUAL
                        </p>
                        <span className="inline-block mt-2 px-4 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            {respuesta.ESTADO}
                        </span>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <p className="text-xs text-slate-400 font-semibold">
                            PRIORIDAD
                        </p>
                        <span className="inline-block mt-2 px-4 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                            {respuesta.PRIORIDAD || "SIN PRIORIDAD"}
                        </span>
                    </div>

                </div>

                {/* INFORMACIÓN */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">
                    <h3 className="text-lg font-bold text-[#0b2756] mb-5">
                        Información del Ticket
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <p className="text-xs text-slate-400 font-semibold">
                                Dependencia
                            </p>
                            <p className="text-sm font-bold text-slate-700">
                                {respuesta.AREA}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400 font-semibold">
                                Sede
                            </p>
                            <p className="text-sm font-bold text-slate-700">
                                {respuesta.SEDE || "No registrada"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400 font-semibold">
                                Incidente
                            </p>
                            <p className="text-sm font-bold text-slate-700">
                                {respuesta.INCIDENTE}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400 font-semibold">
                                IP / VNC
                            </p>
                            <p className="text-sm font-bold text-slate-700">
                                {respuesta.DIRIP || "No registrada"}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <p className="text-xs text-slate-400 font-semibold mb-2">
                                Descripción
                            </p>
                            <div className="min-h-[90px] rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
                                {respuesta.DESCRIPCION || "Sin descripción"}
                            </div>
                        </div>

                    </div>
                </div>

                {/* RESPUESTA Y ESTADO */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-[#0b2756] mb-5">
                        Respuesta y actualización
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="text-xs text-slate-400 font-semibold">
                                Cambiar estado
                            </label>

                            <select
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                className="mt-2 w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value={0}>SELECCIONA ESTADO</option>
                                <option value={1}>POR ASIGNAR</option>
                                <option value={2}>EN PROCESO</option>
                                <option value={3}>SOLUCIONADO</option>
                                <option value={4}>CERRADO</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 font-semibold">
                                Soporte asignado
                            </label>

                            <input
                                readOnly
                                value={respuesta.USUARIO_ASIGNADO || "AÚN NO ASIGNADO"}
                                className="mt-2 w-full h-12 rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 font-semibold">
                                Respuesta / observación
                            </label>

                            <textarea
                                placeholder="Escribe la respuesta o gestión realizada..."
                                className="mt-2 w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-400"
                                value={cambioEstado}
                                onChange={(e) => setCambioEstado(e.target.value)}
                            />
                        </div>

                    </div>
                </div>

            </div>

            {/* FOOTER */}
            <div className="px-7 py-5 bg-white border-t border-slate-100 flex justify-end gap-4">
                <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200 transition"
                >
                    Cancelar
                </button>

                <button
                    onClick={() => {
                        postEstado();
                        setOpen(false);
                        alert("Estado actualizado correctamente!");
                    }}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#0b5fd3] to-[#1976ff] text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all"
                >
                    Guardar cambios
                </button>
            </div>

        </div>
    </div>
);
}

export default Proceso;