// * IMPORTACIONES
import express from 'express';

// Creamos una instancia de express
const app = express();

// Configuramos el puerto del servidor
const PORT = process.env.PORT || 4000;

app.use('/', (req, res) => {
  res.send('Hola mundo')
});

// Levantamos el servidor
app.listen(PORT, (req, res) => {
  console.log(`Servidor corriendo en el puerto `, PORT);
});