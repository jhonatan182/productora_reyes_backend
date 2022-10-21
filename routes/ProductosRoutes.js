import express from 'express';
import { listarProductos, guardarProductos, modificarProductos, obtenerUnProducto } from '../controllers/ProductosController.js';


const router = express.Router();

router.get('/', listarProductos);
router.get('/:id', obtenerUnProducto);
router.post('/nuevo-producto', guardarProductos);
router.put('/editar-producto/:id', modificarProductos);



export default router;