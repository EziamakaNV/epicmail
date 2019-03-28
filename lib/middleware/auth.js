"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _db = _interopRequireDefault(require("../model/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class Authentication {
  static verifyToken(req, res, next) {
    console.log('auth reached');
    const token = req.cookies.jwt;

    if (!token) {
      // If token is not supplied
      res.status(200).json({
        status: 400,
        error: req.cookies,
        success: false
      });
    } else {
      // Token exists
      _jsonwebtoken.default.verify(token, _config.default.secret, (err, result) => {
        // Get userId from decoded token
        if (err) return res.status(400).json({
          status: 400,
          error: 'Incorrect credentials',
          success: false
        }); // eslint-disable-next-line quotes

        const queryText = `SELECT * FROM users WHERE id = $1;`;
        const value = [result.id];

        _db.default.query(queryText, value) // Check DB if userId exists
        .then(response => {
          // Create user property in request and set the Id
          req.user = {
            id: result.id
          };
          console.log(`userId: ${result.id}`);
          next();
        }, error => {
          res.status(400).json({
            status: 400,
            error,
            success: false
          });
        });
      });
    }
  }

}

var _default = Authentication;
exports.default = _default;