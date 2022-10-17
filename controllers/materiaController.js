
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
        
        const { id_materia } = req.query;
        const {nombre_materia, descripcion_materia, cantidad_existencia, precio_unitario} = req.body;
        if (!nombre_materia || !descripcion_materia || !cantidad_existencia|| !precio_unitario) {
        res.send("Hay un espacio en blanco");
        }
        else {

            var buscarMateria = await Materia.findOne({
                where: {
                    id_materia: id_materia
                }
            })

            if (!buscarMateria) {
                res.send("El id no existe");
            }
            else {
                buscarMateria.nombre_materia = nombre_materia;
                buscarMateria.descripcion_materia = descripcion_materia;
                buscarMateria.cantidad_existencia = cantidad_existencia;
                buscarMateria.precio_unitario =  precio_unitario;
                await buscarMateria.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Actualizado!!!");
                    })

                    .catch((error) => {
                        console.log(error);
                        res.send("Error al actualizar los datos");
                    })
            }
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
