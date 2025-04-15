import { getAll } from "../services/registration_detail.service.js";

export const getAllRegDetails = async (_, res) => {
  const reg_details = await getAll();
  res.json(reg_details);
  return res;
};