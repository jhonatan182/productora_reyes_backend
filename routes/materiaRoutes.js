import express from 'express';
import { listarMateria } from '../controllers/materiaController.js';
import { obtenerMateria} from '../controllers/materiaController.js';
import { agregarMateria } from '../controllers/materiaController.js';
import { editarMateria } from '../controllers/materiaController.js';
import { eliminarMateria } from '../controllers/materiaController.js';

const router = express.Router();

router.get('/', listarMateria);
router.get('/:id', obtenerMateria);
router.post('/nueva-materia', agregarMateria);
router.put('/editar-materia/:id', editarMateria);
router.delete('/eliminar-materia', eliminarMateria);




export default router;




