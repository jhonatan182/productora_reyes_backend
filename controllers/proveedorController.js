import proveedorModel from '../models/proveedorModel.js';
import { validationResult } from 'express-validator';
import {query} from 'express-validator';


export const listarProveedores = async (req, res) => {
    
    try {
        const proveedores = await proveedorModel.findAll();
        if (proveedores.length == 0) {
            res.send("No existen proveedores");
        }
        else {
            res.json(proveedores);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

//obtener un proveedor por su id
export const obtenerProveedor = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }
    const { id } = req.params;
    try {
        const proveedor = await proveedorModel.findByPk(id);
        if (!proveedor) {
            const error = new Error('Proveedor no encontrado');
            return res.status(404).json({ msg: error.message });
        }
        res.json(proveedor);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

export const crearProveedores = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }

    //? revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        //? validando que el correo no haya sido registrado
        const clienteExiste = await proveedorModel.findOne({
            where: {
                correo_proveedor: req.body.correo_proveedor,
            },
        });
        if (clienteExiste) {
            const error = new Error('El correo ya ha sido registrado');
            return res.status(400).json({ msg: error.message });
        }
        //? crear nuevo proveedor
        const proveedor = new proveedorModel(req.body);
        await proveedor.save();
        res.json(proveedor);
      
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

export const actualizarProveedor = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }
    const { id } = req.params;
    try {
        const proveedor = await proveedorModel.findByPk(id);
        if (!proveedor) {
            const error = new Error('Proveedor no encontrado');
            return res.status(404).json({ msg: error.message });
        }
        //? actualizando los datos
        const proveedorActualizado = await proveedor.update(req.body);
        res.json(proveedorActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

    
};

export const eliminarProveedor = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permisos para esta accion');
        return res.status(404).json({ msg: error.message });
    }
    const { id } = req.params;
    try {
        const proveedor = await proveedorModel.findByPk(id);
        if (!proveedor) {
            const error = new Error('Proveedor no encontrado');
            return res.status(404).json({ msg: error.message });
        }
        //? eliminando el proveedor
        await proveedor.destroy();
        res.json({ msg: 'Proveedor eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
   
}






