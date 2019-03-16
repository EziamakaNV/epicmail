import express from 'express';

import groupController from '../../controller/v2/Group';

const router = express.Router();

router.post('/', groupController.createGroup);

export default router; // Export group router
