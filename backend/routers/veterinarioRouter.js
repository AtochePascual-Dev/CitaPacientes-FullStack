// * IMPORTACIONES 
import express from 'express';
import {
  registrarUsuario,
  confirmarCuenta
} from '../controllers/veterinarioController.js';


const router = express.Router();

router.post('/', registrarUsuario);
router.get('/:token', confirmarCuenta);

export default router;