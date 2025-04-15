import { RegistrationDetail } from "../models/registration_detail.js";

export const bulkCreate = async(reg_id, visitors) => {
    let created = [];

    for (let i = 0; i < visitors.length; i++) {
        try {
            const visitor = visitors[i];
            const detail = await create(reg_id, visitor);
            created.push(detail);
        } catch (error) {
            console.log('[RegistrationDetail | create] Error:', error);
        }
    }

    return created;
}

export const getAll = async () => {
  try {
    const reg_detail = await RegistrationDetail.findAll();
    return reg_detail;
  }
  catch (error) {
    console.log('[RegistrationDetail | getAll] Error:', error);
    return {};
  }
}

export const create = async (reg_id, data) => {
  try {
    const reg_detail = await RegistrationDetail.create({
        visitorName: data.visitorName,
        dni: data.dni,
        birthdate: data.birthdate,
        clothingSize: data.clothingSize,
        registration_id: reg_id
    });
    
    return reg_detail
  }
  catch (error) {
    console.log('[Registrations | create] Error:', error);
  }
}