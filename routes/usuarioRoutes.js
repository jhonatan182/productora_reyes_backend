import express from 'express';
import {
    registrarUsuario,
    autenticarUsuario,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/', registrarUsuario);
router.post('/login', autenticarUsuario);

export default router;
