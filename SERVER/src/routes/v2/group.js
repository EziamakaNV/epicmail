import express from 'express';

import groupController from '../../controller/v2/Group';

import Authentication from '../../middleware/v2/auth';

const router = express.Router();

router.post('/', Authentication.verifyToken, groupController.createGroup);

export default router; // Export group router
