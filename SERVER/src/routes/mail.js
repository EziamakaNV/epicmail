import express from 'express';

import MessagesController from '../controller/Mail';

const router = express.Router();

router.get('/', MessagesController.getMessages);

router.get('/unread', MessagesController.getUnread);

router.get('/sent', MessagesController.getSent);

router.post('/', MessagesController.postMessages);

router.route('/:messageId')
  .get(MessagesController.getMessageId)
  .delete(MessagesController.deleteMessageId);

export default router;
