import empleadoModel from '../models/empleadoModel.js';
import UsuarioModel from '../models/Usuario.js';

import { body, validationResult } from 'express-validator';
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
            return res.status(200).json(empleados);
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
        const empleado= new empleadoModel(req.body);
        
        
        const{ id_empleado} =await empleado.save();
        console.log({id_empleado,password:req.body.password, usuario:req.body.usuario})
     
        const usuario = new  UsuarioModel({
            empleado_id:id_empleado,
            usuario:req.body.usuario,
            password:req.body.password
           
        });
        await usuario.save();
        res.status(200).json({ msg: 'Empleado creado correctamente' });
      
    } catch (error) {
       // console.log(error);
        res.status(500).send('Hubo un error ' +error.message);
    }
};
//actualizar por id
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

    const { id } = req.params;
    try {
        //? revisar el ID
        let empleado = await empleadoModel.findByPk(id);
        //? si el empleado existe o no
        if (!empleado) {
            return res.status(404).json({ msg: 'Empleado no encontrado' });
        }
        //? actualizar
        await empleado.update(req.body);
        res.status(200).json({ msg: 'Empleado actualizado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

//eliminar por id       

export const eliminarEmpleado = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permiso');
        return res.status(404).json({ msg: error.message });
    }
    const { id } = req.params;
    try {
        //? revisar el ID
        let empleado = await empleadoModel.findByPk(id);
        //? si el empleado existe o no

        if (!empleado) {
            return res.status(404).json({ msg: 'Empleado no encontrado' });
        }
        //? eliminar el empleado
        await empleado.destroy();
        res.status(200).json({ msg: 'Empleado eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
//obtener empleado por id
export const obtenerEmpleado = async (req, res) => {
    if (req.usuario.descripcion_rol !== 'admin') {
        const error = new Error('No tiene permiso');
        return res.status(404).json({ msg: error.message });
    }
    try {
        //? revisar el ID
        let empleado = await empleadoModel.findByPk(req.params.id);
        //? si el empleado existe o no
        if (!empleado) {
            return res.status(404).json({ msg: 'Empleado no encontrado' });
        }
        res.status(200).json(empleado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

