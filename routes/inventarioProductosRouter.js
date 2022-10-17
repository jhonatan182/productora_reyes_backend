import express from 'express';
import { listarInventarioProducto, guardarInventarioProducto } from '../controllers/inventarioProductosController.js';


const router = express.Router();

router.get('/', listarInventarioProducto);
router.post('/nuevo-producto', guardarInventarioProducto);



export default router;