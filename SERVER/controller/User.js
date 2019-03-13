const jwt = require('jsonwebtoken');

const config = require('../config');

const { User } = require('../model/entities');

class UserController {
  static signup(req, res) {
    const {
      firstName, lastName, userName, password,
    } = req.body;

    if (firstName && lastName && userName && password) {
      const position = User.push({
        firstName,
        lastName,
        userName,
        password,
        email: `${userName}@epicmail.com`,
      });
      const token = jwt.sign({ userName }, config.secret, { expiresIn: '24h' });
      res.status(200).json({ status: 200, data: { token, position, details: User[position - 1] } });
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
      let userIndex;
      User.forEach((user, index) => {
        if ((email === user.email) && (password === user.password)) {
          isAuthenticated = true;
          userIndex = index;
        }
      });
      if (isAuthenticated) {
        const token = jwt.sign({ email }, config.secret, { expiresIn: '24h' });
        res.status(200).json({ status: 200, data: { token, user: User[userIndex - 1] } });
      } else {
        res.status(401).json({ status: 401, error: 'Incorrect credentials' });
      }
    } else {
      res.status(400).json({ status: 400, error: 'Missing parameter' });
    }
  }
}


module.exports = UserController;
