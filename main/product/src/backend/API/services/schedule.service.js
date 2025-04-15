import { Registration } from "../models/registration.js";
import { Schedule } from "../models/schedule.js";

export const getAll = async () => {
    try {
        const schedules = await Schedule.findAll();
        return schedules;
    }
    catch (error) {
        console.log('[Schedule | getAll] Error:', error);
        return {};
    }
}

export const create = async (data) => {
    try {
        const schedule = await Schedule.create(data);
        return schedule;
    }
    catch (error) {
        console.log('[Schedule | create] Error: ', error);
        return {};
    }
}

export const getByIdSchedule = async (id) => {
    try {
        const schedule = await Schedule.findByPk(id);

        return schedule;

    } catch (error) {
        console.log('[Schedule | getById] Error: ', error);
        return {};
    }
}