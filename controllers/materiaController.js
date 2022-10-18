
import { query } from 'express';
import { Materia } from '../models/Materia.js';

export const listarMateria = async (req, res) => {
    const lista = await Materia.findAll();
    if(lista.length==0){
        res.send("No existen datos");
    }else{
        res.json(lista);
    }
};

export const agregarMateria = async (req,res) =>{
    const {nombre_materia, descripcion_materia, cantidad_existencia, precio_unitario} = req.body;
    if (!nombre_materia || !descripcion_materia || !cantidad_existencia|| !precio_unitario) {
        res.send("Debe enviar los datos completos");
    }
    else {
            await Materia.create({
                nombre_materia: nombre_materia,
                descripcion_materia: descripcion_materia,
                cantidad_existencia: cantidad_existencia,
                precio_unitario: precio_unitario,
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
            precio_unitario: req['body']['precio_unitario'],
        });

        return res.status(200).json(materiaActualizado);
    } catch (error) {
        console.log(error);
    }
};

export const eliminarMateria = async(req,res) =>{
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
