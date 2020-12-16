import express from 'express';
import { logError } from '../../middleware/logging';

const router = express.Router();

router.get('/', (req, res) => {
  logError('TEST: EHR Repo Error logging test entry');
  res.status(201).send('Added test Error to the log');
});

export default router;