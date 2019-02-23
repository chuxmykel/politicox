import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

/**
 * @class Auth
 * @description Contains methods for each user related endpoint
 * @exports auth
 */
class Auth {
  /**
  * @method hashPassword
  * @description Hashes the user inputed password
  * @param {string} password - The user password to be hashed
  * @returns {string} A string of the hashed password
  */
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  /**
  * @method generateToken
  * @description Generates a token for the user
  * @param {string} payload - The user payload for generating the token
  * @returns {string} A string which is the token
  */
  generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1 week' });
    return token;
  }
}

const auth = new Auth();

export default auth;
