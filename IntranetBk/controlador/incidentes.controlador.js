const incidentesService = require('../servicios/incidentes.servicios')


/*
==================================================
INDICE
==================================================

1. INCIDENTESPORMESA

==================================================
*/


//1. INCIDENTESPORMESA
const losIncidentes = async (req, res) => {
    try {


        console.log('5.SE HIZO UNA CONSULTA DE INCIDENTES')


        const incidentes = await incidentesService.losIncidentes();


        res.json(incidentes)


    } catch (error) {


        res.status(500).json({


            error: 'error servidor'


        })
    }
}


module.exports = { losIncidentes }