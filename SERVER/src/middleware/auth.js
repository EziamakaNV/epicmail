/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';

import jwtConfig from '../config';

import db from '../model/db';

class Authentication {
  static verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) { // If token is not supplied
      res.status(400).json({ status: 400, error: 'Missing token', success: false });
    } else { // Token exists
      jwt.verify(token, jwtConfig.secret, (err, result) => { // Get userId from decoded token
        if (err) return res.status(400).json({ status: 400, error: 'Incorrect credentials', success: false });
        // eslint-disable-next-line quotes
        const queryText = `SELECT * FROM users WHERE id = $1;`;
        const value = [result.id];

        db.query(queryText, value) // Check DB if userId exists
          .then((response) => { // Create user property in request and set the Id
            req.user = { id: result.id };
            next();
          }, (error) => {
            res.status(400).json({ status: 400, error, success: false });
          });
      });
    }
  }
}
export default Authentication;
