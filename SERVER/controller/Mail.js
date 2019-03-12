const { Messages } = require('../model/entities');

class MessagesController {
  static getMessages(req, res) {
    const messagesResponse = Messages.map(message => message);
    res.status(200).json({ status: 200, data: [...messagesResponse] });
  }

  static getUnread(req, res) {
    const messagesResponse = Messages.map((message) => {
      if (message.status === 'unread') {
        return message;
      }
      return undefined;
    }).filter(message => message !== undefined); // Remove empty elements from array
    return res.status(200).json({ status: 200, data: [...messagesResponse] });
  }

  static getSent(req, res) {
    const messagesResponse = Messages.map((message) => {
      if (message.status === 'sent') {
        return message;
      }
      return undefined;
    }).filter(message => message !== undefined); // Remove empty elements from array
    return res.status(200).json({ status: 200, data: [...messagesResponse] });
  }

  static postMessages(req, res) {
    const {
      senderId, receiverId, subject, message,
    } = req.body;
    if (senderId && receiverId && subject && message) {
      const id = Math.floor((Math.random() * 10000)); // Generate Random Id
      const newMessagePosition = Messages.push({
        id,
        createdOn: Date(),
        subject,
        message,
        senderId: Number(senderId),
        receiverId: Number(receiverId),
        parentMessageId: id,
        status: 'sent',
      });
      res.status(200).json({ status: 200, data: Messages[newMessagePosition - 1] });
    } else {
      res.status(400).json({ status: 400, error: 'Missing parameters' });
    }
  }

  static getMessageId(req, res) {
    const reqMessageId = req.params.messageId;
    // Check if the message Id is an interger
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(reqMessageId)) {
      let newMessagePosition;
      // Search for email using messageId
      Messages.forEach((message, index) => {
        if (message.id === Number(reqMessageId)) {
          newMessagePosition = index;
        }
      });
      if (newMessagePosition >= 0) { // If the message was found
        res.status(200).json({ status: 200, data: Messages[newMessagePosition] });
      } else {
        res.status(404).json({ status: 404, error: 'Message not found' });
      }
    } else {
      res.status(400).json({ status: 400, error: 'Bad request. Message Id must be an Integer' });
    }
  }

  static deleteMessageId(req, res) {
    const reqMessageId = req.params.messageId;
    // Check if the message Id is an interger
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(reqMessageId)) {
      let newMessagePosition;
      // Search for email using messageId
      Messages.forEach((message, index) => {
        if (message.id === Number(reqMessageId)) {
          newMessagePosition = index;
        }
      });
      if (newMessagePosition >= 0) { // If the message was found
        const { message } = Messages[newMessagePosition];// Retrieve the message propery
        Messages.splice(newMessagePosition, 1); // Then delete the message record
        res.status(200).json({ status: 200, data: { message } });
      } else {
        res.status(404).json({ status: 404, error: 'Message not found' });
      }
    } else {
      res.status(400).json({ status: 400, error: 'Bad request. Message Id must be an Integer' });
    }
  }
}

module.exports = MessagesController;
