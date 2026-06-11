const express = require('express');
const conteoService = require('../servicios/conteo.servicios')

const losConteos = async (req, res) => {
    try {
        console.log('SE HIZO UNA CONSULTA DE CONTEOS')
        console.log(" ");
        console.log(" ");
        const conteo = await conteoService.losConteos(req);
        res.json(conteo)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Error del servidor'
        })
    }
}
const losConteoPorUsuairo = async (req, res) => {
    try {
        console.log('SE HIZO CONSULTA POR USUARIO')
        const conteo = await conteoService.losConteoPorUsuairo(req);
        res.json(conteo)
    } catch (error) {
        console.log(error)
        res.status(500).json
            ({
                error: 'Error del Servidor'
            })
    }
}


const losConteosDeTickets = async (req, res) => {
    try {
        console.log("ENTRO A CONTEO DE TICKETS POR SOPORTE")

        const result = await conteoService.losConteosDeTickets()
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, mensaje: "Error del servidor" })
    }
}

const lasDiferencia = async (req, res) => {
    try {
        const result = await conteoService.lasDiferencia()
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ok:false, mensaje: "Error de Servidor"})
    }

}

module.exports = { losConteos, losConteoPorUsuairo, losConteosDeTickets ,lasDiferencia}