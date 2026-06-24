const express = require('express');
const conteoService = require('../servicios/conteo.servicios')


/*
==================================================
INDICE
==================================================

1. LOSCONTEOSPORUSUARIO
2. LOSCONTEOSPORSOPORTE
3. CONTEODEDIFERENCIAPORTIEMPO
4. LOSCONTEOSINDIVIDUALPORSOPORTE

==================================================
*/


//1. LOSCONTEOSPORUSUARIO
const losConteoPorUsuairo = async (req, res) => {
    try {


        console.log('SE HIZO CONSULTA DE CONTEO POR USUARIO')
        console.log(" ");
        console.log(" ");


        const conteo = await conteoService.losConteoPorUsuairo(req);
        res.json(conteo)


    } catch (error) {


        console.log(error)
        res.status(500).json({error: 'Error del Servidor'})


    }
}


//2. LOSCONTEOSPORSOPORTE
const losConteos = async (req, res) => {
    try {


        console.log('SE HIZO UNA CONSULTA DE CONTEOS TOTAL POR MESA')
        console.log(" ");
        console.log(" ");


        const conteo = await conteoService.losConteos(req);
        res.json(conteo)


    } catch (error) {


        console.log(error)
        res.status(500).json({error: 'Error del servidor'})


    }
}


//3. CONTEODEDIFERENCIAPORTIEMPO
const lasDiferencia = async (req, res) => {
    try {

        
        console.log("ENTRO A CONTEO DE DIFERENCIA DE TIEMPO ENTRE TICKETS")
        console.log(" ");
        console.log(" ");


        const result = await conteoService.lasDiferencia()
        res.json(result)


    } catch (error) {

        
        console.log(error)
        res.status(500).json({ok:false, mensaje: "Error de Servidor"})


    }

}


//4. LOSCONTEOSINDIVIDUALPORSOPORTE
const losConteosDeTickets = async (req, res) => {
    try {


        console.log("ENTRO A CONTEO DE TICKETS POR USUARIO DE SOPORTE")
        console.log(" ");
        console.log(" ");


        const result = await conteoService.losConteosDeTickets(req,res)
        res.json(result)


    } catch (error) {


        console.log(error)
        res.status(500).json({ ok: false, mensaje: "Error del servidor" })


    }
}


module.exports = { 
    

    losConteos, 
    losConteoPorUsuairo, 
    losConteosDeTickets,
    lasDiferencia


}