import express from 'express';
import { listarDetalleFacturacion, guardarDetalleFacturacion, modificarDetalleFacturacion, eliminarDetalleFacturacion } from '../controllers/detallefacturacionController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.get('/', checkAuth, listarDetalleFacturacion);
router.post('/guardar',checkAuth,  guardarDetalleFacturacion);
router.put('/modificar',checkAuth,  modificarDetalleFacturacion);
router.delete('/eliminar',checkAuth,  eliminarDetalleFacturacion);

export default router;