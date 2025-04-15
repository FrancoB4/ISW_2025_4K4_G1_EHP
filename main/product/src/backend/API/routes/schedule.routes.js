import express from 'express';
import { getAllSchedule, createSchedule } from '../controllers/schedule.controller.js';

const scheduleRouter = express.Router();

scheduleRouter.get('/', getAllSchedule);
scheduleRouter.post('/', createSchedule);

export default scheduleRouter