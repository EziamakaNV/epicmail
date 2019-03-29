"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _entities = _interopRequireDefault(require("../model/entities"));

var _db = _interopRequireDefault(require("../model/db"));

var _Validation = _interopRequireDefault(require("../middleware/Validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable quotes */

/* eslint-disable max-len */
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

  static async getMessageId(req, res) {
    const userId = req.user.id;
    const messageId = req.params.messageId;
    const validationObject = {
      messageId
    };

    const _Validation$messageId = _Validation.default.messageId(validationObject),
          error = _Validation$messageId.error;

    if (error) {
      res.status(400).json({
        status: 400,
        error: error.message,
        success: false
      });
    } else {
      // Only get messages that relate to the user
      // The query fetches messages only relating to the user be it semt or received
      const query = `SELECT messages.id, messages.createdon, messages.subject, messages.message, 
      inboxes.receiverid, sents.senderid, messages.parentmessageid FROM messages INNER JOIN inboxes 
      ON messages.id = inboxes.messageid INNER JOIN sents ON sents.messageid = messages.id 
      WHERE (sents.senderid = $1 OR inboxes.receiverid = $1) AND messages.id = $2`;
      const values = [userId, messageId];

      try {
        const result = await _db.default.query(query, values);
        const rows = result.rows;

        if (rows.length === 0) {
          res.status(400).json({
            status: 400,
            error: 'Message not found',
            success: false
          });
        } else {
          res.status(200).json({
            status: 200,
            data: [...rows],
            success: true
          });
        }
      } catch (e) {
        res.status(500).json({
          status: 500,
          error: 'Issues with fetching message(s)'
        });
      }
    }
  }

  static async deleteMessageId(req, res) {
    const userId = req.user.id;
    const messageId = req.params.messageId;
    const validationObject = {
      messageId
    };

    const _Validation$messageId2 = _Validation.default.messageId(validationObject),
          error = _Validation$messageId2.error; // User should only be able to delete messages they sent themselves


    if (error) {
      res.status(400).json({
        status: 400,
        error: error.message,
        success: false
      });
    } else {
      const query = `SELECT messages.id, messages.message, sents.senderid FROM messages 
      INNER JOIN sents ON messages.id = sents.messageid WHERE senderid = $1 AND messages.id = $2`;
      const values = [userId, messageId]; // Run query to verify that message being deleted is owned by the user

      try {
        const result = await _db.default.query(query, values);

        if (result.rowCount === 0) {
          res.status(400).json({
            status: 400,
            error: 'You do not have permission to delete this message',
            success: false
          });
        } else {
          const message = result.rows[0].message; // Query to delete all rows referencing the table

          const deleteValue = [messageId];
          await _db.default.query(`DELETE FROM sents WHERE sents.messageid = $1`, deleteValue);
          await _db.default.query(`DELETE FROM inboxes WHERE inboxes.messageid = $1`, deleteValue);
          await _db.default.query(`DELETE FROM messages WHERE messages.id = $1 RETURNING messages.message`, deleteValue);
          res.status(200).json({
            status: 200,
            data: [{
              message
            }],
            success: true
          });
        }
      } catch (e) {
        res.status(500).json({
          status: 500,
          error: 'Issues querying messages',
          success: false
        });
      }
    }
  }

}

var _default = MessagesController;
exports.default = _default;