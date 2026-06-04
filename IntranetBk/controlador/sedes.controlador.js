const sedesService = require('../servicios/sedes.servicios')


//CONTROLADOR DE SEDES
const lasSedes = async (req, res) => {
    try {


        console.log('4.SE HIZO UNA CONSULTA DE SEDES')
        console.log(" ");
        console.log(" ");


        const sedes = await sedesService.lasSedes()


        res.json(sedes)


    } catch (error) {


        console.log(error)


        res.status(500).json({


            error: 'Error Servidor'


        })
    }
}


module.exports = {


    lasSedes


}