import { getAll, create, getById } from "../services/activity.service.js";
import Op from "sequelize";
import { Activity } from "../models/activity.js";
import { Schedule } from "../models/schedule.js";

// export const getAllActivities = async (_, res) => {
//     try {
//         const activities = await getAll();
//         res.json(activities);
//     } catch (error) {
//         res.status(500).send({
//             error: error.message
//         })
//     }
// }

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
        const { fecha, personas } = req.query;

        let activities;
        let result = {};

        if (fecha && personas) {
            const fechaISO = formatedDate(fecha);

            activities = await Activity.findAll({
                include: {
                    model: Schedule,
                    as: "schedule",
                    attributes: ['id', 'startDate', 'endDate', 'placesLeft'],
                    where: {
                        startDate: {
                            [Op.like]: `2025-04-18T09:00:00.000Z`
                        }
                    },
                    required: false
                }
            });

            activities.forEach(act => {
                console.log(act)
                const horarios = act.schedules;
                console.log(horarios);
                const horariosDisponibles = act.schedules.filter(schedule => schedule.placesLeft >= parseInt(personas));
                //console.log(horariosDisponibles);

                result[act.name] = {
                    cant_horarios_disponibles: horariosDisponibles.length,
                    cupo_maximo: act.places,
                    horarios: horarios.map(horario => {
                        const hora = new Date(horario.startDate).toISOString().slice(11, 16); // HH:mm
                        return {
                            id: horario.id,
                            hora,
                            disponible: horario.placesLeft >= personas,
                            cupos_restantes: horario.placesLeft
                        };
                    })
                };
            });
        }else{
            activities = await Activity.findAll({
                include: {
                    model: Schedule,
                    as: "schedule"
                }
            });

            result = activities;
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