import jwt from 'jsonwebtoken';

import jwtConfig from '../config';

import entities from '../model/entities';

const { User } = entities;

class Authentication {
  static verifyToken(req, res, next) {
    const { token } = req.body; // Check for token in the body
    if (!token) { // If token is not supplied
      res.status(400).json({ status: 400, error: 'Missing token' });
    } else { // Token exists
    // eslint-disable-next-line consistent-return
      jwt.verify(token, jwtConfig, (err, result) => { // Get userId from decoded token
        let userExists = false;
        let id;
        if (err) return res.status(500).json({ status: 500, error: err });

        User.forEach((user) => { // Check each user if the Id exists
          if (user.id === result.userId) {
            userExists = true;
            // eslint-disable-next-line prefer-destructuring
            id = user.id;
          }
        });

        if (userExists) {
          req.user = { id };
          next();
        } else {
          res.status(400).json({ status: 400, error: 'Invalid token' });
        }
      });
    }
  }
}
export default Authentication;
