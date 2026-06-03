const usuarioService = require('../servicios/usuario.servicios');



//1. CONTROLADOR DE USUARIOS
const losUsuarios = async (req, res) => {
    try {


        console.log('2.SE HIZO UNA CONSULTA DE USUARIOS')


        const usuarios = await usuarioService.losUsuarios();


        res.json(usuarios)


    } catch (error) {


        console.log(error);


        res.status(500).json({


            error: 'Error del servidor'


        })
    }
}




const losSoportes = async (req, res) => {
    try {
        console.log('SE HIZO UNA CONSULTA DE USUARIOS SOPORTES')
        const soportes = await usuarioService.LosSoportes();
        res.json(soportes)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error del servidor'
        })
    }
}

module.exports = {
    losUsuarios,
    losSoportes
}
