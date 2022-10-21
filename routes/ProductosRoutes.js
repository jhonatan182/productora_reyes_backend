import express from 'express';
import { listarProductos, guardarProductos, modificarProductos, obtenerUnProducto, eliminarProducto } from '../controllers/ProductosController.js';


const router = express.Router();

router.get('/', listarProductos);
router.get('/:id', obtenerUnProducto);
router.post('/nuevo-producto', guardarProductos);
router.put('/editar-producto/:id', modificarProductos);
router.delete('/eliminar-producto/:id', eliminarProducto);




export default router;