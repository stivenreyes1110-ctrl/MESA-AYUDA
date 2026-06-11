const loginService = require('../servicios/login.servicios');


const losLogin = async (req, res) => {


    try {


        console.log('1.YA INGRESO A EL ENDPOINT DE EL LOGIN');
        console.log('--EMPIEZA PROCESO DE LOGIN');


        const login = await loginService.losLogin(req.body, req);

        console.log(req.body)
        return res.json(login);


    } catch (error) {


        console.log(error);


        const esCredencialInvalida = error.message === "Usuario no encontrado" || error.message === "Contraseña incorrecta";


        return res.status(esCredencialInvalida ? 401 : 500).json({
            error: error.message
        });
    }
};


module.exports = {


    losLogin


};