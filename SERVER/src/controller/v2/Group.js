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
      res.status(400).json({ status: 400, error: 'Missing parameters' });
    }
  }

  static getAllGroups(req, res) {
    const queryText = `SELECT * FROM groups WHERE creatorId = $1 RETURNING *`; // Get all rows where creatorId = userId
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
}

export default Group;
