//* IMPORTACIONES
import mongoose from 'mongoose';

//* Conecta con la BD
const conectarDB = async () => {
  try {
    const db = await mongoose.connect(`mongodb+srv://root:root@cluster0.gh1yphz.mongodb.net/?retryWrites=true&w=majority`, {
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