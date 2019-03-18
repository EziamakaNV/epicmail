import express from 'express';

import GroupController from '../../controller/v2/Group';

import Authentication from '../../middleware/v2/auth';

const router = express.Router();

router.post('/', Authentication.verifyToken, GroupController.createGroup);

router.get('/', Authentication.verifyToken, GroupController.getAllGroups);

router.patch('/:groupId/:name', Authentication.verifyToken, GroupController.patchGroup);

router.delete('/:groupId', Authentication.verifyToken, GroupController.deleteGroup);

router.post('/:groupId/users', Authentication.verifyToken, GroupController.addUser);

router.delete('/:groupId/users/:userId', Authentication.verifyToken, GroupController.deleteUser);

router.post('/:groupId/messages', Authentication.verifyToken, GroupController.sendMessageToGroup);

export default router; // Export group router
