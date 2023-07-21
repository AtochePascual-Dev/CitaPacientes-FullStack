// * IMPORTACIONES
import express from 'express';
import dotenv from 'dotenv/config';
import conectarDB from './config/db.js';
import veterinarioRouter from './routers/veterinarioRouter.js';
import pacienteRouter from './routers/pacienteRouter.js';

const app = express();

conectarDB();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/veterinarios', veterinarioRouter);
app.use('/api/pacientes', pacienteRouter);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});