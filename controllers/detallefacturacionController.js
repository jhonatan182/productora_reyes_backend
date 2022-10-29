import { query } from 'express';
import { Detalle_Facturacion } from '../models/detalleFacturacion.js';

export const inicio = (req, res) => {
    C;
    res.send('Esto es el inicio del modulo Detalle Facturacion');
};

export const listarDetalleFacturacion = async (req, res) => {
    const lista = await Detalle_Facturacion.findAll();
    if (lista.length == 0) {
        res.send('No existen datos');
    } else {
        res.json(lista);
    }
};

export const modificarDetalleFacturacion = async (req, res) => {
    const { id_factura, id_producto } = req.query;
    const { cantidad, precio_unitario } = req.body;
    if (!id_producto || !id_factura || !cantidad || !precio_unitario) {
        res.send('Debe enviar los datos completos');
    } else {
        var buscarFacturacion = await Detalle_Facturacion.findOne({
            where: {
                id_producto: id_producto,
                id_factura: id_factura,
            },
        });

        if (!buscarFacturacion) {
            res.send('El id no existe');
        } else {
            buscarFacturacion.cantidad = cantidad;
            buscarFacturacion.precio_unitario = precio_unitario;
            await buscarFacturacion
                .save()
                .then((data) => {
                    console.log(data);
                    res.send('Registro actualizado');
                })

                .catch((error) => {
                    console.log(error);
                    res.send(
                        'Error al actualizar los datos o el id de tipo no existe'
                    );
                });
        }
    }
};

export const eliminarDetalleFacturacion = async (req, res) => {
    const { id_factura, id_producto } = req.query;
    if (!id_producto || !id_factura) {
        res.send('Envie el id_producto o id_factura del registro');
    } else {
        await Detalle_Facturacion.destroy({
            where: {
                id_producto: id_producto,
                id_factura: id_factura,
            },
        })
            .then((data) => {
                console.log(data);
                if (data == 0) {
                    res.send('El id_producto o id_factura no existe');
                } else {
                    res.send('Registro eliminado correctamente');
                }
            })
            .catch((error) => {
                res.send('Error al eliminar los datos');
            });
    }
};
