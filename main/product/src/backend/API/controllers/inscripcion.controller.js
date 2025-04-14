import { getAll, create, bulkCreate } from '../services/inscripcion.service.js';

export const getAllInscripciones = (req, res) => {
  const inscripciones = getAll();
  res.json({message: 'Ok.', inscripciones});
  return res;
};

export const createInscripcion = (req, res) => {
  const data = req.body

  if (!data?.email || !data?.age || !data?.horarioId) {
    console.log('[Inscripciones | create] Warning: Missed required data.');
    res.status(400).json({message: 'Missed required data.', data: {}});
    return ;
  }
  
  try {
    inscripcion = create(data);
    res.status(201).json({message: 'Ok.', data: inscripcion});
  }
  catch (error) {
    console.log('[Inscripciones | create] Error:', error);
    res.status(500).json({message: 'Error', data: {}})
  }
  
};