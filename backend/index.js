// * IMPORTACIONES
import express from 'express';
import dotenv from 'dotenv/config';
import conectarDB from './config/db.js';

// Creamos una instancia de express
const app = express();

// Conectamos con la BD
conectarDB()

// Configuramos el puerto del servidor
const PORT = process.env.PORT || 4000;

app.use('/', (req, res) => {
  res.send('Hola mundo')
});

// Levantamos el servidor
app.listen(PORT, (req, res) => {
  console.log(`Servidor corriendo en el puerto `, PORT);
});