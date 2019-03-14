const db = require('../../model/v2/db');

class Group {
  static createGroup(req, res) {
    const { name, creatorId } = req.body;

    if (name && creatorId) {
      const text = `INSERT INTO
    groups(id, name, role, creatorId)
    VALUES($1, $2, $3, $4)
    returning *`;
      const id = Math.floor(Math.random() * 999999999); // Generate Id

      const values = [
        id,
        name,
        'owner',
        creatorId,
      ];
      db.query(text, values).then((result) => {
        const { rows } = result;
        res.status(201).json({
          status: 201,
          data: [{
            id, name, role: 'owner', rows: rows[0],
          }],
        });
      }, (error) => {
        res.status(500).json({ status: 500, error: `${error}` });
      });
    } else {
      res.status(400).json({ status: 400, error: 'Missing parameters' });
    }
  }
}

module.exports = Group;
