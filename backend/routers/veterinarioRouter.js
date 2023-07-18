// * IMPORTACIONES 
import express from 'express';
import {
  registrarUsuario,
  confirmarCuenta,
  autenticarUsuario
} from '../controllers/veterinarioController.js';


const router = express.Router();

// Rutas publicas
router.post('/', registrarUsuario);
router.get('/:token', confirmarCuenta);
router.post('/login', autenticarUsuario);

export default router;