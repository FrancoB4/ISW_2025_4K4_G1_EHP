import { getAll, create } from "../services/schedule.service.js";
import { getById } from "../services/activity.service.js";

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