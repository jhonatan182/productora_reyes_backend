import { query } from 'express';
import { Detalle } from '../models/DetalleCompra.js';

export const listarDetalle = async (req, res) => {
    const lista = await Detalle.findAll();
    if(lista.length==0){
        res.send("No existen datos");
    }else{
        res.json(lista);
    }
};
export const obtenerDetalle = async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await Detalle.findByPk(id);

        if (!detalle) {
            const error = new Error('Detalle no encontrada');
            return res.status(404).json({ msg: error.message });
        }

        return res.status(200).json(detalle);
    } catch (error) {
        console.log(error);
    }
};

export const agregarDetalle = async (req,res) =>{
    const {producto_id, id_factura_compra, cantidad} = req.body;
    if (!producto_id || !id_factura_compra || !cantidad) {
        res.send("Debe enviar los datos completos");
    }
    else {
            await Detalle.create({
                producto_id: producto_id,
                id_factura_compra: id_factura_compra,
                cantidad: cantidad
            })
                .then((data) => {
                    console.log(data);
                    res.send("Registro Almacenado");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al guardar datos");
                });
    }
};

export const editarDetalle = async (req, res) => {
    const { id } = req.params;

    if (
        Object.values(req.body).includes('') ||
        Object.keys(req.body).length === 0
    ) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({ msg: error.message });
    }
    try {
        const detalle = await Detalle.findByPk(id);

        if (!detalle) {
            const error = new Error('Materia no encontrado');
            return res.status(404).json({ msg: error.message });
        }
       
        const detalleActualizado = await detalle.update({
            producto_id: req['body']['producto_id'],
            id_factura_compra: req['body']['id_factura_compra'],
            cantidad: req['body']['cantidad'],
            
        });

        return res.status(200).json(detalleActualizado);
    } catch (error) {
        console.log(error);
    }
};

export const eliminarDetalle = async(req,res) =>{
    const {producto_id} = req.query;
    if(!producto_id){
        res.send("Envie el id del registro");
    }
    else{
        await Detalle.destroy({
            where:
            {
                producto_id: producto_id,
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