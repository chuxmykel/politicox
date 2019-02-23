import db from '../model/db';
import Auth from '../auth/auth';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports userController
 */
class UserController {
  /**
  * @method signUp
  * @description Adds a user to the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async signUp(req, res) {
    const queryText = `INSERT INTO users (firstname, lastname, othername, email, phoneNumber, 
        password, passportUrl) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const {
      firstname, lastname, othername, email, phoneNumber, password, passportUrl
    } = req.body;

    const hashedPassword = Auth.hashPassword(password);

    const values = [firstname, lastname, othername, email,
      phoneNumber, hashedPassword, passportUrl];

    try {
      const response = await db.query(queryText, values);
      const { id, createdEmail, isAdmin, } = response.rows;

      const token = Auth.generateToken({ id, createdEmail, isAdmin });
      return res.status(201).send({
        status: 200,
        data: [{
          token,
          user: response.rows[0],
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.detail,
      });
    }
  }
}

const userController = new UserController();

export default userController;
