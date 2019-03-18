/* eslint-disable no-plusplus */
/* eslint-disable quotes */
import db from '../../model/v2/db';

class Group {
  static createGroup(req, res) {
    const { name } = req.body;
    const creatorId = req.user.id;

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
            id: rows[0].id, name, role: 'admin',
          }],
        });
      }, (error) => {
        res.status(500).json({ status: 500, error: `${error}` });
      });
    } else {
      res.status(400).json({ status: 400, error: 'Missing parameters.' });
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
        res.status(200).json({ status: 200, data: [...rows] });
      }, (error) => {
        res.status(500).json({ status: 500, error });
      });
  }

  static patchGroup(req, res) {
    const userId = req.user.id;
    const { groupId } = req.params;
    const { name } = req.params;
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
              res.status(200).json({ status: 200, data: [{ id: groupId, name, role: 'admin' }] });
            }, (error) => {
              res.status(500).json({ status: 500, error });
            });
        } else {
          res.status(403).json({ status: 403, error: 'You do not own this group' });
        }
      }, (error) => {
        res.status(400).json({ status: 400, error });
      });
  }

  static deleteGroup(req, res) {
    const userId = req.user.id;
    const { groupId } = req.params;
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
              res.status(200).json({ status: 200, data: [{ message: 'Group deleted.' }] });
            }, (error) => {
              res.status(500).json({ status: 500, error });
            });
        } else {
          res.status(403).json({ status: 403, error: 'You do not own this group' });
        }
      }, (error) => {
        res.status(400).json({ status: 400, error });
      });
  }
}

export default Group;
