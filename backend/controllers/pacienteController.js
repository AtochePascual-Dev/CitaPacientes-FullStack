// * IMPORTACIONES
import Paciente from "../models/Paciente.js";

const registrarPaciente = async (req, res) => {
  const { veterinario } = req;
  const paciente = new Paciente(req.body);
  paciente.veterinario = veterinario._id;

  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);

  } catch (error) {
    console.log(error.message);
  }
};


const obtenerPacientes = async (req, res) => {
  const { veterinario } = req;

  try {
    const pacientes = await Paciente.find().where('veterinario').equals(veterinario);

    res.json(pacientes);
  } catch (error) {
    console.log(error);
  }
};


const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const { veterinario } = req;

  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: 'No Encontrado' });
  }

  if (paciente.veterinario.toString() !== veterinario._id.toString()) {
    return res.json({ msg: 'Accion no valida' });
  };

  res.json(paciente);
};


const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const { veterinario } = req;

  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: 'No Encontrado' });
  }

  if (paciente.veterinario.toString() !== veterinario._id.toString()) {
    return res.json({ msg: 'Accion no valida' });
  };

  // Actualizar datos
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActulizado = await paciente.save();

    res.json(pacienteActulizado);
  } catch (error) {
    console.log(error);
  }
};

export {
  registrarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente
}