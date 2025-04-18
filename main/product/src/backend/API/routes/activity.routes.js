import express from 'express';
import { createActivity, getAllActivities, getOne } from '../controllers/activity.controller.js';

const activityRouter = express.Router();

activityRouter.get('/', getAllActivities);
// { response body
//     "Tirolesa":{
//         "cant_horarios_disponibles": 4, //Si es cero, el front muestra que no hay horarios para esa actividad
//         "cupo_maximo": 15,
//         "horarios":[
//             {
//                 "id": 3,
//                 "hora": "09:00",
//                 "disponible": true,
//                 "cupos_restantes": 3
//             },{...}
//         ]
//     },
//     "Safari":{...},
//     "Palestra":{...},
//     "Jardineria":{...}
// }

activityRouter.post('/', createActivity);
activityRouter.get('/:id', getOne);

export default activityRouter;