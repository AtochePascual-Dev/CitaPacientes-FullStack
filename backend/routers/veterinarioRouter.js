// * IMPORTACIONES 
import express from 'express';
import { registrarUsuario } from '../controllers/veterinarioController.js';


const router = express.Router();

router.post('/', registrarUsuario);

export default router;