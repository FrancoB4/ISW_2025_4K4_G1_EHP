// import { getAll, create, bulkCreate } from '../services/inscripcion.service.js';

// export const getAllInscripciones = async (_, res) => {
//   const inscripciones = await getAll();
//   res.json({message: 'Ok.', inscripciones});
//   return res;
// };

// export const createInscripcion = async (req, res) => {
//   const data = req.body

//   if (!data?.email || !data?.age || !data?.horarioId) {
//     console.log('[Inscripciones | create] Warning: Missed required data.');
//     res.status(400).json({message: 'Missed required data.', data: {}});
//     return ;
//   }
  
//   try {
//     const inscripcion = await create(data);
//     res.status(201).json({message: 'Ok.', data: inscripcion});
//   }
//   catch (error) {
//     console.log('[Inscripciones | create] Error:', error);
//     res.status(500).json({message: 'Error', data: {}})
//   }
  
// };