import express from 'express';

import { getPatients, createPatients } from '../controllers/patients.js'

const router = express.Router();

router.get('/', getPatients);
router.post('/upload', createPatients);

export default router;