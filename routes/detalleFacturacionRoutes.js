import express from 'express';
import { listarDetalleFacturacion } from '../controllers/detallefacturacionController.js';
import { guardarDetalleFacturacion } from '../controllers/detallefacturacionController.js';
import { modificarDetalleFacturacion } from '../controllers/detallefacturacionController.js';
import { eliminarDetalleFacturacion } from '../controllers/detallefacturacionController.js';

const router = express.Router();

router.get('/', listarDetalleFacturacion);
router.post('/guardar', guardarDetalleFacturacion);
router.put('/modificar', modificarDetalleFacturacion);
router.delete('/eliminar', eliminarDetalleFacturacion);

export default router;