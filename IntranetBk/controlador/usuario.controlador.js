const usuarioService = require('../servicios/usuario.servicios');


/*
==================================================
INDICE
==================================================

1. LOSUSUARIOS
2. LOSSOPORTES

==================================================
*/


//1. LOSUSUARIOS
const losUsuarios = async (req, res) => {
    try {


        console.log('2.SE HIZO UNA CONSULTA DE USUARIOS')
        console.log(" ");
        console.log(" ");


        const usuarios = await usuarioService.losUsuarios();


        res.json(usuarios)


    } catch (error) {


        console.log(error);


        res.status(500).json({


            error: 'Error del servidor'


        })
    }
}



//2. LOSSOPORTES
const losSoportes = async (req, res) => {
    try {


        console.log('SE HIZO UNA CONSULTA DE USUARIOS SOPORTES')


        const {mesa} = req.params


        const soportes = await usuarioService.losSoportes(mesa);


        res.json(soportes)

        
    } catch (error) {


        console.log(error);
        res.status(500).json({error: 'Error del servidor'})


    }
}


module.exports = {


    losUsuarios,
    losSoportes

    
}
