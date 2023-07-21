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


export {
  registrarPaciente,
  obtenerPacientes
}