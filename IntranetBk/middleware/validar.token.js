const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) => {
    try {

        
        console.log("↓ Validando token...");


        const authHeader = req.headers.authorization;


        if (!authHeader) {


        return res.status(401).json({ message: "Token no proporcionado" });    


        }

        const token = authHeader.split(' ')[1];


        if (!token) {


            return res.status(401).json({ message: "Token no proporcionado" });
        
        
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        req.usuario = decoded;
        
        
        next();


    } catch (error) {


        console.error("Error en validarToken:", error);


        return res.status(401).json({ message: "Token no válido" });


    }
};


module.exports = validarToken;