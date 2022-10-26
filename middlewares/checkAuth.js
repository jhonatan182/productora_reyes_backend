import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';


const checkAuth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        //? obtener el token
        token = req.headers.authorization.split(' ')[1];

        //? dividir el jsonwebtoken
        const partes = token.split('.');

        if (partes.length !== 3) {
            const error = new Error('Token malformed');
            return res.status(500).json({ msg: error.message });
        }

        //? decodificar el contenido del token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        //?buscar la informacion del usuario
        try {
            const [empleado] = await Usuario.sequelize.query(
                `select e.id_empleado , e.nombre_empleado, e.apellido_empleado, u.usuario, r.descripcion_rol  
                from empleados e 
                inner join usuarios u on e.id_empleado = u.empleado_id 
                inner join roles r on e.rol_id  = r.id_rol 
                where e.id_empleado = ${decoded.id} `
            );

            //? almacenando el info del empleado en memoria del servidor
            req.usuario = empleado[0];

            //? pasando al siguiente middleware
            return next();
        } catch (error) {
            return res.status(400).json({ msg: 'Hubo un error' });
        }
    }

    if (!token) {
        const error = new Error('Token no valido');
        res.status(400).json({ msg: error.message });
    }
};

export default checkAuth;
