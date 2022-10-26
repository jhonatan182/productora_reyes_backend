import express from 'express';
import { listarCompra } from '../controllers/compraController.js';
import { obtenerCompra} from '../controllers/compraController.js';
import { agregarCompra } from '../controllers/compraController.js';
import { editarCompra } from '../controllers/compraController.js';
import { eliminarCompra } from '../controllers/compraController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.get('/',checkAuth, listarCompra);
router.get('/:id',checkAuth, obtenerCompra);
router.post('/nueva-compra',checkAuth, agregarCompra);
router.put('/editar-compra/:id',checkAuth, editarCompra);
router.delete('/eliminar-compra',checkAuth, eliminarCompra);




export default router;