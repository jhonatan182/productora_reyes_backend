import express from 'express';
import { listarDetalle } from '../controllers/detalleController.js';
import { obtenerDetalle} from '../controllers/detalleController.js';
import { agregarDetalle } from '../controllers/detalleController.js';
import { editarDetalle } from '../controllers/detalleController.js';
import { eliminarDetalle } from '../controllers/detalleController.js';

const router = express.Router();

router.get('/', listarDetalle);
router.get('/:id', obtenerDetalle);
router.post('/nueva-detalle', agregarDetalle);
router.put('/editar-detalle/:id', editarDetalle);
router.delete('/eliminar-detalle', eliminarDetalle);




export default router;