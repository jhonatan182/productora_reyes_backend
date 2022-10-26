import express from 'express';
import { listarMateria } from '../controllers/materiaController.js';
import { obtenerMateria} from '../controllers/materiaController.js';
import { agregarMateria } from '../controllers/materiaController.js';
import { editarMateria } from '../controllers/materiaController.js';
import { eliminarMateria } from '../controllers/materiaController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.get('/', checkAuth, listarMateria);
router.get('/:id',checkAuth, obtenerMateria);
router.post('/nueva-materia',checkAuth, agregarMateria);
router.put('/editar-materia/:id',checkAuth, editarMateria);
router.delete('/eliminar-materia',checkAuth,eliminarMateria);




export default router;




