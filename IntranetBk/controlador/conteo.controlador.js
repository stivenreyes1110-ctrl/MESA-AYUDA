const express = require('express');
const conteoService = require('../servicios/conteo.servicios')

const losConteos = async (req,res)=>{
    try {
        console.log('SE HIZO UNA CONSULTA DE CONTEOS')
        const conteo = await conteoService.losConteos(req);
        res.json(conteo)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error : 'Error del servidor'
        })
    }
}
const losConteoPorUsuairo = async (req,res) =>{
    try {
        console.log('SE HIZO CONSULTA POR USUARIO')
        const  conteo = await conteoService.losConteoPorUsuairo(req);
        res.json(conteo)
    } catch (error) {
        console.log(error)
        res.status(500).json
({
    error:'Error del Servidor'
})    }
}

module.exports = {losConteos,losConteoPorUsuairo}