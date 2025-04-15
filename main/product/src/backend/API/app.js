import express from 'express';
import cors from "cors";
import activityRouter from './routes/activity.routes.js';
import scheduleRouter from './routes/schedule.routes.js';
import registrationRouter from './routes/registration.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/registrations', registrationRouter);
app.use('/api/activities', activityRouter);
app.use('/api/schedules', scheduleRouter);
export default app