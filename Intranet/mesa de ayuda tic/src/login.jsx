import { useState } from "react";
import { useEffect } from "react";
import { BsHeartPulse } from "react-icons/bs";
import { IoMdLock } from "react-icons/io";











function Login({ setLogeado, setLogeo }) {
    //DATOS DE LOGIN
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const IPBASE = 'http://128.0.18.50:3011'


const obtenerIp = async () => {
  const resp = await fetch("https://api.ipify.org?format=json");
  const data = await resp.json();
  return data.ip;
};


    //SOLIITUD DE LOGIN A LA BASE DE DATOS
    //SOLIITUD DE LOGIN A LA BASE DE DATOS
    const getUsuario = async () => {
        try {
            //FECTH AL BACKEND PARA VERIFICAR USUARIO Y CONTRASEÑA    

             const ip = await obtenerIp();
             console.log(ip)
            const res = await fetch("http://128.0.18.50:3011/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuario,
                    password,
                    ip

                })
            });


            if (!res.ok) {
                const error = await res.json().catch(() => null);
                console.log("Error login:", error);
                alert("Usuario o contraseña incorrectos");
                return;
            }





            const data = await res.json();


            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "usuario",
                JSON.stringify(data)
            );
            setLogeado(true);
            setLogeo(data)

        } catch (error) {

            console.log("Error de red:", error);

        }

    };












    //FRONT DEL LOGIN
    return (
        <div
            className="w-full h-screen fixed inset-0 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/src/assets/bg.png')",
            }}
        >
            <div className="w-[900px] h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

                {/* Panel Izquierdo */}
                <div
                    className="w-1/2 h-full bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url('/src/assets/clinica.png')",
                    }}
                >
                </div>

                {/* Panel Derecho */}
                <div className="w-1/2 h-full flex flex-col justify-center px-12">

                    <div className="mb-8 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full  flex items-center justify-center text-3xl">
                            <BsHeartPulse className="text-blue-600 w-15 h-15" />
                        </div>

                        <h1 className="text-3xl font-bold text-slate-800 mt-4">
                            Bienvenido
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Inicia sesión en la Mesa de Ayuda de la Clinica Belen
                        </p>
                    </div>

                    <div className="space-y-4">

                        <input
                            type="text"
                            placeholder="Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="text-right">
                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <button
                            onClick={getUsuario}
                            className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Iniciar sesión
                        </button>
                    </div>

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
    {/*
        <div className="w-full h-screen fixed inset-0 bg-gray-200 flex justify-center items-center">
            <div className="w-[800px] h-[600px] bg-white rounded-xl shadow-lg p-6">
                <div className="w-[400px] h-full bg-white rounded-xl shadow-lg p-6">

                    <h1 className="text-2xl font-bold mb-6">
                        Iniciar sesión
                    </h1>

                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="w-full h-10 border rounded px-3 mb-4"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-10 border rounded px-3 mb-4"
                    />

                    <button
                        onClick={getUsuario}
                        className="w-full h-10 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Iniciar sesión
                    </button>

                </div>
            </div>

        </div>
*/}

}

export default Login;