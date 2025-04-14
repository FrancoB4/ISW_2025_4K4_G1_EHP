import express from 'express';
import { inscripcionRouter } from './routes/inscripcion.routes.js';
import { actividadRouter } from './routes/actividad.routes.js';
import { horarioRouter } from './routes/horario.routes.js';

export const app = express();

app.use(express.json());
app.use('/api/inscripciones', inscripcionRouter);
app.use('/api/actividades', actividadRouter);
app.use('/api/horarios', horarioRouter);