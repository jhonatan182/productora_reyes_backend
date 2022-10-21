import express from 'express';
import { listarProductos, guardarProductos, modificarProductos } from '../controllers/ProductosController.js';


const router = express.Router();

router.get('/', listarProductos);
router.post('/nuevo-producto', guardarProductos);
router.put('/editar-producto/:id', modificarProductos);



export default router;