import express from 'express';
import { getAllHorarios, createHorario } from '../controllers/horario.controller.js';

export const horarioRouter = express.Router();

horarioRouter.get('/', getAllHorarios);
horarioRouter.post('/', createHorario);