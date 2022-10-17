import express from 'express';
import { listarInventarioProducto } from '../controllers/inventarioProductosController';


const router = express.Router();

router.get('/', listarInventarioProducto);


export default router;