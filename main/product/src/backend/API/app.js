const express = require('express');
const userRoutes = require('./routes/inscripcion.routes');

const app = express();

app.use(express.json());
app.use('/api/inscripciones', userRoutes);

module.exports = app;