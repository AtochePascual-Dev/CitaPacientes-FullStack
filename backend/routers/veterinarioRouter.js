// * IMPORTACIONES 
import express from 'express';
import {
  registrarUsuario,
  confirmarCuenta,
  autenticarUsuario,
  obtenerPerfil,
  olvidePassword,
  comprobarToken
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';


const router = express.Router();

// Rutas publicas
router.post('/', registrarUsuario);
router.get('/confirmar/:token', confirmarCuenta);
router.post('/login', autenticarUsuario);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token')
  .get(comprobarToken)

// Rutas privadas
router.get('/perfil', checkAuth, obtenerPerfil);


export default router;