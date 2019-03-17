import express from 'express';

import groupController from '../../controller/v2/Group';

import Authentication from '../../middleware/v2/auth';

const router = express.Router();

router.post('/', Authentication.verifyToken, groupController.createGroup);

router.get('/', Authentication.verifyToken, groupController.getAllGroups);

router.patch('/:groupId/:name', Authentication.verifyToken, groupController.patchGroup);

router.delete('/:groupId', Authentication.verifyToken, groupController.deleteGroup);

router.post('/:groupId/users', Authentication.verifyToken, groupController.addUser);

router.delete('/:groupId/users/:userId', Authentication.verifyToken, groupController.deleteUser);

export default router; // Export group router
