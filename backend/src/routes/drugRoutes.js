// src/routes/drugRoutes.js

import express from 'express';
import { getTableConfig, getDrugs } from '../controllers/drugController.js';

const router = express.Router();

router.get('/table-config', getTableConfig);
router.get('/drugs', getDrugs);

export default router;
