import express from 'express';
import { inscripcionRouter } from './routes/inscripcion.routes.js';

export const app = express();

app.use(express.json());
app.use('/api/inscripciones', inscripcionRouter);