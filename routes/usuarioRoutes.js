import express from 'express';
import {
    registrarUsuario,
    autenticarUsuario,
    perfil,
} from '../controllers/usuarioController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/', registrarUsuario);
router.post('/login', autenticarUsuario);
router.get('/perfil', checkAuth, perfil);

export default router;
