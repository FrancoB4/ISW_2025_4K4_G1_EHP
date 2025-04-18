import { getAll, create } from "../services/schedule.service.js";
import { getById } from "../services/activity.service.js";
import { Schedule } from "../models/schedule.js";
import { Op } from "sequelize";

export const getAllSchedule = async (_, res) => {
    const schedule = await getAll();
    res.json(schedule);
    return res;
}

export const createSchedule = async (req, res) => {
    const data = req.body;
    if (!data?.startDate || !data?.endDate || !data?.placesLeft || !data?.activity_id) {
        res.status(400).json({ message: 'Missed required data.', data: {} });
        return res;
    }

    try {        
        const activity = await getById(data.activity_id);
        
        if(!activity){ 
            return res.status(404).send({
            error: 'activity not found'
        })}

        const schedule = await create(data);
        res.status(201).json(schedule);
    } catch (error) {
        console.log('[Schedule | create] Error: ', error);
        res.status(500).json({ message: 'Error', data: {} });
    }
    return res;
}


export const asd = async (req, res) =>{
    const schedules = await Schedule.findAll({
        where: {
          startDate: {
            [Op.like]: `2025-04-18T09:00:00.000Z`
          }
        }
      });
    console.log(schedules)
}