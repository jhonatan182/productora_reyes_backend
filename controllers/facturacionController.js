import { query } from 'express';
import { Facturacion } from '../models/Facturacion.js';

export const inicio = (req, res) => {C
    res.send('Esto es el inicio del modulo Facturacion');
  
};

export const listarFacturacion = async (req, res) => {
    const lista = await Facturacion.findAll();
    if(lista.length==0){
        res.send("No existen datos");
    }else{
        res.json(lista);
    }
};

export const guardarFacturacion = async (req,res) =>{
    const {cliente_id, empleado_id, numero_factura, fecha_factura, impuesto, tipo_pago} = req.body;
    if (!cliente_id || !empleado_id || !numero_factura || !fecha_factura || !impuesto || !tipo_pago) {
        res.send("Debe enviar los datos completos");
    }
    else {
            await Facturacion.create({
                cliente_id: cliente_id,
                empleado_id: empleado_id,
                numero_factura: numero_factura,
                fecha_factura: fecha_factura,
                impuesto: impuesto,
                tipo_pago: tipo_pago
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

export const modificarFacturacion = async (req, res) => {
        
        const { id_factura } = req.query;
        const {cliente_id, empleado_id, numero_factura,  fecha_factura, impuesto, tipo_pago} = req.body;
        if (!cliente_id || !empleado_id || !numero_factura || !fecha_factura || !impuesto || !tipo_pago) {
        res.send("Debe enviar los datos completos");
        }
        else {

            var buscarFacturacion = await Facturacion.findOne({
                where: {
                    id_factura: id_factura
                }
            })

            if (!buscarFacturacion) {
                res.send("El id no existe");
            }
            else {
                buscarFacturacion.cliente_id = cliente_id;
                buscarFacturacion.empleado_id = empleado_id;
                buscarFacturacion.numero_factura = numero_factura;
                buscarFacturacion.fecha_factura = fecha_factura;
                buscarFacturacion.impuesto = impuesto;
                buscarFacturacion.tipo_pago = tipo_pago;
                await buscarFacturacion.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro actualizado");
                    })

                    .catch((error) => {
                        console.log(error);
                        res.send("Error al actualizar los datos o el id de tipo no existe");
                    })
            }
        }
};


export const eliminarFacturacion = async(req,res) =>{
    const {id_factura} = req.query;
    if(!id_factura){
        res.send("Envie el id_factura del registro");
    }
    else{
        await Facturacion.destroy({
            where:
            {
                id_factura: id_factura,
            }
        })
        .then((data)=>{
            console.log(data);
            if(data ==0){
                res.send("El id_factura no existe");
            }
            else{
                res.send("Registro eliminado correctamente");
            }
        })
        .catch((error)=>{
            res.send("Error al eliminar los datos");
        })
    }
};