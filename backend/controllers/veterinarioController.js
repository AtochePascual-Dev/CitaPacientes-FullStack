// * IMPORTACIONES 
import Veterinario from "../models/Veterinario.js";

const registrarUsuario = async (req, res) => {
  const { email } = req.body;

  const usuario = await Veterinario.findOne({ email });

  // Prevenir usuario duplicado
  if (usuario) {
    const error = new Error('Este usuario ya ha sido registrado');
    return res.status(400).json({ msg: error.message });
  };

  try {
    const usuario = new Veterinario(req.body);
    const usuarioAlmacenado = await usuario.save();

    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};


const confirmarCuenta = async (req, res) => {
  const { token } = req.params;

  const usuario = await Veterinario.findOne({ token });

  if (!usuario) {
    const error = new Error('Token no valido');
    return res.status(403).json({ msg: error.message });
  };

  try {
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrarUsuario,
  confirmarCuenta
}