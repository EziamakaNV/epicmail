"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _Validation = _interopRequireDefault(require("../middleware/Validation"));

var _config = _interopRequireDefault(require("../config"));

var _db = _interopRequireDefault(require("../model/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  static async signup(req, res) {
    const _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          userName = _req$body.userName,
          password = _req$body.password;
    const validationObject = {
      firstName,
      lastName,
      userName,
      password
    };

    const _Validation$signupVal = _Validation.default.signupValidation(validationObject),
          error = _Validation$signupVal.error;

    if (!error) {
      // Ensure firstName, lastName, userName and password length is bewteen 2 and 10
      const firstNameLength = firstName.length > 2 && firstName.length < 10;
      const lastNameLength = lastName.length > 2 && lastName.length < 10;
      const userNameLength = userName.length > 2 && userName.length < 10;
      const passwordLength = password.length > 2 && password.length < 10;

      if (firstNameLength && lastNameLength && userNameLength && passwordLength) {
        try {
          // Check if username exists
          const lowerCaseUserName = userName.replace(/\s/g, '').toLowerCase(); // The .replace is from Stack Overflow. It removes empty spaces

          const text = `SELECT * FROM users WHERE email = $1 `;
          const value = [`${lowerCaseUserName}@epicmail.com`];
          const emailExists = await _db.default.query(text, value);

          if (emailExists.rows.length === 0) {
            const hashedP = await _bcrypt.default.hash(password, 10);
            console.log(`hashedP: ${hashedP}`);
            console.log(lowerCaseUserName);
            const insertText = `INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) returning id`;
            const insertValues = [`${lowerCaseUserName}@epicmail.com`, firstName, lastName, hashedP];
            const user = await _db.default.query(insertText, insertValues); // Insert details into databse and get id

            const token = _jsonwebtoken.default.sign({
              id: user.rows[0].id
            }, _config.default.secret, {
              expiresIn: '500h'
            });

            const insertLowerCase = lowerCaseUserName;
            res.status(200).json({
              status: 200,
              data: [{
                token,
                email: `${insertLowerCase}@epicmail.com`,
                firstName,
                lastName
              }],
              success: true
            });
          } else {
            res.status(409).json({
              status: 409,
              error: 'Username already exists',
              success: false
            });
          }
        } catch (e) {
          res.status(500).json({
            status: 500,
            error: 'Issues fetching credentials',
            success: false
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          error: 'Parameters supplied should be between 2 and 10 characters',
          success: false
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: 'Missing parameter',
        success: false
      });
    }
  }

  static async login(req, res) {
    const _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
    const validationObject = {
      email,
      password
    };

    const _Validation$loginVali = _Validation.default.loginValidation(validationObject),
          error = _Validation$loginVali.error;

    console.log(error);

    if (!error) {
      const query = `SELECT * FROM users WHERE email = $1`;
      const value = [email];

      try {
        const credentials = await _db.default.query(query, value);

        if (credentials.rowCount === 0) {
          res.status(401).json({
            status: 401,
            error: 'Email does not exist',
            success: false
          });
        } else {
          const id = credentials.rows[0].id;
          const hashedPassword = credentials.rows[0].password;
          const match = await _bcrypt.default.compare(password, hashedPassword); // Compare against hashed password

          if (match) {
            const token = _jsonwebtoken.default.sign({
              id
            }, _config.default.secret, {
              expiresIn: '24h'
            });

            res.status(200).json({
              status: 200,
              data: {
                token
              },
              success: true
            });
          } else {
            res.status(401).json({
              status: 401,
              error: 'Incorrect credentials',
              success: false
            });
          }
        }
      } catch (e) {
        res.status(400).json({
          status: 400,
          error: e,
          success: false
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: 'Check parameters supplied',
        success: false
      });
    }
  }

}

var _default = UserController;
exports.default = _default;