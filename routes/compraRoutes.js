import express from 'express';
import { listarCompra } from '../controllers/compraController.js';
import { obtenerCompra} from '../controllers/compraController.js';
import { agregarCompra } from '../controllers/compraController.js';
import { editarCompra } from '../controllers/compraController.js';
import { eliminarCompra } from '../controllers/compraController.js';

const router = express.Router();

router.get('/', listarCompra);
router.get('/:id', obtenerCompra);
router.post('/nueva-compra', agregarCompra);
router.put('/editar-compra/:id', editarCompra);
router.delete('/eliminar-compra', eliminarCompra);




export default router;