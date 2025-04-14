import { getAll, create } from "../services/horario.service.js";

export const getAllHorarios = async (_, res) => {
    const horarios = await getAll();
    res.json({message: 'Ok', data: { horarios }});
    return res;
}

export const createHorario = async (req, res) => {
    const data = req.body;
    if (!data?.startDate || !data?.endDate || !data?.actividadId) {
        res.status(400).json({ message: 'Missed required data.', data: {} });
        return res;
    }

    try {
        const horario = await create(data);
        res.status(201).json({ message: 'Ok', data: horario });
    } catch (error) {
        console.log('[Horario | create] Error: ', error);
        res.status(500).json({ message: 'Error', data: {} });
    }
    return res;
}