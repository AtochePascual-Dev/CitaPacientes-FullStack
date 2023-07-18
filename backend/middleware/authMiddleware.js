// * IMPORTACIONES 
import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';


const checkAuth = async (req, res, next) => {
  let jwtoken = req.headers.authorization;

  // Validar el jwbtoken
  if (!jwtoken) {
    const error = new Error('Token inexistente');
    return res.status(403).json({ msg: error.message });
  };

  // Validar que el jwbtoken contenga Bearer
  if (!jwtoken.startsWith('Bearer')) {
    const error = new Error('No contiene Bearer');
    return res.status(403).json({ msg: error.message });
  };

  // Limpiar el token del Bearer
  jwtoken = jwtoken.split(' ')[1];

  try {
    const decoded = jwt.verify(jwtoken, process.env.JWT_SECRET);
    req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -web");

    next();
  } catch (error) {
    const e = new Error('jwToken no valido');
    return res.status(403).json({ msg: e.message });
  }
};

export default checkAuth;