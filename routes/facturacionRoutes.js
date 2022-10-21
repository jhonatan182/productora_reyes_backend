import express from 'express';
import { listarFacturacion } from '../controllers/facturacionController.js';
import { guardarFacturacion } from '../controllers/facturacionController.js';
import { modificarFacturacion } from '../controllers/facturacionController.js';
import { eliminarFacturacion } from '../controllers/facturacionController.js';

const router = express.Router();

router.get('/', listarFacturacion);
router.post('/guardar', guardarFacturacion);
router.put('/modificar', modificarFacturacion);
router.delete('/eliminar', eliminarFacturacion);

export default router;