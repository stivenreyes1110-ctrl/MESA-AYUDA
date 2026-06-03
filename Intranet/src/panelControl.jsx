import {
    ResponsiveContainer,

    BarChart,
    Bar,
    Cell,
    LineChart,
    Line,

    PieChart,
    Pie,

    AreaChart,
    Area,

    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,

    RadialBarChart,
    RadialBar,

    ComposedChart,

    ScatterChart,
    Scatter,

    FunnelChart,
    Funnel,

    Treemap,

    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { useEffect, useState } from "react";


function TodosGraficos({logeo}) {
const data = [
    { name: "Lun", value: 1000 },
    { name: "Mar", value: 20 },
    { name: "Mie", value: 8 },
    { name: "Jue", value: 15 },
    { name: "Vie", value: 30 },
];

const radarData = [
    { subject: "Red", A: 120 },
    { subject: "Soporte", A: 98 },
    { subject: "Seguridad", A: 86 },
    { subject: "Tickets", A: 99 },
    { subject: "Servidores", A: 85 },
];

const scatterData = [
    { x: 10, y: 30 },
    { x: 20, y: 50 },
    { x: 30, y: 40 },
    { x: 40, y: 70 },
];

const treeData = [
    {
        name: "Tickets",
        children: [
            { name: "Pendientes", size: 400 },
            { name: "Proceso", size: 300 },
            { name: "Solucionados", size: 500 },
        ],
    },
];

const colors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#a855f7"
];
    const [conteo , setConteo] = useState([]);

    useEffect(()=>{
        getConteo()
    },[]);
    console.log("Datos de conteo: ", conteo)
    const getConteo = async()=>{
        try {
            const id = logeo.id_usuario;
            console.log('ID USUARIO', id)
            const respuesta = await fetch(`http://128.0.18.50:3011/api/conteo/usuario/${id}`)
            const data = await respuesta.json();
            setConteo(data) 
        } catch (error) {
            console.log(error)
        }
    }
    /*     
         <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
             <h2 className="text-xl font-bold mb-4">
                 Line Chart
             </h2>

             <ResponsiveContainer width="100%" height="90%">
                 <LineChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <Tooltip />
                     <Legend />

                     <Line
                         type="monotone"
                         dataKey="value"
                         strokeWidth={4}
                     />
                 </LineChart>
             </ResponsiveContainer>
         </div>

        
         <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
             <h2 className="text-xl font-bold mb-4">
                 Pie Chart
             </h2>

             <ResponsiveContainer width="100%" height="90%">
                 <PieChart>

                     <Pie
                         data={data}
                         dataKey="value"
                         nameKey="name"
                         outerRadius={100}
                         innerRadius={50}
                     />

                     <Tooltip />
                     <Legend />

                 </PieChart>
             </ResponsiveContainer>
         </div>

         
         <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
             <h2 className="text-xl font-bold mb-4">
                 Area Chart
             </h2>

             <ResponsiveContainer width="100%" height="90%">
                 <AreaChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <Tooltip />
                     <Legend />

                     <Area
                         type="monotone"
                         dataKey="value"
                         strokeWidth={3}
                     />
                 </AreaChart>
             </ResponsiveContainer>
         </div>

     
         <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
             <h2 className="text-xl font-bold mb-4">
                 Radar Chart
             </h2>

             <ResponsiveContainer width="100%" height="90%">
                 <RadarChart data={radarData}>

                     <PolarGrid />

                     <PolarAngleAxis dataKey="subject" />
                     <PolarRadiusAxis />

                     <Radar
                         dataKey="A"
                     />

                     <Legend />

                 </RadarChart>
             </ResponsiveContainer>
         </div>

         
         <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
             <h2 className="text-xl font-bold mb-4">
                 Radial Bar Chart
             </h2>

             <ResponsiveContainer width="100%" height="90%">
                 <RadialBarChart
                     innerRadius="20%"
                     outerRadius="100%"
                     data={data}
                 >

                     <RadialBar
                         dataKey="value"
                     />

                     <Legend />
                     <Tooltip />

                 </RadialBarChart>
             </ResponsiveContainer>
         </div>

         
         <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
             <h2 className="text-xl font-bold mb-4">
                 Composed Chart
             </h2>

             <ResponsiveContainer width="100%" height="90%">
                 <ComposedChart data={data}>

                     <CartesianGrid strokeDasharray="3 3" />

                     <XAxis dataKey="name" />
                     <YAxis />

                     <Tooltip />
                     <Legend />

                     <Bar dataKey="value" />

                     <Line
                         type="monotone"
                         dataKey="value"
                         strokeWidth={3}
                     />

                     <Area
                         type="monotone"
                         dataKey="value"
                     />

                 </ComposedChart>
             </ResponsiveContainer>
         </div>

        
         <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
             <h2 className="text-xl font-bold mb-4">
                 Scatter Chart
             </h2>

             <ResponsiveContainer width="100%" height="90%">
                 <ScatterChart>

                     <CartesianGrid />

                     <XAxis type="number" dataKey="x" />
                     <YAxis type="number" dataKey="y" />

                     <Tooltip />

                     <Scatter data={scatterData} />

                 </ScatterChart>
             </ResponsiveContainer>
         </div>

       
         <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
             <h2 className="text-xl font-bold mb-4">
                 Funnel Chart
             </h2>

             <ResponsiveContainer width="100%" height="90%">
                 <FunnelChart>

                     <Tooltip />

                     <Funnel
                         dataKey="value"
                         data={data}
                         isAnimationActive
                     />

                 </FunnelChart>
             </ResponsiveContainer>
         </div>

     
         <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
             <h2 className="text-xl font-bold mb-4">
                 TreeMap
             </h2>

             <ResponsiveContainer width="100%" height="90%">
                 <Treemap
                     data={treeData}
                     dataKey="size"
                     aspectRatio={4 / 3}
                 />
             </ResponsiveContainer>
         </div>

     </div>

 </div>*/
    return (

        <div className="min-h-screen w-full bg-slate-100 p-6">

            <h1 className="text-4xl font-bold mb-8">
                Dashboard Graficos
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                <div className="bg-white rounded-2xl shadow-xl p-4 h-96">
                    <h2 className="text-xl font-bold mb-4">
                        Numero de Tickets por Estado
                    </h2>

                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={conteo}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ESTADO" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            <Bar dataKey="TOTAL" radius={[10, 10, 0, 0]}>

                                {conteo.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}

                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );}
export default  TodosGraficos;