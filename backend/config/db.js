//* IMPORTACIONES
import mongoose from 'mongoose';

//* Conecta con la BD
const conectarDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${db.connection.host}:${db.connection.port}`;

    console.log(`MongoDB conectdo en: ${url}`);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};


export default conectarDB;