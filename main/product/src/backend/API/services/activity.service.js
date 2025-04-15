import { Activity } from "../models/activity.js";
import { Schedule } from "../models/schedule.js";

export const getAll = async () => {
    try {
        const activities = await Activity.findAll();
        return activities;
    }
    catch (error) {
        console.log('[Activities | getAll] Error:', error);
        return {};
    }
}

export const create = async (data) => {
    try {
        const activites = await Activity.create(data);
        return activites;
    }
    catch (error) {
        console.log('[Activites | create] Error: ', error);
        return {};
    }
}

export const getById = async (id) => {
    try {
        const activity = await Activity.findByPk(id, {
            include:{
                model: Schedule,
                attributes: ['id', 'startDate', 'endDate', 'placesLeft']
            }
        });

        return activity

    } catch (error) {
        console.log('[Activites | getById] Error: ', error);
        return {};
    }
} 