import express from 'express';
import cors from "cors";
// import { inscripcionRouter } from './routes/inscripcion.routes.js';
import activityRouter from './routes/activity.routes.js';
import scheduleRouter from './routes/schedule.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
// app.use('/api/inscripciones', inscripcionRouter);
app.use('/api/activities', activityRouter);
app.use('/api/schedules', scheduleRouter);
export default app