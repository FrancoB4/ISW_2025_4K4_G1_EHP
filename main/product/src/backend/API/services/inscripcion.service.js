import db from '../models/index.js';

const { Inscripcion } = db;

export const getAll = async () => {
  try {
    const inscripciones = Inscripcion.findAll();
    return inscripciones;
  }
  catch (error) {
    console.log('[Inscripciones | getAll] Error:', error);
    return ;
  }
}

export const create = async (data) => {
  if (!data?.email || !data?.age || !data?.horarioId) {
    console.log('[Inscripciones | create] Warning: Missed required data.')
    return ;
  }
  
  try {
    const inscripcion = await Inscripcion.create(data);
    return inscripcion
  }
  catch (error) {
    console.log('[Inscripciones | create] Error:', error);
  }
}

export const bulkCreate = async (data) => {
  if (data.length == 0) { return ; }
  try {
    let created = [];
    data.forEach(async (inscripcionData) => {
      if (data?.email && data?.age && data?.horarioId) {
        try {
          const inscripcion = await Inscripcion.create(data);
          created.push(inscripcion);
        }
        catch (error) {
          console.log('[Inscripciones | create] Error:', error);
        }
      }
    });
    return created;
  }
  catch (error) {
    console.log('[Inscripciones | bulkCreate] Error:', error);
  }
} 