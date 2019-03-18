"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../../model/v2/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Group {
  static createGroup(req, res) {
    const name = req.body.name;
    const creatorId = req.user.id;

    if (name && creatorId) {
      const text = `INSERT INTO
    groups(name, creatorId)
    VALUES($1, $2)
    returning *`;
      const values = [name, creatorId];

      _db.default.query(text, values).then(result => {
        const rows = result.rows;
        res.status(201).json({
          status: 201,
          data: [{
            id: rows[0].id,
            name,
            role: 'admin'
          }]
        });
      }, error => {
        res.status(500).json({
          status: 500,
          error: `${error}`
        });
      });
    } else {
      res.status(400).json({
        status: 400,
        error: 'Missing parameters.'
      });
    }
  }

}

var _default = Group;
exports.default = _default;