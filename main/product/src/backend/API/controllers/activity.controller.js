import { getAll, create, getById } from "../services/activity.service.js";
import { Op } from "sequelize";
import { Activity } from "../models/activity.js";
import { Schedule } from "../models/schedule.js";
import moment from 'moment';

export const createActivity = async (req, res) => {
    const data = req.body;
    if (!data?.name || !data?.places || data?.clothingRequired === null) {
        return res.status(400).json({ message: 'Missed required data.', data: {} });
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

export const getAllActivities = async (req, res) => {
    try {
        const { fecha, personas } = req.query; //fecha debe ingresar en formato dd/mm/aaaa

        let result = [];

        if (fecha && personas) {
            const fechaISO = formatedDate(fecha);
            const startOfDay = moment(fechaISO).startOf('day').toISOString();
            const endOfDay = moment(fechaISO).endOf('day').toISOString();

            const activities = await Activity.findAll({
                include: {
                    model: Schedule,
                    attributes: ['id', 'startDate', 'endDate', 'placesLeft'],
                    where: {
                        startDate: {
                            [Op.between]: [startOfDay, endOfDay]
                        }
                    },
                    required: false
                }
            });

            activities.forEach(act => {

                const horarios = act.Schedules;
                const horariosDisponibles = act.Schedules.filter(schedule => schedule.placesLeft >= parseInt(personas));

                result.push(
                    {
                        id: act.name.toLowerCase(),
                        name: act.name,
                        description: act.description,
                        available: horariosDisponibles.length,
                        capacity: act.places,
                        schedules: horarios.map(horario => {
                            const time = new Date(horario.startDate).toISOString().slice(11, 16); // HH:mm
                            return {
                                id: horario.id,
                                time,
                                isAvailable: horario.placesLeft >= personas,
                                placesLeft: horario.placesLeft
                            };
                        })
                    }
                );
            });
        }else{
            result = await Activity.findAll({
                include: {
                    model: Schedule
                }
            });
        }

        res.json(result);
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
};

const formatedDate = (fechaStr) => {
    const [dd, mm, yyyy] = fechaStr.split('/');
    return `${yyyy}-${mm}-${dd}`;
};