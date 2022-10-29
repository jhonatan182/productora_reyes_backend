import express from 'express';
import { listarDetalle } from '../controllers/detalleController.js';
import { obtenerDetalle } from '../controllers/detalleController.js';
import { editarDetalle } from '../controllers/detalleController.js';
import { eliminarDetalle } from '../controllers/detalleController.js';
import checkAuth from '../middlewares/checkAuth.js';
const router = express.Router();

router.get('/', checkAuth, listarDetalle);
router.get('/:id', checkAuth, obtenerDetalle);
router.put('/editar-detalle/:id', checkAuth, editarDetalle);
router.delete('/eliminar-detalle', checkAuth, eliminarDetalle);

export default router;
