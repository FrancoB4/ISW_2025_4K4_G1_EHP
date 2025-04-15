import express from 'express';
import { getAllRegistrations, createRegistrations } from '../controllers/registration.controller.js';
import { getAllRegDetails } from '../controllers/registration_detail.controller.js';

const registrationRouter = express.Router();

registrationRouter.get('/', getAllRegistrations);
registrationRouter.post('/', createRegistrations);
registrationRouter.get('/details', getAllRegDetails);

export default registrationRouter