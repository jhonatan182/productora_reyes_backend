import express from 'express';
import {
    listarClientes,
    obtenerCliente,
    nuevoCliente,
    editarCliente,
    eliminarCliente,
} from '../controllers/clienteController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.get('/', checkAuth, listarClientes);
router.get('/:id', checkAuth, obtenerCliente);
router.post('/nuevo-cliente', checkAuth, nuevoCliente);
router.put('/editar-cliente/:id', checkAuth, editarCliente);
router.delete('/eliminar-cliente/:id', checkAuth, eliminarCliente);

export default router;
