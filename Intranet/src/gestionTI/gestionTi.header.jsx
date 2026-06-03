
import { useState } from "react";
import {
   FaHeadset,
   FaPlus,
   FaSearch,
   FaEye,
   FaTimes
} from "react-icons/fa";

function HeaderGestionTi(/*{ModalAbierto, setModalAbierto, setOpen}*/) {

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-blue-100 w-11 h-11 rounded-xl flex items-center justify-center">
                    <FaHeadset className="text-blue-600 text-lg" />
                </div>

                <div>
                    <h1 className="text-xl font-bold text-gray-800">
                        Gestion Ti
                    </h1>
                    <p className="text-sm text-gray-400">
                        Gestión de tickets
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeaderGestionTi;