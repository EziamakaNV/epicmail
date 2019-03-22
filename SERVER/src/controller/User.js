import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import Validation from '../middleware/Validation';

import config from '../config';

import db from '../model/db';


class UserController {
  static async signup(req, res) {
    const {
      firstName, lastName, userName, password,
    } = req.body;
    const validationObject = {
      firstName,
      lastName,
      userName,
      password,
    };
    const { error } = Validation.signupValidation(validationObject);
    if (!error) {
      // Ensure firstName, lastName, userName and password length is bewteen 2 and 10
      const firstNameLength = firstName.length > 2 && firstName.length < 10;
      const lastNameLength = lastName.length > 2 && lastName.length < 10;
      const userNameLength = userName.length > 2 && userName.length < 10;
      const passwordLength = password.length > 2 && password.length < 10;

      if (firstNameLength && lastNameLength && userNameLength && passwordLength) {
        try { // Check if username exists
          const lowerCaseUserName = userName.toLowerCase();
          const text = `SELECT * FROM users WHERE email = $1 `;
          const value = [`${lowerCaseUserName}@epicmail.com`];
          const emailExists = await db.query(text, value);
          if (emailExists.rows.length === 0) {
            const hashedP = await bcrypt.hash(password, 10);
            console.log(`hashedP: ${hashedP}`);
            const insertText = `INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) returning id`;
            const insertValues = [`${userName}@epicmail.com`, firstName, lastName, hashedP];
            const user = await db.query(insertText, insertValues); // Insert details into databse and get id
            const token = jwt.sign({ id: user.rows[0].id }, config.secret, { expiresIn: '500h' });
            const insertLowerCase = lowerCaseUserName;
            res.status(200).json({
              status: 200,
              data: [{
                token,
                email: `${insertLowerCase}@epicmail.com`,
                firstName,
                lastName,
              }],
              success: true,
            });
          } else {
            res.status(409).json({ status: 409, error: 'Username already exists', success: false });
          }
        } catch (e) {
          res.status(500).json({ status: 500, error: 'Issues fetching credentials', success: false });
        }
      } else {
        res.status(400).json({ status: 400, error: 'Parameters supplied should be between 2 and 10 characters', success: false });
      }
    } else {
      res.status(400).json({ status: 400, error: 'Missing parameter', success: false });
    }
  }

  static async login(req, res) {
    const {
      email, password,
    } = req.body;
    const validationObject = {
      email,
      password,
    };
    const { error } = Validation.loginValidation(validationObject);
    console.log(error);
    if (!error) {
      const query = `SELECT * FROM users WHERE email = $1`;
      const value = [email];
      try {
        const credentials = await db.query(query, value);
        if (credentials.rowCount === 0) {
          res.status(401).json({ status: 401, error: 'Email does not exist', success: false });
        } else {
          const { id } = credentials.rows[0];
          const hashedPassword = credentials.rows[0].password;
          const match = await bcrypt.compare(password, hashedPassword); // Compare against hashed password
          if (match) {
            const token = jwt.sign({ id }, config.secret, { expiresIn: '24h' });
            res.status(200).json({ status: 200, data: { token }, success: true });
          } else {
            res.status(401).json({ status: 401, error: 'Incorrect credentials', success: false });
          }
        }
      } catch (e) {
        res.status(400).json({ status: 400, error: e, success: false });
      }
    } else {
      res.status(400).json({ status: 400, error: 'Check parameters supplied', success: false });
    }
  }
}


export default UserController;
