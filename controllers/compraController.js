import { query } from 'express';
import { Compra } from '../models/Compra.js';

export const listarCompra = async (req, res) => {
    const lista = await Compra.findAll();
    if(lista.length==0){
        res.send("No existen datos");
    }else{
        res.json(lista);
    }
};

export const obtenerCompra = async (req, res) => {
    const { id } = req.params;
    try {
        const compra = await Compra.findByPk(id);

        if (!compra) {
            const error = new Error('Compra no encontrada');
            return res.status(404).json({ msg: error.message });
        }

        return res.status(200).json(compra);
    } catch (error) {
        console.log(error);
    }
};

export const agregarCompra = async (req,res) =>{
    const { proveedor_id, numero_factura, fecha_compra, empleado_id} = req.body;
    if (!proveedor_id || !empleado_id) {
        res.send("Debe enviar los datos completos");
    }
    else {
            await Compra.create({
                proveedor_id: proveedor_id,
                numero_factura: numero_factura,
                fecha_compra: fecha_compra,
                empleado_id: empleado_id,
            })
                .then((data) => {
                    console.log(data);
                    res.send("Compra registrada");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al guardar datos");
                });
    }
};

export const editarCompra = async (req, res) => {
    const { id } = req.params;

    if (
        Object.values(req.body).includes('') ||
        Object.keys(req.body).length === 0
    ) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({ msg: error.message });
    }
    try {
        const compra = await Compra.findByPk(id);

        if (!compra) {
            const error = new Error('Compra no encontrado');
            return res.status(404).json({ msg: error.message });
        }
       
        const compraActualizado = await compra.update({
            proveedor_id: req['body']['proveedor_id'],
            numero_factura: req['body']['numero_factura'],
            fecha_compra: req['body']['fecha_compra'],
            empleado_id: req['body']['empleado_id'],
        });

        return res.status(200).json(compraActualizado);
    } catch (error) {
        console.log(error);
    }
};

export const eliminarCompra = async(req,res) =>{
    const {id} = req.query;
    if(!id){
        res.send("Envie el id del registro");
    }
    else{
        await Compra.destroy({
            where:
            {
                id: id,
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