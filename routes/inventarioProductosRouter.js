import express from 'express';
import { listarInventarioProducto } from '../controllers/inventarioProductosController.js';


const router = express.Router();

router.get('/', listarInventarioProducto);


export default router;