import { getAll, create } from '../services/registration.service.js';
import { bulkCreate, checkClothing } from '../services/registration_detail.service.js';
import { getByIdSchedule } from '../services/schedule.service.js';
import { getById } from '../services/activity.service.js';
import { sendRegistrationConfirmationEmail } from '../services/email.service.js';
import { parseDataForRegistrationEmail } from '../helper/data_parser.js';

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
    res.status(400).json({ message: 'Missed required data.', data: {} });
    return;
  }

  try {
    const selectedSchedule = await getByIdSchedule(data.schedule_id);
    const selectedActivity = await getById(selectedSchedule.activity_id);
    const clothingReq = selectedActivity.clothingRequired;

    if (clothingReq) {
      try {
        checkClothing(data.visitors);
      } catch (error) {
        console.log('[Registrations | create] Error:', error);
        return res.status(400).json({ message: error.message, data: {} })
      }
    };

    const registration = await create({
      email: data.email,
      schedule_id: data.schedule_id
    });

    const reg_id = registration.id;

    const reg_detail = await bulkCreate(reg_id, data.visitors);

    try {
      const parsedRegistrations = parseDataForRegistrationEmail(reg_detail);
      const emailRes = await sendRegistrationConfirmationEmail(data.email, reg_id, selectedActivity.name, selectedSchedule.startDate, parsedRegistrations);
      if (emailRes.status_code == 200) {
        console.log('[Registration | email] Success!')
      }
      else {
        console.log('[Registration | email] Failed!', emailRes.status_code ? emailRes.status_code : emailRes)
      }
    }
    catch (error) {
      console.error('[Registration | Email] Error during email process:', error)
    }

    res.status(201).json({
      email: registration.email,
      schedule_id: registration.schedule_id,
      visitors: reg_detail
    });
  }
  catch (error) {
    console.log('[Registrations | create] Error:', error);
    res.status(500).json({ message: error.message, data: {} })
  }
};