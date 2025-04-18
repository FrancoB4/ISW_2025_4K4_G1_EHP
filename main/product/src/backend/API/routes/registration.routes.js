import express from 'express';
import { getAllRegistrations, createRegistrations } from '../controllers/registration.controller.js';
import { getAllRegDetails } from '../controllers/registration_detail.controller.js';

const registrationRouter = express.Router();

registrationRouter.get('/', getAllRegistrations);
registrationRouter.post('/', createRegistrations);
// { request body
//     "id_horario": 3,
//     "email": "test@gmail.com",
//     "visitors": [
//         {
//             "nombre_completo": "pablo",
//             "dni": "22222222",
//             "fecha_nacimiento": "00/00/000",
//             "talle_ropa": "XL" //Puede ser nulo
//         }, {...}
//     ]
// }

registrationRouter.get('/details', getAllRegDetails);

export default registrationRouter