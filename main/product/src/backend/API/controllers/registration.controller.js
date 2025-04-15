import { getAll, create } from '../services/registration.service.js';
import { bulkCreate } from '../services/registration_detail.service.js';

//formato req.body json
// {
//     mail: "",
//     schedule_id: int,
//     visitors: [
//         {visitorName: "",
//          dni: int,
//          birthdate: dateOnly,
//          clothingSize: ""
//         },
//         {},
//         ...
//     ]
// }

export const getAllRegistrations = async (_, res) => {
  const registrations = await getAll();
  res.json(registrations);
  return res;
};

export const createRegistrations = async (req, res) => {
  const data = req.body

  if (!data?.email || !data?.schedule_id || !data?.visitors) {
    console.log('[Registrations | create] Warning: Missed required data.');
    res.status(400).json({message: 'Missed required data.', data: {}});
    return ;
  }
  
  try {
    const registration = await create({
        email: data.email,
        schedule_id: data.schedule_id
    });
    const reg_id = registration.id;
    const reg_detail = await bulkCreate(reg_id, data.visitors);

    res.status(201).json({
        email: registration.email,
        schedule_id: registration.schedule_id,
        visitors: reg_detail
    });
  }
  catch (error) {
    console.log('[Registrations | create] Error:', error);
    res.status(500).json({message: 'Error', data: {}})
  }
  
};