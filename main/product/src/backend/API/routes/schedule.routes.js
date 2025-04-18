import express from 'express';
import { getAllSchedule, createSchedule, asd } from '../controllers/schedule.controller.js';

const scheduleRouter = express.Router();

scheduleRouter.get('/', getAllSchedule);
scheduleRouter.post('/', createSchedule);
scheduleRouter.get('/asd', asd);

export default scheduleRouter