import express from 'express';
import {
    listarProductos,
    guardarProductos,
    modificarProductos,
    obtenerUnProducto,
    eliminarProducto,
} from '../controllers/ProductosController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.get('/', checkAuth, listarProductos);
router.get('/:id', checkAuth, obtenerUnProducto);
router.post('/nuevo-producto', checkAuth, guardarProductos);
router.put('/editar-producto/:id', checkAuth, modificarProductos);
router.delete('/eliminar-producto/:id', checkAuth, eliminarProducto);

export default router;
