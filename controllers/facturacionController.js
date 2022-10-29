import { Facturacion } from '../models/Facturacion.js';
import { Detalle_Facturacion } from '../models/detalleFacturacion.js';

export const inicio = (req, res) => {
    res.send('Esto es el inicio del modulo Facturacion');
};

export const listarFacturacion = async (req, res) => {
    const lista = await Facturacion.findAll();
    if (lista.length == 0) {
        res.send('No existen datos');
    } else {
        res.json(lista);
    }
};

export const guardarFacturacion = async (req, res) => {
    const {
        cliente_id,
        numero_factura,
        impuesto,
        fecha_factura,
        tipo_pago,
        productos,
    } = req.body;

    if (
        !cliente_id ||
        !numero_factura ||
        !fecha_factura ||
        !impuesto ||
        !tipo_pago
    ) {
        res.send('Debe enviar los datos completos');
    } else {
        await Facturacion.create({
            cliente_id: cliente_id,
            empleado_id: req.usuario.id_empleado,
            numero_factura: numero_factura,
            fecha_factura: fecha_factura,
            impuesto: impuesto,
            tipo_pago: tipo_pago,
        }).catch((error) => {
            console.log(error);
            const msg = new Error('Error al guardar datos');
            return res.status(400).json({ msg: msg.message });
        });

        const productosSeleccinados = productos.map((producto) => ({
            id_producto: producto.id,
            id_factura: numero_factura,
            cantidad: producto.cantidad,
            precio_unitario: producto.precio_unitario,
        }));

        await Detalle_Facturacion.bulkCreate(productosSeleccinados)
            .then((data) => {
                return res.status(200).json({ msg: 'Registro Almacenado' });
            })

            .catch((error) => {
                console.log(error);
                const msg = new Error('Error al guardar datos');
                return res.status(400).json({ msg: msg.message });
            });
    }
};

export const modificarFacturacion = async (req, res) => {
    const { id_factura } = req.query;
    const { cliente_id, numero_factura, fecha_factura, impuesto, tipo_pago } =
        req.body;
    if (
        !cliente_id ||
        !numero_factura ||
        !fecha_factura ||
        !impuesto ||
        !tipo_pago
    ) {
        res.send('Debe enviar los datos completos');
    } else {
        var buscarFacturacion = await Facturacion.findOne({
            where: {
                id_factura: id_factura,
            },
        });

        if (!buscarFacturacion) {
            res.send('El id no existe');
        } else {
            buscarFacturacion.cliente_id = cliente_id;
            buscarFacturacion.empleado_id = req.usuario.id_empleado;
            buscarFacturacion.numero_factura = numero_factura;
            buscarFacturacion.fecha_factura = fecha_factura;
            buscarFacturacion.impuesto = impuesto;
            buscarFacturacion.tipo_pago = tipo_pago;
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

export const eliminarFacturacion = async (req, res) => {
    const { id_factura } = req.query;
    if (!id_factura) {
        res.send('Envie el id_factura del registro');
    } else {
        await Facturacion.destroy({
            where: {
                id_factura: id_factura,
            },
        })
            .then((data) => {
                console.log(data);
                if (data == 0) {
                    res.send('El id_factura no existe');
                } else {
                    res.send('Registro eliminado correctamente');
                }
            })
            .catch((error) => {
                res.send('Error al eliminar los datos');
            });
    }
};
