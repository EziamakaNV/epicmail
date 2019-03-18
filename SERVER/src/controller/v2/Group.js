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
}

export default Group;
