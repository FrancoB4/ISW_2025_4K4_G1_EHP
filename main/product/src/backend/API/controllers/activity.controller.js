import { getAll, create, getById } from "../services/activity.service.js";

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

const { Op } = require("sequelize");
const { Actividad, Schedule } = require("../models");

export const getAllActivities = async (req, res) => {
    try {
        const { fecha, personas } = req.query;

        let actividades;
        const resultado = {};

        const fechaISO = fechaFormateada(fecha);

        if (fecha && personas) {
            actividades = await Actividad.findAll({
                include: {
                    model: Schedule,
                    as: "schedules",
                    where: {
                        startDate: {
                            [Op.like]: `${fechaISO}%`
                        }
                    },
                    required: true
                }
            });

            actividades.forEach(actividad => {
                const horarios = actividades.schedules;
                const horariosDisponibles = actividad.schedules.filter(schedule => schedule.placesLeft >= parseInt(personas));

                resultado[actividad.name] = {
                    cant_horarios_disponibles: horariosDisponibles.length,
                    cupo_maximo: actividad.places,
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
            actividades = await Actividad.findAll({
                include: {
                    model: Schedule,
                    as: "schedules"
                }
            });

            resultado = actividades;
        }

        res.json(resultado);
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
};

const fechaFormateada = (fechaStr) => {
    const [dd, mm, yyyy] = fechaStr.split('/');
    return `${yyyy}-${mm}-${dd}`;
};