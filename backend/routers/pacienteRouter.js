// * IMPORTACIONES
import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import {
  registrarPaciente,
  obtenerPacientes
} from '../controllers/pacienteController.js';

const router = express.Router();

router.route('/')
  .post(checkAuth, registrarPaciente)
  .get(checkAuth, obtenerPacientes)

export default router;