import { Registration } from "../models/registration.js";

export const getAll = async () => {
  try {
    const registrations = await Registration.findAll();
    return registrations;
  }
  catch (error) {
    console.log('[Registrations | getAll] Error:', error);
    return {};
  }
}

export const create = async (data) => {
  try {
    const registration = await Registration.create(data);
    return registration
  }
  catch (error) {
    console.log('[Registrations | create] Error:', error);
  }
}