// ======================================================
// 1. IMPORTACIÓN DE LIBRERÍAS Y COMPONENTES
// ======================================================
import { useState } from "react";
import { useEffect } from "react";


// ======================================================
// 2. IMPORTACIÓN DE ICONOS
// ======================================================
import { BsHeartPulse } from "react-icons/bs";
import { IoMdLock } from "react-icons/io";




// ======================================================
// 3. COMPONENTE LOGIN
// ======================================================
function Login({ setLogeado, setLogeo }) {



    // ======================================================
    // 3.1 ESTADOS DEL COMPONENTE
    // ======================================================

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [mesa, setMesa] = useState(0);



    // ======================================================
    // 3.2 CONFIGURACIÓN GENERAL
    // ======================================================

    const IPBASE = 'http://128.0.18.50:3011';




    // ======================================================
    // 4. OBTENER IP PÚBLICA DEL USUARIO
    // ======================================================

    const obtenerIp = async () => {

        const resp = await fetch("https://api.ipify.org?format=json");

        const data = await resp.json();

        return data.ip;
    };




    // ======================================================
    // 5. FUNCIÓN LOGIN
    // ======================================================

    const getUsuario = async () => {

        try {

            // --------------------------------------------------
            // 5.1 OBTENER IP DEL USUARIO
            // --------------------------------------------------

            const ip = await obtenerIp();

            console.log(ip);



            // --------------------------------------------------
            // 5.2 PETICIÓN AL BACKEND
            // --------------------------------------------------

            const res = await fetch(`${IPBASE}/api/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    usuario,
                    password,
                    ip,
                    mesa

                })
            });



            // --------------------------------------------------
            // 5.3 VALIDAR RESPUESTA
            // --------------------------------------------------

            if (!res.ok) {

                const error = await res.json().catch(() => null);

                console.log("Error login:", error);

                alert("Usuario o contraseña incorrectos");

                return;
            }



            // --------------------------------------------------
            // 5.4 OBTENER DATOS DEL USUARIO
            // --------------------------------------------------

            const data = await res.json();



            // --------------------------------------------------
            // 5.5 GUARDAR SESIÓN LOCAL
            // --------------------------------------------------

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "usuario",
                JSON.stringify(data)
            );



            // --------------------------------------------------
            // 5.6 ACTUALIZAR ESTADO GLOBAL
            // --------------------------------------------------

            setLogeado(true);

            setLogeo(data);

        }

        catch (error) {

            console.log("Error de red:", error);

        }
    };




    // ======================================================
    // 6. RENDER DEL COMPONENTE
    // ======================================================

    return (

        <div
            className="w-full h-screen fixed inset-0 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/src/assets/bg.png')",
            }}
        >

            {/* ==================================================
                6.1 CONTENEDOR PRINCIPAL
            ================================================== */}

            <div className="w-[900px] h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">



                {/* ==================================================
                    6.2 PANEL IZQUIERDO
                ================================================== */}

                <div
                    className="w-1/2 h-full bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url('/src/assets/clinica.png')",
                    }}
                >
                </div>




                {/* ==================================================
                    6.3 PANEL DERECHO
                ================================================== */}

                <div className="w-1/2 h-full flex flex-col justify-center px-12">



                    {/* ==============================================
                        6.3.1 ENCABEZADO
                    ============================================== */}

                    <div className="mb-8 text-center">

                        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl">

                            <BsHeartPulse className="text-blue-600 w-15 h-15" />

                        </div>

                        <h1 className="text-3xl font-bold text-slate-800 mt-4">
                            Bienvenido
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Inicia sesión en la Mesa de Ayuda de la Clínica Belén
                        </p>

                        <p>
                            Seleccione la mesa de ayuda que requiere
                        </p>



                        {/* ==========================================
                            SELECTOR DE MESA
                        ========================================== */}

                        <select
                            onChange={(e) => {
                                setMesa(e.target.value);
                            }}
                        >

                            <option value="0">
                                Mesas
                            </option>

                            <option value="1">
                                Mesa Sistemas
                            </option>

                            <option value="2">
                                Mesa Biomedica
                            </option>

                            <option value="3">
                                Mesa Mantenimiento
                            </option>

                        </select>

                    </div>




                    {/* ==============================================
                        6.3.2 FORMULARIO LOGIN
                    ============================================== */}

                    <div className="space-y-4">



                        {/* CAMPO USUARIO */}

                        <input
                            type="text"
                            placeholder="Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />



                        {/* CAMPO CONTRASEÑA */}

                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />



                        {/* RECUPERAR CONTRASEÑA */}

                        <div className="text-right">

                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>

                        </div>




                        {/* BOTÓN LOGIN */}

                        <button

                            onClick={() => {

                                if (Number(mesa) === 0) {

                                    alert(
                                        'NO SE HA SELECCIONADO NINGUNA MESA PAI'
                                    );

                                } else {

                                    getUsuario();

                                }

                            }}

                            className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >

                            Iniciar sesión

                        </button>

                    </div>




                    {/* ==============================================
                        6.3.3 PIE DE SEGURIDAD
                    ============================================== */}

                    <div className="mt-8 text-center">

                        <IoMdLock className="text-gray-400 w-6 h-6 mx-auto mb-2" />

                        <p className="text-sm text-gray-500">
                            Información protegida y segura
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}



// ======================================================
// 7. EXPORTACIÓN DEL COMPONENTE
// ======================================================
export default Login;