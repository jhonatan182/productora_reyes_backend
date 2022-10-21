import proveedorModel from '../models/proveedorModel.js';
import { validationResult } from 'express-validator';
import {query} from 'express-validator';


export const listarProveedores = async (req, res) => {
    try {
        const proveedores = await proveedorModel.findAll();
        if (proveedores.length == 0) {
            return res.status(404).json({ msg: 'No hay proveedores' });
        }
        else {
        return res.status(200).json({msg: 'Lista de proveedores', proveedores});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

export const crearProveedores = async (req, res) => {
    //? revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        //? crear nuevo proveedor
        const proveedor = new proveedorModel(req.body);
        await proveedor.save();
        res.status(200).json({ msg: 'Proveedor creado correctamente',proveedor });
      
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

export const actualizarProveedor = async (req, res) => {
    //? revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    //? extraer la informacion del proveedor
    const { nombre_proveedor, descripcion_proveedor,identidad_proveedor, telefono_proveedor, direccion_proveedor, correo_proveedor, } = req.body;
    const nuevoProveedor = {};
    if (nombre_proveedor) {
        nuevoProveedor.nombre_proveedor = nombre_proveedor;
    }
    if (descripcion_proveedor) {
        nuevoProveedor.descripcion_proveedor = descripcion_proveedor;
    }
    if (identidad_proveedor) {
        nuevoProveedor.identidad_proveedor = identidad_proveedor;
    }
    if (telefono_proveedor) {
        nuevoProveedor.telefono_proveedor = telefono_proveedor;
    }
    if (direccion_proveedor) {
        nuevoProveedor.direccion_proveedor = direccion_proveedor;
    }
    if (correo_proveedor) {
        nuevoProveedor.correo_proveedor = correo_proveedor;
    }

    try {
        //? revisar el ID
        let proveedor = await proveedorModel.findByPk(req.query.id_proveedor);

        //? si el proveedor existe o no
        if (!proveedor) {
            return res.status(404).json({ msg: 'Proveedor no encontrado' });
        }
        //? actualizar
        proveedor = await proveedorModel.update(
            { ...nuevoProveedor },
            { where: { id_proveedor: req.query.id_proveedor } }
        );
            res.status(200).json({ msg: 'Proveedor actualizado correctamente', nuevoProveedor });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

export const eliminarProveedor = async (req, res) => {
    try {
        //? revisar el ID
        let proveedor = await proveedorModel.findByPk(req.query.id_proveedor);

        //? si el proveedor existe o no
        if (!proveedor) {
            return res.status(404).json({ msg: 'Proveedor no encontrado' });
        }
        //? eliminar el proveedor
        await proveedorModel.destroy({ where: { id_proveedor: req.query.id_proveedor } });
        res.status(200).json({ id_proveedor:req.query.id_proveedor , msg: 'Eliminado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}






