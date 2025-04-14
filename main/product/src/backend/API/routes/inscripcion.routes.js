import express from 'express';
import { getAllInscripciones, createInscripcion } from '../controllers/inscripcion.controller.js';

export const inscripcionRouter = express.Router();

inscripcionRouter.get('/', getAllInscripciones);
inscripcionRouter.post('/', createInscripcion);
