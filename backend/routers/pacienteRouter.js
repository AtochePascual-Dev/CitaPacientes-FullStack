// * IMPORTACIONES
import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import {
  registrarPaciente,
  obtenerPacientes,
  obtenerPaciente
} from '../controllers/pacienteController.js';

const router = express.Router();

router.route('/')
  .post(checkAuth, registrarPaciente)
  .get(checkAuth, obtenerPacientes)

router.route('/:id')
  .get(checkAuth, obtenerPaciente);

export default router;