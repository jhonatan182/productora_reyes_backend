import jwt from 'jsonwebtoken';
import Empleado from '../models/empleadoModel.js';

let token;

const checkAuth = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        //? obtener el token
        token = req.headers.authorization.split(' ')[1];

        //? decodicar el contenido del token
        const decoded = jwt.verify(token, 'miClavePrivada');

        //?buscar la informacion del usuario
        try {
            const empleado = await Empleado.findByPk(decoded.id);

            console.log(empleado);
        } catch (error) {
            console.log(error);
        }
    }

    if (!token) {
        const error = new Error('Token no valido');
        res.status(400).json({ msg: error.message });
    }
};

export default checkAuth;
