const express = require('express')
const areaServices = require('../servicios/areas.servicios');

//2. CONTROLADOR DE AREAS
const lasAreas = async (req,res) =>{
    try {


        console.log ('3.SE HIZO UNA CONSULTA DE AREAS');


        const areas = await areaServices.lasAreas();


        res.json(areas)

        
    } catch (error) {


        console.log(error)


        res.status(500).json({


            error:'Error del servidor'


        })
    }
}


module.exports = {


    lasAreas


}