import jwt from 'jsonwebtoken';

import config from '../config';

import db from '../model/db';

import entities from '../model/entities';

const { User } = entities;

class UserController {
  static async signup(req, res) {
    const {
      firstName, lastName, userName, password,
    } = req.body;

    if (firstName && lastName && userName && password) {
      // Ensure firstName, lastName, userName and password length is bewteen 2 and 10
      const firstNameLength = firstName.length > 2 && firstName.length < 10;
      const lastNameLength = lastName.length > 2 && lastName.length < 10;
      const userNameLength = userName.length > 2 && userName.length < 10;
      const passwordLength = password.length > 2 && password.length < 10;

      if (firstNameLength && lastNameLength && userNameLength && passwordLength) {
        try { // Check if username exists
          const text = `SELECT * FROM users WHERE email = $1 `;
          const value = [`${userName}@epicmail.com`];
          const emailExists = await db.query(text, value);
          console.log(emailExists);
          if (emailExists.rows.length === 0) {
            const insertText = `INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) returning id`;
            const insertValues = [`${userName}@epicmail.com`, firstName, lastName, password];
            const user = await db.query(insertText, insertValues); // Insert details into databse and get id
            const token = jwt.sign({ userId: user.rows[0].id }, config.secret, { expiresIn: '500h' });
            res.status(200).json({ status: 200, data: [{ token }] });
          } else {
            res.status(409).json({ status: 409, error: 'Username already exists' });
          }
        } catch (e) {
          res.status(500).json({ status: 500, error: e });
        }
      } else {
        res.status(400).json({ status: 400, error: 'Parameters supplied should be between 2 and 10 characters' });
      }
    } else {
      res.status(400).json({ status: 400, error: 'Missing parameter' });
    }
  }

  static login(req, res) {
    const {
      email, password,
    } = req.body;

    if (email && password) {
      let isAuthenticated = false;
      let userId;
      let userName;
      User.forEach((user) => {
        if ((email === user.email) && (password === user.password)) {
          isAuthenticated = true;
          userId = user.id;
          // eslint-disable-next-line prefer-destructuring
          userName = user.userName;
        }
      });
      if (isAuthenticated) {
        const token = jwt.sign({ userName, userId }, config.secret, { expiresIn: '24h' });
        res.status(200).json({ status: 200, data: { token } });
      } else {
        res.status(401).json({ status: 401, error: 'Incorrect credentials' });
      }
    } else {
      res.status(400).json({ status: 400, error: 'Missing parameter' });
    }
  }
}


export default UserController;
