import jwt from 'jsonwebtoken';

import config from '../config';

import entities from '../model/entities';

const { User } = entities;

class UserController {
  static signup(req, res) {
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
        // Check if username already exists
      // Create a variable to store a boolean stating if the username exists
        let userExists = false;
        User.forEach((user) => {
          if (user.userName === userName) {
            userExists = true;
          }
        });
        if (userExists) {
          res.status(409).json({ status: 409, error: 'Username already exists' });
        } else {
          const userId = User.length + 1;
          const position = User.push({
            id: userId,
            firstName,
            lastName,
            userName,
            password,
            email: `${userName}@epicmail.com`,
          });
          const token = jwt.sign({ userId: 1 }, config.secret, { expiresIn: '500h' });
          // eslint-disable-next-line max-len
          res.status(200).json({ status: 200, data: { token, position, details: User[position - 1] } });
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
