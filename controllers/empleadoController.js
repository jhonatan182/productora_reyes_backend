import empleadoModel from '../models/empleadoModel.js';
import { validationResult } from 'express-validator';
import {query} from 'express-validator';

export const listarEmpleados = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permiso');
        return res.status(404).json({ msg: error.message });
    }
    try {
        const empleados = await empleadoModel.findAll();
        if (empleados.length == 0) {
            return res.status(404).json({ msg: 'No hay empleados' });
        }
        else {
        return res.status(200).json({msg: 'Lista de empleados', empleados});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
export const crearEmpleados = async (req, res) => {
  
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permiso');
        return res.status(404).json({ msg: error.message });
    }
      //? revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
   
    try {
        //? crear nuevo empleado
        const empleado = new empleadoModel(req.body);
        await empleado.save();
        res.status(200).json({ msg: 'Empleado creado correctamente',empleado });
      
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

export const actualizarEmpleado = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permiso');
        return res.status(404).json({ msg: error.message });
    }
    //? revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    //? extraer la informacion del empleado
    const { nombre_empleado, apellido_empleado,identidad_empleado, telefono_empleado, direccion_empleado, correo_empleado,rol_id ,} = req.body;
    const nuevoEmpleado = {};
    if (nombre_empleado) {
        nuevoEmpleado.nombre_empleado = nombre_empleado;
    }
    if (apellido_empleado) {
        nuevoEmpleado.apellido_empleado = apellido_empleado;
    }
    if (identidad_empleado) {
        nuevoEmpleado.identidad_empleado = identidad_empleado;
    }
    if (telefono_empleado) {
        nuevoEmpleado.telefono_empleado = telefono_empleado;
    }
    if (direccion_empleado) {
        nuevoEmpleado.direccion_empleado = direccion_empleado;
    }
    if (correo_empleado) {
        nuevoEmpleado.correo_empleado = correo_empleado;
    }
    if (rol_id) {
        nuevoEmpleado.rol_id = rol_id;
        
    }   
    try {
        //? revisar el ID
        let empleado = await empleadoModel.findByPk(req.query.id_empleado);
        //? si el empleado existe o no
        if (!empleado) {
            return res.status(404).json({ msg: 'Empleado no encontrado' });
        }
        //? actualizar
        empleado = await empleadoModel.update({ ...nuevoEmpleado }, { where: { id_empleado: req.query.id_empleado} });
        res.status(200).json({ msg: 'Empleado actualizado correctamente',nuevoEmpleado });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

export const eliminarEmpleado = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permiso');
        return res.status(404).json({ msg: error.message });
    }
    try {
        //? revisar el ID
        let empleado = await empleadoModel.findByPk(req.query.id_empleado);
        //? si el empleado existe o no
        if (!empleado) {
            return res.status(404).json({ msg: 'Empleado no encontrado' });
        }
        //? Eliminar el empleado
        await empleadoModel.destroy({ where: { id_empleado: req.query.id_empleado } });
        res.status(200).json({ msg: 'Empleado eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



