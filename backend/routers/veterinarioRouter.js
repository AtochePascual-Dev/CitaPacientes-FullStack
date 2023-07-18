// * IMPORTACIONES 
import express from 'express';
import {
  registrarUsuario,
  confirmarCuenta,
  autenticarUsuario,
  obtenerPerfil
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';


const router = express.Router();

// Rutas publicas
router.post('/', registrarUsuario);
router.get('/confirmar/:token', confirmarCuenta);
router.post('/login', autenticarUsuario);

// Rutas privadas
router.get('/perfil', checkAuth, obtenerPerfil);
export default router;