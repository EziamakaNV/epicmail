"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _moment = _interopRequireDefault(require("moment"));

var _entities = _interopRequireDefault(require("../model/entities"));

var _db = _interopRequireDefault(require("../model/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable quotes */

/* eslint-disable max-len */
const Messages = _entities.default.Messages;

class MessagesController {
  static async getMessages(req, res) {
    // Fetch all receive messages
    const userId = req.user.id;

    try {
      // Query to fetch all received messages in inbox.
      const query = `SELECT messages.id, messages.createdon, messages.subject, messages.message,
      inboxes.receiverid, sents.senderid, messages.parentmessageid, inboxes.status FROM messages INNER JOIN inboxes ON inboxes.messageid = messages.id INNER JOIN sents ON messages.id = sents.messageid 
      WHERE inboxes.receiverid = $1`;
      const value = [userId];
      const messagesResults = await _db.default.query(query, value);
      const messageRows = messagesResults.rows;
      res.status(200).json({
        status: 200,
        data: [...messageRows],
        success: true
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        error: 'Issue with fetching messge',
        success: false
      });
    }
  }

  static async getUnread(req, res) {
    // Fetch all unread received messages
    const userId = req.user.id;

    try {
      // Query to fetch all received messages in inbox.
      const query = `SELECT messages.id, messages.createdon, messages.subject, messages.message,
      inboxes.receiverid, sents.senderid, messages.parentmessageid, inboxes.status FROM messages INNER JOIN inboxes ON inboxes.messageid = messages.id INNER JOIN sents ON messages.id = sents.messageid 
      WHERE inboxes.receiverid = $1 AND inboxes.status = $2`;
      const value = [userId, 'unread'];
      const messagesResults = await _db.default.query(query, value);
      const messageRows = messagesResults.rows;
      res.status(200).json({
        status: 200,
        data: [...messageRows],
        success: true
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        error: 'Issue with fetching received messages',
        success: false
      });
    }
  }

  static async getSent(req, res) {
    const userId = req.user.id;

    try {
      // Query to fetch all received messages in inbox.
      const query = `SELECT messages.id, messages.createdon, messages.subject, messages.message,
      inboxes.receiverid, sents.senderid, messages.parentmessageid, messages.status FROM messages INNER JOIN sents ON sents.messageid = messages.id INNER JOIN inboxes ON messages.id = inboxes.messageid 
      WHERE sents.senderid = $1  AND messages.status = $2`;
      const value = [userId, 'sent'];
      const messagesResults = await _db.default.query(query, value);
      const messageRows = messagesResults.rows;
      res.status(200).json({
        status: 200,
        data: [...messageRows],
        success: true
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        error: 'Issue with fetching inbox',
        success: false
      });
    }
  }

  static async postMessages(req, res) {
    // Ensure that all parameters are validated
    // Save in messages then save in inbox and sent
    // Check if email to be sent is in the
    const _req$body = req.body,
          receiverEmail = _req$body.receiverEmail,
          subject = _req$body.subject,
          message = _req$body.message;
    const senderId = req.user.id;
    let query;
    let value;
    let receiverResult;
    let receiverRowCount;
    let receiverId;

    if (receiverEmail && subject && message) {
      try {
        // Check if receiver email is on record
        query = `SELECT * FROM users WHERE email = $1`;
        value = [receiverEmail];
        receiverResult = await _db.default.query(query, value);
        receiverRowCount = receiverResult.rowCount;
      } catch (e) {
        res.status(500).json({
          status: 500,
          error: 'Problem verifying receiver email',
          success: false
        });
      }

      if (receiverRowCount === 0) {
        res.status(404).json({
          status: 404,
          error: 'Receiver email not found',
          success: false
        });
      } else {
        let messageId; // Message Id

        const createdOn = (0, _moment.default)(new Date()); // Timeestamp for message
        // Get reciever ID

        receiverId = receiverResult.rows[0].id; // Insert into messages

        try {
          const insertMessageQuery = `INSERT INTO messages (createdOn, subject, message, status)
            VALUES($1, $2, $3, $4) RETURNING *`; // Return messageId

          const insertMessageValues = [createdOn, subject, message, 'sent'];
          const messageResult = await _db.default.query(insertMessageQuery, insertMessageValues); // Query to insert into "messages" getting the id

          messageId = messageResult.rows[0].id;
        } catch (e) {
          res.status(500).json({
            status: 500,
            error: 'Issue with saving message',
            success: false
          });
        } // Insert into sents


        try {
          const insertSentQuery = `INSERT INTO sents (senderId, messageId, createdOn)
                  VALUES ($1, $2, $3)`;
          const insertSentValues = [senderId, messageId, createdOn]; // The sender is the user

          await _db.default.query(insertSentQuery, insertSentValues); // Update the "sents" table
        } catch (e) {
          res.status(500).json({
            status: 500,
            error: 'Issues with saving to sents',
            success: false
          });
        } // Insert into inboxes


        try {
          const inboxQuery = `INSERT INTO inboxes (receiverId, messageId, createdOn, status)
                            VALUES ($1, $2, $3, $4)`;
          const inboxValue = [receiverId, messageId, createdOn, 'unread'];
          await _db.default.query(inboxQuery, inboxValue);
          res.status(200).json({
            status: 200,
            data: [{
              id: messageId,
              createdOn,
              subject,
              message,
              parentMessageId: null,
              status: 'sent'
            }],
            success: true
          });
        } catch (e) {
          res.status(500).json({
            status: 500,
            error: 'Issues with saving to sents',
            success: false
          });
        }
      }
    } else {
      res.status(400).json({
        status: 400,
        error: 'Missing parameters',
        success: false
      });
    }
  }

  static getMessageId(req, res) {
    const reqMessageId = req.params.messageId; // Check if the message Id is an interger
    // eslint-disable-next-line no-restricted-globals

    if (!isNaN(reqMessageId)) {
      let newMessagePosition = null; // Search for email using messageId

      Messages.forEach((message, index) => {
        if (message.id === Number(reqMessageId)) {
          newMessagePosition = index;
        }
      });

      if (newMessagePosition !== null) {
        // If the message was found
        res.status(200).json({
          status: 200,
          data: Messages[newMessagePosition]
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'Message not found'
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: 'Bad request. Message Id must be an Integer'
      });
    }
  }

  static deleteMessageId(req, res) {
    const reqMessageId = req.params.messageId; // Check if the message Id is an interger
    // eslint-disable-next-line no-restricted-globals

    if (!isNaN(reqMessageId)) {
      let newMessagePosition; // Search for email using messageId

      Messages.forEach((message, index) => {
        if (message.id === Number(reqMessageId)) {
          newMessagePosition = index;
        }
      });

      if (newMessagePosition >= 0) {
        // If the message was found
        const message = Messages[newMessagePosition].message; // Retrieve the message propery

        Messages.splice(newMessagePosition, 1); // Then delete the message record

        res.status(200).json({
          status: 200,
          data: {
            message
          }
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'Message not found'
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: 'Bad request. Message Id must be an Integer'
      });
    }
  }

}

var _default = MessagesController;
exports.default = _default;