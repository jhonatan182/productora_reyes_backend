import express from 'express';
import { listarInventarioProducto, guardarInventarioProducto, modificarInventarioProducto } from '../controllers/inventarioProductosController.js';


const router = express.Router();

router.get('/', listarInventarioProducto);
router.post('/nuevo-producto', guardarInventarioProducto);
router.put('/editar-producto/:id', modificarInventarioProducto);



export default router;