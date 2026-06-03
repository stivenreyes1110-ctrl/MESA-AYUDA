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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Gestión de Ticket</h2>
            <p className="text-xs opacity-80">Panel de soporte técnico</p>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        {/* BODY */}

        <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">

          {/* LEFT INFO */}
          <div className="p-5 border-r bg-gray-50 space-y-4">

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <p className="text-xs text-gray-500">ID TICKET</p>
              <p className="text-lg font-semibold">TKT {respuesta.ID_TICKET}</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border space-y-2">
              <div>
                <p className="text-xs text-gray-500">Estado actual</p>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                  {respuesta.ESTADO}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-500">Dependencia</p>
                <p className="text-sm font-medium">{respuesta.AREA}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Solicitud</p>
                <p className="text-sm">{respuesta.INCIDENTE}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <p className="text-xs text-gray-500 mb-2">Cambiar estado</p>

              <select value={estado} onChange={(e) => setEstado(e.target.value)} className="w-full border rounded-lg p-2 text-sm bg-gray-50">
                <option value={0}>SELECCIONA ESTADO</option>
                <option value={1}>POR ASIGNAR</option>
                <option value={2}>EN PROCESO</option>
                <option value={3}>SOLUCIONADO</option>
                <option value={4}>CERRADO</option>
              </select>

              <button onClick={()=>{postEstado();setOpen(false)}} className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-lg">
                Actualizar estado
              </button>
            </div>

          </div>

          {/* CHAT AREA */}
          <div className="col-span-2 flex flex-col">

            {/* MESSAGES */}
            <div className="flex-1 p-5 space-y-3 overflow-y-auto bg-white">


            </div>

            {/* INPUT */}
            <div className="border-t p-4 flex gap-2 bg-gray-50">
                            <select value={estado} onChange={(e) => setEstado(e.target.value)} className="w-50 border rounded-lg p-2 text-sm bg-gray-50">
                <option value={0}>SELECCIONA ESTADO</option>
                <option value={1}>POR ASIGNAR</option>
                <option value={2}>EN PROCESO</option>
                <option value={3}>SOLUCIONADO</option>
                <option value={4}>CERRADO</option>
              </select>
              <textarea
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={cambioEstado}
                onChange={(e)=>{setCambioEstado(e.target.value)}}
              ></textarea>

              <button  onClick={(e)=>{postEstado();setOpen(false);alert("Estado actualizado correctamente!")}} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-xl text-sm">
                Enviar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )


}

export default Proceso;