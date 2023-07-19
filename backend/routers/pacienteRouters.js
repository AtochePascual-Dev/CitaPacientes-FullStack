// * IMPORTACIONES
import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { registrarPaciente } from '../controllers/pacienteController.js';

const router = express.Router();

router.route('/')
  .post(checkAuth, registrarPaciente)

export default router;