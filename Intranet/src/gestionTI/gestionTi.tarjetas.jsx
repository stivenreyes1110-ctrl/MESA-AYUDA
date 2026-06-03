import { useState,useEffect } from "react";
import {
   FaHeadset,
   FaPlus,
   FaSearch,
   FaEye,
   FaTimes
} from "react-icons/fa";
function TajertasGestionTi({ logeo }) {
    const [conteo , setConteo] = useState([]);
    const [id_rol, setIdRol] = useState(logeo.id);

    useEffect(()=>{
        getConteo()
    },[]);

    const getConteo = async()=>{
        try {
            const respuesta = await fetch(`http://128.0.18.50:3011/api/conteo/${id_rol}/`)
            const data = await respuesta.json();
            setConteo(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {conteo.map((conte)=>(
            <div className="bg-white rounded-xl shadow-sm p-5 ">
                <p className="text-2xl font-bold">{conte.TOTAL}</p>
                <p className="text-sm text-gray-500">{conte.ESTADO}</p>
            </div>
            ))}
        </div>
    )
}
export default TajertasGestionTi;