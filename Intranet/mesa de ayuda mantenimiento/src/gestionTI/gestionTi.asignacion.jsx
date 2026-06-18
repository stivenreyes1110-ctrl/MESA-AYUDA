import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";


function AsignacioGestionTi({ abrir, setAbrir, seleccionTicket, tickets,getTickets,page,setPage }) {
    const [usuario, setUsuario] = useState([]);
    const [opcion, setOpcion] = useState("");
     const [inges, setInge] = useState([]);
       const getInge = async () => {
        try {
            const respuesta = await fetch("http://128.0.18.50:3011/api/usuarios/soporte")
            const data = await respuesta.json();
            setInge(data)
            getTickets();
        } catch (error) {
            console.log(error)
        }
    }

    const getAsignacion = async () => {
        try {
            const respuesta = await fetch(`http://128.0.18.50:3011/api/tickets/${seleccionTicket}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuario_id: usuario                   
                })
            });
            const data = await respuesta.json();

            alert('ticket asignado');
            setAbrir(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (abrir) {
            getInge();
        }
    }, [abrir])

    if (!abrir) return null;
return (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

    {abrir && (
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Asignación de Tickets
            </h2>

            <p className="text-sm text-blue-100 mt-1">
              Selecciona el ingeniero encargado del ticket
            </p>
          </div>

          <button
            onClick={() => setAbrir(false)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-6 bg-gray-50">

          {/* CARD INFO */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ingeniero Encargado
              </label>

              <select
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="
                  w-full
                  h-12
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  text-gray-700
                  shadow-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                  transition
                "
              >
                <option value="">
                  Seleccione un ingeniero
                </option>

                {inges.map((inge) => (
                  <option
                    key={inge.ID}
                    value={inge.ID}
                  >
                    {inge.NOMBRE}
                  </option>
                ))}
              </select>
            </div>

            {/* INFO EXTRA */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                El ingeniero seleccionado recibirá automáticamente
                la asignación del ticket.
              </p>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="bg-white border-t px-8 py-5 flex justify-end gap-3">

          <button
            onClick={() => setAbrir(false)}
            className="
              px-6
              py-3
              rounded-xl
              border
              border-gray-300
              text-gray-700
              hover:bg-gray-100
              transition
              font-medium
            "
          >
            Cancelar
          </button>

          <button
            onClick={getAsignacion}
            className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              font-semibold
              shadow-lg
              hover:scale-[1.02]
              hover:shadow-xl
              transition
            "
          >
            Guardar asignación
          </button>

        </div>

      </div>
    )}
  </div>
); 
}
export default AsignacioGestionTi;