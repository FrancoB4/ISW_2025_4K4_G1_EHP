// import { getAll, create } from "../services/actividad.service.js";

// export const getAllActividades = async (_, res) => {
//     const actividades = await getAll();
//     res.json({message: 'Ok', data: {actividades}});
//     return res;
// }

// export const createActividad = async (req, res) => {
//     const data = req.body;
//     if (!data?.name || !data?.places) {
//         res.status(400).json({ message: 'Missed required data.', data: {} });
//         return res;
//     }

//     try {
//         const actividad = await create(data);
//         res.status(201).json({ message: 'Ok', data: actividad });
//     } catch (error) {
//         console.log('[Actividad | create] Error: ', error);
//         res.status(500).json({ message: 'Error', data: {} });
//     }
//     return res;
// }