"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _entities = _interopRequireDefault(require("../model/entities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _entities.default.User;

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
      _jsonwebtoken.default.verify(token, _config.default, (err, result) => {
        // Get userId from decoded token
        let userExists = false;
        let id;
        if (err) return res.status(500).json({
          status: 500,
          error: err
        });
        User.forEach(user => {
          // Check each user if the Id exists
          if (user.id === result.userId) {
            userExists = true; // eslint-disable-next-line prefer-destructuring

            id = user.id;
          }
        });

        if (userExists) {
          req.user = {
            id
          };
          next();
        } else {
          res.status(400).json({
            status: 400,
            error: 'Invalid token'
          });
        }
      });
    }
  }

}

var _default = Authentication;
exports.default = _default;