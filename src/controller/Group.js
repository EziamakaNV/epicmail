/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable quotes */

import moment from 'moment';

import Validation from '../middleware/Validation';

import db from '../model/db';

class GroupController {
  static createGroup(req, res) {
    const { name } = req.body;
    const creatorId = req.user.id;
    const validationObject = { name, creatorId };
    const { error } = Validation.createGroup(validationObject);

    if (error) {
      return res.status(400).json({ status: 400, error: 'Check parameters', success: false });
    }

    if (name && creatorId) {
      const text = `INSERT INTO
    groups(name, creatorId)
    VALUES($1, $2)
    returning *`;

      const values = [
        name,
        creatorId,
      ];
      db.query(text, values).then((result) => {
        const { rows } = result;
        res.status(201).json({
          status: 201,
          data: [{
            id: rows[0].id,
            name,
            role: 'admin',
            success: true,
          }],
        });
      }, (err) => {
        res.status(500).json({ status: 500, error: `${err}`, success: false });
      });
    } else {
      res.status(400).json({ status: 400, error: 'Missing parameters', success: false });
    }
  }

  static getAllGroups(req, res) {
    const queryText = `SELECT * FROM groups WHERE creatorId = $1`; // Get all rows where creatorId = userId
    const values = [req.user.id];


    db.query(queryText, values)
      .then((result) => {
        const { rows } = result;
        // eslint-disable-next-line no-plusplus
        // eslint-disable-next-line max-len
        for (let i = 0; i < rows.length; ++i) { // Since we get the groups that the user created, the role will always be admin
          rows[i].role = 'admin';
        }
        res.status(200).json({ status: 200, data: [...rows], success: true });
      }, (error) => {
        res.status(500).json({ status: 500, error, success: false });
      });
  }

  static patchGroup(req, res) {
    const userId = req.user.id;
    const { groupId } = req.params;
    const { name } = req.params;
    const validationObject = { groupId, name };
    const { error } = Validation.patchGroup(validationObject);
    if (error) {
      return res.status(400).json({ status: 400, error: 'Check parameters', success: false });
    }

    const queryText = `SELECT creatorId FROM groups WHERE id = $1`;
    const values = [groupId];

    db.query(queryText, values) // Check if the User owns the group
      .then((result) => {
        const { rows } = result;
        if (rows[0].creatorid === userId) { // If the user owns the group, update the name
          const updateQuery = `UPDATE groups SET name = $1 WHERE id = $2`;
          const updateValues = [name, groupId];
          db.query(updateQuery, updateValues) // Update the group name
            // eslint-disable-next-line no-unused-vars
            .then((updateResult) => {
              // const updatedRows = updateResult.rows;
              // updatedRows[0].role = 'admin';
              res.status(200).json({ status: 200, data: [{ id: groupId, name, role: 'admin' }], success: true });
            }, (error) => {
              res.status(500).json({ status: 500, error, success: false });
            });
        } else {
          res.status(403).json({ status: 403, error: 'You do not own this group', success: false });
        }
      }, (error) => {
        res.status(400).json({ status: 400, error, success: false });
      });
  }

  static deleteGroup(req, res) {
    const userId = req.user.id;
    const { groupId } = req.params;
    const validationObject = { groupId };
    const { error } = Validation.deleteGroup(validationObject);
    if (error) {
      return res.status(400).json({ status: 400, error: 'Check parameters', success: false });
    }
    const queryText = `SELECT creatorid FROM groups WHERE id = $1`;
    const values = [groupId];

    db.query(queryText, values) // Check if the User owns the group
      .then((result) => {
        const { rows } = result;
        if (rows[0].creatorid === userId) { // If the user owns the group, update the name
          const deleteQuery = `DELETE FROM groups WHERE id = $1`;
          const deleteValues = [groupId];
          db.query(deleteQuery, deleteValues) // Update the group name
            // eslint-disable-next-line no-unused-vars
            .then((updateResult) => {
              // const updatedRows = updateResult.rows;
              // updatedRows[0].role = 'admin';
              res.status(200).json({ status: 200, data: [{ message: 'Group deleted.' }], success: true });
            }, (error) => {
              res.status(500).json({ status: 500, error, success: false });
            });
        } else {
          res.status(403).json({ status: 403, error: 'You do not own this group', success: false });
        }
      }, (error) => {
        res.status(400).json({ status: 400, error, success: false });
      });
  }

  static addUser(req, res) {
    const userId = req.user.id;
    const { groupId } = req.params;
    const newMember = req.body.user; // New user to be added
    const validationObject = { groupId, newMember };
    const { error } = Validation.addGroup(validationObject);
    if (error) {
      return res.status(400).json({ status: 400, error: 'Check parameters', success: false });
    }
    const queryText = `SELECT creatorid FROM groups WHERE id = $1`;
    const values = [groupId];

    db.query(queryText, values) // Check if the User owns the group
      .then((result) => {
        const { rows } = result;
        if (rows[0].creatorid === userId) { // If the user owns the group, update the name
          const addQuery = `INSERT INTO groupMembers(groupId, memberId, role)
          VALUES($1, $2, $3) RETURNING *`;
          const addValues = [groupId, newMember, 'member'];
          db.query(addQuery, addValues) // Add the new user
            // eslint-disable-next-line no-unused-vars
            .then((addResult) => {
              // const updatedRows = updateResult.rows;
              // updatedRows[0].role = 'admin';
              res.status(201).json({ status: 201, data: [...addResult.rows], success: true });
            }, (error) => {
              res.status(500).json({ status: 500, error, success: false });
            });
        } else {
          res.status(403).json({ status: 403, error: 'You do not own this group', success: false });
        }
      }, (error) => {
        res.status(400).json({ status: 400, error, success: false });
      });
  }

  static deleteUser(req, res) {
    const userId = req.user.id;
    const { groupId } = req.params;
    const memberToDelete = req.params.userId; // member to be Deleted
    const validationObject = { groupId, userId };
    const { error } = Validation.deleteGroupMember(validationObject);
    if (error) {
      return res.status(400).json({ status: 400, error: 'Check parameters', success: false });
    }
    const queryText = `SELECT creatorid FROM groups WHERE id = $1`;
    const values = [groupId];

    db.query(queryText, values) // Check if the User owns the group
      .then((result) => {
        const { rows } = result;
        if (rows[0].creatorid === userId) { // If the user owns the group, update the name
          const deleteQuery = `DELETE FROM groupMembers WHERE groupId = $1 AND memberId = $2`;
          const deleteValues = [groupId, memberToDelete];
          db.query(deleteQuery, deleteValues) // Add the new user
          // eslint-disable-next-line no-unused-vars
            .then((addResult) => {
              // const updatedRows = updateResult.rows;
              // updatedRows[0].role = 'admin';
              res.status(200).json({ status: 200, data: [{ message: 'User deleted' }], success: true });
            }, (error) => {
              res.status(500).json({ status: 500, error, success: false });
            });
        } else {
          res.status(403).json({ status: 403, error: 'You do not own this group', success: false });
        }
      }, (error) => {
        res.status(400).json({ status: 400, error, success: false });
      });
  }

  static sendMessageToGroup(req, res) {
    const { subject } = req.body;
    const { message } = req.body;
    if (subject && message) { // If subject and message parameters exist
      const userId = req.user.id;
      const { groupId } = req.params;
      const queryText = `SELECT creatorid FROM groups WHERE id = $1`;
      const values = [groupId];

      db.query(queryText, values) // Check if the User owns the group
        .then((result) => {
          const { rows } = result;
          if (rows[0].creatorid === userId) { // If the user owns the group, first insert the message in "messages" table
            const createdOn = moment(new Date()); // Timeestamp for message
            const insertMessageQuery = `INSERT INTO messages (createdOn, subject, message, status)
              VALUES($1, $2, $3, $4) RETURNING *`; // Return messageId
            const insertMessageValues = [createdOn, subject, message, 'sent'];
            db.query(insertMessageQuery, insertMessageValues) // Query to insert into "messages"
            // eslint-disable-next-line no-unused-vars
              .then((messageResult) => {
                const messagesRows = messageResult.rows;
                const messagesId = messagesRows[0].id;
                // Insert the message into sents using the returned messagesId
                const insertSentQuery = `INSERT INTO sents (senderId, messageId, createdOn)
                  VALUES ($1, $2, $3)`;
                const insertSentValues = [userId, messagesId, createdOn]; // The sender is the user
                db.query(insertSentQuery, insertSentValues) // Update the "sents" table
                  // eslint-disable-next-line no-unused-vars
                  .then((sentResult) => { // On sucess update the inbox table to make sure all recipients get the message
                    // Get all the id's of the receiver
                    const receiverQuery = `SELECT memberId FROM groupMembers WHERE groupId = $1`;
                    const receiverValues = [groupId];
                    db.query(receiverQuery, receiverValues)
                      .then((receiverResult) => {
                        const receiverIds = [];
                        const receiverRows = receiverResult.rows;
                        receiverRows.forEach((receiver) => { // Go through the returned result to get all receiver Id's
                          receiverIds.push(receiver.memberid); // Store Id's in receiverId array.
                        });
                        for (let i = 0; i < receiverIds.length; i++) { // Update "Inbox" table for all recepients in the group
                          const inboxQuery = `INSERT INTO inboxes (receiverId, messageId, createdOn)
                            VALUES ($1, $2, $3)`;
                          const inboxValue = [receiverIds[i], messagesId, createdOn];
                          db.query(inboxQuery, inboxValue)
                            .then(() => {

                            }).catch(() => {

                            });
                        }
                        res.status(200).json({ status: 200, data: [messagesRows[0]], success: true });
                      }, (error) => {
                        res.status(500).json({ status: 500, error, success: false });
                      });
                  }, (error) => {
                    res.status(500).json({ status: 500, error, success: false });
                  });
              }, (error) => {
                res.status(500).json({ status: 500, error, success: false });
              });
          } else {
            res.status(403).json({ status: 403, error: 'You do not own this group', success: false });
          }
        }, (error) => {
          res.status(400).json({ status: 400, error, success: false });
        });
    } else {
      res.status(400).json({ status: 400, error: 'Missing Parameters.', success: false });
    }
  }
}

export default GroupController;
