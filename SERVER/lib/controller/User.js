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

class UserController {
  static signup(req, res) {
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
        // Check if username already exists
        // Create a variable to store a boolean stating if the username exists
        let userExists = false;
        User.forEach(user => {
          if (user.userName === userName) {
            userExists = true;
          }
        });

        if (userExists) {
          res.status(409).json({
            status: 409,
            error: 'Username already exists'
          });
        } else {
          const userId = User.length + 1;
          const position = User.push({
            id: userId,
            firstName,
            lastName,
            userName,
            password,
            email: `${userName}@epicmail.com`
          });

          const token = _jsonwebtoken.default.sign({
            userId: 1
          }, _config.default.secret, {
            expiresIn: '500h'
          }); // eslint-disable-next-line max-len


          res.status(200).json({
            status: 200,
            data: {
              token,
              position,
              details: User[position - 1]
            }
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