const mesasService = require('../servicios/mesas.servicios');


/*
==================================================
INDICE
==================================================

1. MESASDEAYUDA

==================================================
*/


//1. MESASDEAYUDA
const lasMesas = async (req, res) => {
    try {


        console.log('SE HIZO UNA CONSULTA DE MESAS')
        console.log('')
        console.log('')


        const mesas = await mesasService.lasMesas();


        res.json(mesas)

        
    } catch (error) {


        console.log(error);
        res.status(500).json({error:'Error del servidor'})


    }
}


module.exports = {


    lasMesas

    
}