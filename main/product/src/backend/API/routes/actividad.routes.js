import express from 'express';
import { createActividad, getAllActividades } from '../controllers/actividad.controller.js';

export const actividadRouter = express.Router();

actividadRouter.get('/', getAllActividades);
actividadRouter.post('/', createActividad);