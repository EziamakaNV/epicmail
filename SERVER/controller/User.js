const jwt = require('jsonwebtoken');

const config = require('../config');

const { User } = require('../model/entities');

class UserController {
  static signup(req, res) {
    if ((req.body.firstName) && (req.body.lastName) && (req.body.userName) && (req.body.password)) {
      const position = User.push({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: `${req.body.userName}`,
        password: req.body.password,
        email: `${req.body.userName}@epicmail.com`,
      });
      const token = jwt.sign({ userName: req.body.userName }, config.secret, { expiresIn: '24h' });
      res.status(200).json({ status: 200, data: { token, position, details: User[position - 1] } });
    } else {
      res.status(400).json({ status: 400, error: 'Missing parameter' });
    }
  }

  static login(req, res) {
    if ((req.body.email) && (req.body.password)) {
      let isAuthenticated = false;
      let userIndex;
      User.forEach((user, index) => {
        if ((req.body.email === user.email) && (req.body.password === user.password)) {
          isAuthenticated = true;
          userIndex = index;
        }
      });
      if (isAuthenticated) {
        const token = jwt.sign({ email: req.body.email }, config.secret, { expiresIn: '24h' });
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
