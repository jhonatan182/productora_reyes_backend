import { Compra } from '../models/Compra.js';
import { DetalleCompra } from '../models/DetalleCompra.js';

export const listarCompra = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }

    const lista = await Compra.findAll();
    if (lista.length == 0) {
        res.send('No existen datos');
    } else {
        res.json(lista);
    }
};

export const obtenerCompra = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }

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

export const agregarCompra = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }

    const { proveedor_id, numero_factura, fecha_compra, productos } = req.body;
    if (!proveedor_id) {
        res.send('Debe enviar los datos completos');
    } else {
        await Compra.create({
            proveedor_id: proveedor_id,
            numero_factura: numero_factura,
            fecha_compra: fecha_compra,
            empleado_id: req.usuario.id_empleado,
        }).catch((error) => {
            console.log(error);
            res.send('Error al guardar datos');
        });

        const productosSeleccionados = productos.map((producto) => ({
            producto_id: producto.id,
            id_factura_compra: numero_factura,
            cantidad: producto.cantidad,
            precio_unitario: producto.precio_unitario,
        }));

        await DetalleCompra.bulkCreate(productosSeleccionados).then((data) => {
            return res.status(200).json({ msg: 'Compra Almacenada' });
        });
    }
};

export const editarCompra = async (req, res) => {
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

export const eliminarCompra = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }

    const { id } = req.query;
    if (!id) {
        res.send('Envie el id del registro');
    } else {
        await Compra.destroy({
            where: {
                id: id,
            },
        })
            .then((data) => {
                console.log(data);
                if (data == 0) {
                    res.send('El id no existe');
                } else {
                    res.send('Eliminado correctamente');
                }
            })
            .catch((error) => {
                res.send('Error');
            });
    }
};
