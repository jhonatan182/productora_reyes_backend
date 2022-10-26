import { Materia } from '../models/Materia.js';

export const listarMateria = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }
    const lista = await Materia.findAll();
    if(lista.length==0){
        res.send("No existen datos");
    }else{
        res.json(lista);
    }
};
export const obtenerMateria = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }
    const { id } = req.params;
    try {
        const materia = await Materia.findByPk(id);

        if (!materia) {
            const error = new Error('Materia no encontrada');
            return res.status(404).json({ msg: error.message });
        }

        return res.status(200).json(materia);
    } catch (error) {
        console.log(error);
    }
};

export const agregarMateria = async (req,res) =>{
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }
    const {nombre_materia, descripcion_materia, cantidad_existencia, precio, proveedor_id} = req.body;
    if (!nombre_materia || !descripcion_materia || !cantidad_existencia|| !precio) {
        res.send("Debe enviar los datos completos");
    }
    else {
            await Materia.create({
                nombre_materia: nombre_materia,
                descripcion_materia: descripcion_materia,
                cantidad_existencia: cantidad_existencia,
                precio: precio,
                proveedor_id: proveedor_id,
                empleado_id: req.usuario.id_empleado
            })
                .then((data) => {
                    console.log(data);
                    res.send("Materia prima registrada");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al guardar datos");
                });
    }
};

export const editarMateria = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }
    const { id } = req.params;

    if (
        Object.values(req.body).includes('') ||
        Object.keys(req.body).length === 0
    ) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({ msg: error.message });
    }
    try {
        const materia = await Materia.findByPk(id);

        if (!materia) {
            const error = new Error('Materia no encontrado');
            return res.status(404).json({ msg: error.message });
        }
       
        const materiaActualizado = await materia.update({
            nombre_materia: req['body']['nombre_materia'],
            descripcion_materia: req['body']['descripcion_materia'],
            cantidad_existencia: req['body']['cantidad_existencia'],
            precio: req['body']['precio'],
            proveedor_id: req['body']['proveedor_id'],
        });

        return res.status(200).json(materiaActualizado);
    } catch (error) {
        console.log(error);
    }
};

export const eliminarMateria = async(req,res) =>{
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }
    const {id_materia} = req.query;
    if(!id_materia){
        res.send("Envie el id del registro");
    }
    else{
        await Materia.destroy({
            where:
            {
                id_materia: id_materia,
            }
        })
        .then((data)=>{
            console.log(data);
            if(data ==0){
                res.send("El id no existe");
            }
            else{
                res.send("Eliminado correctamente");
            }
        })
        .catch((error)=>{
            res.send("Error");
        })
    }
};
