import express from 'express';
import { createActivity, getAllActivities, getOne } from '../controllers/activity.controller.js';

const activityRouter = express.Router();

activityRouter.get('/', getAllActivities);
activityRouter.post('/', createActivity);
activityRouter.get('/:id', getOne);

export default activityRouter;