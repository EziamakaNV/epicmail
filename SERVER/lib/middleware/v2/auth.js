"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../../config"));

var _db = _interopRequireDefault(require("../../model/v2/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Authentication {
  static verifyToken(req, res, next) {
    const token = req.body.token; // Check for token in the body

    if (!token) {
      // If token is not supplied
      res.status(400).json({
        status: 400,
        error: 'Missing token'
      });
    } else {
      // Token exists
      // eslint-disable-next-line consistent-return
      _jsonwebtoken.default.verify(token, _config.default.secret, (err, result) => {
        // Get userId from decoded token
        if (err) return res.status(400).json({
          status: 400,
          error: 'Incorrect credentials'
        }); // eslint-disable-next-line quotes

        const queryText = `SELECT * FROM users WHERE id = $1;`;
        const value = [result.userId];

        _db.default.query(queryText, value) // Check DB if userId exists
        .then(response => {
          // Create user property in request and set the Id
          // eslint-disable-next-line no-console
          console.log(response); // eslint-disable-next-line no-console

          console.log('user exits');
          req.user = {
            id: result.userId
          };
          next();
        }, error => {
          res.status(400).json({
            status: 400,
            error
          });
        });
      });
    }
  }

}

var _default = Authentication;
exports.default = _default;