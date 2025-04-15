import { getAll, create, getById } from "../services/activity.service.js";

export const getAllActivities = async (_, res) => {
    try {
        const activities = await getAll();
        res.json(activities);
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}

export const createActivity = async (req, res) => {
    const data = req.body;
    if (!data?.name || !data?.places) {
        res.status(400).json({ message: 'Missed required data.', data: {} });
    }

    try {
        const activity = await create(data);
        res.status(201).json(activity);
    } catch (error) {
        console.log('[Activity | create] Error: ', error);
        res.status(500).json({ message: 'Error', data: {} });
    }
}

export const getOne = async (req, res) => {
    try {
        const activity = await getById(req.params.id);

        if(!activity){ 
            return res.status(404).send({
            error: 'activity not found'
        })}

        res.json(activity);

    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}