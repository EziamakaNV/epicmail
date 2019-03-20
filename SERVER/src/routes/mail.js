import express from 'express';

import MessagesController from '../controller/Mail';

import Authentication from '../middleware/auth';

const router = express.Router();

router.get('/', Authentication.verifyToken, MessagesController.getMessages);

router.get('/unread', Authentication.verifyToken, MessagesController.getUnread);

router.get('/sent', Authentication.verifyToken, MessagesController.getSent);

router.post('/', Authentication.verifyToken, MessagesController.postMessages);

router.route('/:messageId')
  .get(Authentication.verifyToken, MessagesController.getMessageId)
  .delete(Authentication.verifyToken, MessagesController.deleteMessageId);

export default router;
