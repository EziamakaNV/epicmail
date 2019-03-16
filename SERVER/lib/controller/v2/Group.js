"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../../model/v2/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Group {
  static createGroup(req, res) {
    const _req$body = req.body,
          name = _req$body.name,
          creatorId = _req$body.creatorId;

    if (name && creatorId) {
      const text = `INSERT INTO
    groups(id, name, role, creatorId)
    VALUES($1, $2, $3, $4)
    returning *`;
      const id = Math.floor(Math.random() * 999999999); // Generate Id

      const values = [id, name, 'owner', creatorId];

      _db.default.query(text, values).then(result => {
        const rows = result.rows;
        res.status(201).json({
          status: 201,
          data: [{
            id,
            name,
            role: 'owner',
            rows: rows[0]
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
        error: 'Missing parameters'
      });
    }
  }

}

var _default = Group;
exports.default = _default;