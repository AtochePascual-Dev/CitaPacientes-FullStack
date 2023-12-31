// * IMPORTACIONES 
import generarJWT from "../helpers/generarJWT.js";
import generarToken from "../helpers/generarToken.js";
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


const autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;

  // validar si el usuario existe
  const usuario = await Veterinario.findOne({ email });
  if (!usuario) {
    const error = new Error('El Usuario no existe');
    return res.status(404).json({ msg: error.message });
  };

  // Validar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error('Usuario no confirmado');
    return res.status(404).json({ msg: error.message });
  };

  // Comparar password
  if (! await usuario.comprobarPassword(password)) {
    const error = new Error('Password incorrecto');
    return res.status(404).json({ msg: error.message });
  };

  // Generar JsonWebToken
  res.json({ jwt: generarJWT(usuario.id) });
};


const obtenerPerfil = (req, res) => {
  const { veterinario: perfil } = req;

  res.json(perfil);
};


const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const usuario = await Veterinario.findOne({ email });

  if (!usuario) {
    const error = new Error('El Usuario no existe');
    return res.status(400).json({ msg: error.message });
  };

  try {
    usuario.token = generarToken();
    await usuario.save();

    res.json({ msg: 'Hemos enviado un Email con las instrucciones' });
  } catch (error) {
    console.log(error);
  }
};


const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const usuario = await Veterinario.findOne({ token });

  if (!usuario) {
    const error = new Error('Token no valido');
    return res.status(400).json({ msg: error.message });
  };

  res.json({ msg: "Token valido" });
};


const resetearPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Veterinario.findOne({ token });

  if (!usuario) {
    const error = new Error('Hubo un error');
    return res.status(400).json({ msg: error.message });
  };

  try {
    usuario.token = null;
    usuario.password = password;
    await usuario.save();

    res.json({ msg: 'Password modificado correctamente' });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrarUsuario,
  confirmarCuenta,
  autenticarUsuario,
  obtenerPerfil,
  olvidePassword,
  comprobarToken,
  resetearPassword
}