import express from 'express';

import groupController from '../../controller/v2/Group';

import Authentication from '../../middleware/v2/auth';

const router = express.Router();

router.post('/', Authentication.verifyToken, groupController.createGroup);

router.get('/', Authentication.verifyToken, groupController.getAllGroups);

router.patch('/:groupId/:name', Authentication.verifyToken, groupController.patchGroup);

export default router; // Export group router
