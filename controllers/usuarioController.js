import Usuario from '../models/Usuario.js';
import generarJWT from '../helpers/generarJWT.js';

const registrarUsuario = async (req, res) => {
    if (
        Object.values(req.body).includes('') ||
        Object.keys(req.body).length === 0
    ) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const usuario = new Usuario(req.body);

        const usuarioAlmacenado = await usuario.save();

        return res.status(200).json(usuarioAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const autenticarUsuario = async (req, res) => {
    if (
        Object.values(req.body).includes('') ||
        Object.keys(req.body).length === 0
    ) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({ msg: error.message });
    }

    const { usuario, password } = req.body;
    try {
        const usuarioExiste = await Usuario.findOne({
            where: {
                usuario,
            },
        });

        if (!usuarioExiste) {
            const error = new Error('El usuario no existe');
            return res.status(404).json({ msg: error.message });
        }

        if (await usuarioExiste.compararPassword(password)) {
            // aqui va el codigo cuando el password coincida
            const [usuarioLogin] = await Usuario.sequelize.query(
                `select e.id_empleado , e.nombre_empleado, e.apellido_empleado, u.usuario, r.descripcion_rol  
                from empleados e 
                inner join usuarios u on e.id_empleado = u.empleado_id 
                inner join roles r on e.rol_id  = r.id_rol 
                where e.id_empleado = ${usuarioExiste.empleado_id} `
            );

            return res.status(200).json({
                usuario: usuarioLogin[0],
                token: generarJWT(usuarioLogin[0].id_empleado),
            });
        } else {
            const error = new Error('Password Incorrecto');
            return res.status(400).json({ msg: error.message });
        }
    } catch (error) {
        console.log(error);
    }
};

const perfil = async (req, res) => {
    const { usuario } = req;

    return res.status(200).json(usuario);
};

export { registrarUsuario, autenticarUsuario, perfil };
