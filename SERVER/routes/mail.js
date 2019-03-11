const express = require('express');

const router = express.Router();

const MessagesController = require('../controller/Mail');

router.get('/', MessagesController.getMessages);

router.get('/unread', MessagesController.getUnread);

router.get('/sent', MessagesController.getSent);

router.post('/', MessagesController.postMessages);

router.route('/:messageId')
  .get(MessagesController.getMessageId)
  .delete(MessagesController.deleteMessageId);

module.exports = router;
