import express from 'express';
import { listarFacturacion, guardarFacturacion, modificarFacturacion , eliminarFacturacion } from '../controllers/facturacionController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.get('/',checkAuth, listarFacturacion);
router.post('/guardar',checkAuth, guardarFacturacion);
router.put('/modificar',checkAuth, modificarFacturacion);
router.delete('/eliminar',checkAuth, eliminarFacturacion);

export default router;