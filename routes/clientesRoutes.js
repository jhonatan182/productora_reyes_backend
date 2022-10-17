import express from 'express';
import {
    listarClientes,
    obtenerCliente,
    nuevoCliente,
    editarCliente,
    eliminarCliente,
} from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', listarClientes);
router.get('/:id', obtenerCliente);
router.post('/nuevo-cliente', nuevoCliente);
router.put('/editar-cliente/:id', editarCliente);
router.delete('/eliminar-cliente/:id', eliminarCliente);

export default router;
