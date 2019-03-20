import jwt from 'jsonwebtoken';

import jwtConfig from '../config';

import db from '../model/db';

class Authentication {
  static verifyToken(req, res, next) {
    const token = req.headers['x-access-token']; // Check for token in the body
    if (!token) { // If token is not supplied
      res.status(400).json({ status: 400, error: 'Missing token', success: false });
    } else { // Token exists
    // eslint-disable-next-line consistent-return
      jwt.verify(token, jwtConfig.secret, (err, result) => { // Get userId from decoded token
        if (err) return res.status(400).json({ status: 400, error: 'Incorrect credentials', success: false });
        // eslint-disable-next-line quotes
        const queryText = `SELECT * FROM users WHERE id = $1;`;
        const value = [result.userId];

        db.query(queryText, value) // Check DB if userId exists
          .then((response) => { // Create user property in request and set the Id
            req.user = { id: result.userId };
            next();
          }, (error) => {
            res.status(400).json({ status: 400, error, success: false });
          });
      });
    }
  }
}
export default Authentication;
