"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _db = _interopRequireDefault(require("../model/db"));

var _entities = _interopRequireDefault(require("../model/entities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _entities.default.User;

class UserController {
  static async signup(req, res) {
    const _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          userName = _req$body.userName,
          password = _req$body.password;

    if (firstName && lastName && userName && password) {
      // Ensure firstName, lastName, userName and password length is bewteen 2 and 10
      const firstNameLength = firstName.length > 2 && firstName.length < 10;
      const lastNameLength = lastName.length > 2 && lastName.length < 10;
      const userNameLength = userName.length > 2 && userName.length < 10;
      const passwordLength = password.length > 2 && password.length < 10;

      if (firstNameLength && lastNameLength && userNameLength && passwordLength) {
        try {
          // Check if username exists
          const text = `SELECT * FROM users WHERE email = $1 `;
          const value = [`${userName}@epicmail.com`];
          const emailExists = await _db.default.query(text, value);
          console.log(emailExists);

          if (emailExists.rows.length === 0) {
            const insertText = `INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) returning id`;
            const insertValues = [`${userName}@epicmail.com`, firstName, lastName, password];
            const user = await _db.default.query(insertText, insertValues); // Insert details into databse and get id

            const token = _jsonwebtoken.default.sign({
              userId: user.rows[0].id
            }, _config.default.secret, {
              expiresIn: '500h'
            });

            res.status(200).json({
              status: 200,
              data: [{
                token
              }]
            });
          } else {
            res.status(409).json({
              status: 409,
              error: 'Username already exists'
            });
          }
        } catch (e) {
          res.status(500).json({
            status: 500,
            error: e
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          error: 'Parameters supplied should be between 2 and 10 characters'
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: 'Missing parameter'
      });
    }
  }

  static login(req, res) {
    const _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

    if (email && password) {
      let isAuthenticated = false;
      let userId;
      let userName;
      User.forEach(user => {
        if (email === user.email && password === user.password) {
          isAuthenticated = true;
          userId = user.id; // eslint-disable-next-line prefer-destructuring

          userName = user.userName;
        }
      });

      if (isAuthenticated) {
        const token = _jsonwebtoken.default.sign({
          userName,
          userId
        }, _config.default.secret, {
          expiresIn: '24h'
        });

        res.status(200).json({
          status: 200,
          data: {
            token
          }
        });
      } else {
        res.status(401).json({
          status: 401,
          error: 'Incorrect credentials'
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: 'Missing parameter'
      });
    }
  }

}

var _default = UserController;
exports.default = _default;