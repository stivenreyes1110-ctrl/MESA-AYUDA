import { useState } from "react";
import mesa from "./assets/mesa.png";
import MesaAyuda from "../src/mesaAyuda";
import { FaRegBell } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { IoMenu } from "react-icons/io5";
import { AiFillCaretDown } from "react-icons/ai";
import {
  FaHome, FaBullhorn, FaBolt, FaFolder, FaHeadset,
  FaUsers, FaAward, FaPhoneAlt, FaChartBar, FaCog, FaTools, FaTablet, FaFileMedicalAlt, FaHandHoldingMedical
} from "react-icons/fa";
import { AiOutlineFileProtect } from 'react-icons/ai'
import { GiTakeMyMoney } from "react-icons/gi";
import GestionTi from "./gestionTi";
import { FaComputer } from "react-icons/fa6";
import logo from "./assets/logo.png"
import TodosGraficos from "./panelControl";
import { useEffect } from "react";
import { FaPersonDrowning } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2"


function Slider({
  // VARIABLES DE LOGEO
  logeo, setLogeo,
  setLogeado,


  // VARIABLES DE TICKETS
  getTickets,
  page, setPage,
  tickets, setTickets,
  filtroTickets, setFiltroTickets,


  // VARIABLES DE CONTEO
  getConteo, conteo, setConteo,


  //VARIABLES DE MODAL
  getArea, areas, setAreas,
  getSede, sedes, setSedes,
  getIncidentes, incidentes, setIncidentes


}) {


  let timer;
  const [vista, setVista] = useState("inicio")
  const [open, setOpen] = useState(false);


  const enlaces = [


    {
      nombre: "Mesa De Ayuda",
      vista: "mesa",
      logo: <AiOutlineFileProtect className="m-2 text-lg" />,
    },


    {
      nombre: "Gestion Ti",
      vista: "gestion",
      logo: <FaComputer className="m-2 text-lg" />,
      roles: [2]
    },
        {
      nombre: "Inventario de area",
      vista:"inventario",
      logo: <GiTakeMyMoney className="m-2 text-lg" />,
      roles: [2]
    },

    {
      nombre: "panel Control",
      vista: "panel",
      logo: <GiTakeMyMoney className="m-2 text-lg" />,
      roles: [2]
    },


    {
      nombre: "Oxigeno",
      url: "http://128.0.13.63:8080",
      logo: <FaHandHoldingMedical className="m-2 text-lg" />,
      roles: [2]
    },


    {
      nombre: "Causa Externa",
      url: "http://128.0.18.50:3002/causaExterna.html?",
      logo: <FaFileMedicalAlt className="m-2 text-lg" />,
      roles: [2]
    },


    {
      nombre: "Entregas Facturacion",
      url: "http://128.0.18.50:4858/facturacion.html",
      logo: <GiTakeMyMoney className="m-2 text-lg" />,
      roles: [2]
    }
  ];


  const enlacesFiltrados = enlaces.filter(item =>
    !item.roles || item.roles.includes(logeo.idrol)
  );


  const renderVista = () => {
    switch (vista) {


      case "mesa":
        return <MesaAyuda onClick={() => { setPage(1) }} logeo={logeo} getTickets={getTickets} page={page} setPage={setPage} tickets={tickets} setTickets={setTickets} getConteo={getConteo} conteo={conteo} setConteo={setConteo} getArea={getArea} areas={areas} setAreas={setAreas} getSede={getSede} sedes={sedes} setSedes={setSedes} getIncidentes={getIncidentes} incidentes={incidentes} setIncidentes={setIncidentes} fechaHora={fechaHora} setFechaHora={setFechaHora} filtroTickets={filtroTickets} setFiltroTickets={setFiltroTickets} />;


      case "gestion":
        return <GestionTi onClick={() => { setPage(1) }} logeo={logeo} getTickets={getTickets} page={page} setPage={setPage} tickets={tickets} setTickets={setTickets} getConteo={getConteo} conteo={conteo} setConteo={setConteo} getArea={getArea} areas={areas} setAreas={setAreas} getSede={getSede} sedes={sedes} setSedes={setSedes} getIncidentes={getIncidentes} incidentes={incidentes} setIncidentes={setIncidentes} fechaHora={fechaHora} setFechaHora={setFechaHora} filtroTickets={filtroTickets} setFiltroTickets={setFiltroTickets} />;

        
      case "panel":
        return <TodosGraficos logeo={logeo} onClick={() => { setPage(1) }} />;


      default:
        return <MesaAyuda onClick={() => { setPage(1) }} logeo={logeo} getTickets={getTickets} page={page} setPage={setPage} tickets={tickets} setTickets={setTickets} getConteo={getConteo} conteo={conteo} setConteo={setConteo} getArea={getArea} areas={areas} setAreas={setAreas} getSede={getSede} sedes={sedes} setSedes={setSedes} getIncidentes={getIncidentes} incidentes={incidentes} setIncidentes={setIncidentes} fechaHora={fechaHora} setFechaHora={setFechaHora} filtroTickets={filtroTickets} setFiltroTickets={setFiltroTickets} />;


    }
  }


  const [fechaHora, setFechaHora] = useState(new Date());


  useEffect(() => {
    const intervalo = setInterval(() => {


      setFechaHora(new Date());


    }, 60000);


    return () => clearInterval(timer);


  }, []);


  return (
    <div className="flex min-h-screen w-full bg-[#f4f8ff] font-din">




      {/* SIDEBAR */}
      <aside
        className={`min-h-screen bg-gradient-to-b from-[#083b82] to-[#0b5fd3] text-white transition-all duration-300 overflow-hidden ${open ? "w-72" : "w-0"
          }`}
      >
        <div className="h-32 flex items-center justify-center px-6">
          <img
            src={logo}
            alt="Clínica Belén"
            className="w-full max-h-24 object-contain"
          />
        </div>

        <nav className="px-4 mt-4 space-y-2">
          {enlacesFiltrados.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item.url) {
                  window.open(item.url, "_blank");
                } else {
                  setVista(item.vista);
                }
              }}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300
                            ${vista === item.vista
                  ? "bg-white text-[#0b5fd3] shadow-lg"
                  : "text-white hover:bg-white/15"
                }`}
            >
              <span className="text-xl flex items-center">
                {item.logo}
              </span>

              <span className="text-base font-medium">
                {item.nombre}
              </span>
            </div>
          ))}
        </nav>
      </aside>




      {/* CONTENIDO */}
      <main className="flex flex-col flex-1 min-h-screen overflow-hidden">




        {/* TOPBAR */}
        <header className="h-24 bg-white/90 backdrop-blur shadow-sm flex items-center justify-between px-8">

          <div className="flex items-center gap-8">
            <button
              onClick={() => setOpen(!open)}
              className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-slate-100 transition"
            >
              <IoMenu className="w-7 h-7 text-[#083b82]" />
            </button>

            <div className="relative hidden md:block">
              <input
                type="search"
                className="w-[460px] h-13 bg-[#f1f5fb] rounded-2xl px-5 pr-12 outline-none text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400"
                placeholder="Buscar en la Mesa de ayuda..."
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <HiOutlineMagnifyingGlass />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">

            <div className="w-12 h-12 rounded-full bg-[#eef6ff] flex items-center justify-center border border-blue-100">
              <span className="text-[#0b5fd3] text-xl"><FaPersonDrowning /></span>
            </div>

            <div className="hidden lg:block leading-tight">
              <p className="m-0 font-bold text-sm text-[#0b2756]">
                {logeo.nombre}
              </p>
              <p className="text-sm m-0 text-slate-500">
                Bienvenido a la Mesa de Ayuda
              </p>
            </div>

            <select
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none cursor-pointer"
              onChange={(e) => {
                if (e.target.value === "logout") {
                  localStorage.removeItem("token");
                  localStorage.removeItem("usuario");
                  setLogeado(false);
                }
              }}
            >
              <option value="">Opciones</option>
              <option value="logout">Cerrar Sesión</option>
            </select>

          </div>
        </header>





        {/* ÁREA PRINCIPAL */}
        <section className="flex-1 overflow-auto p-8 relative">

          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-40 w-[400px] h-[400px] bg-cyan-100 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {renderVista()}
          </div>

        </section>

      </main>
    </div>
  );
}
export default Slider;