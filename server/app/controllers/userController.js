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
      const user = response.rows[0];
      const {
        id, firstname, lastname, othername, email, phonenumber, passporturl, isadmin
      } = user;

      const payload = {
        id,
        email,
        isadmin,
      };

      const token = Auth.generateToken({ payload });
      return res.status(201).send({
        status: 201,
        data: [{
          token,
          user: {
            id,
            firstname,
            lastname,
            othername,
            email,
            phonenumber,
            passporturl,
            isadmin
          },
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.detail,
      });
    }
  }

  /**
  * @method signIn
  * @description Logs in a user
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async signIn(req, res) {
    const queryText = 'SELECT * FROM users WHERE email = $1';

    try {
      const { email, password } = req.body;
      const response = await db.query(queryText, [email]);

      if (response.rowCount < 1) {
        return res.status(401).send({
          status: 401,
          error: 'Authentication Failed',
        });
      }

      if (!Auth.verifyPassword(password, response.rows[0].password)) {
        return res.status(401).send({
          status: 401,
          error: 'Authentication Failed',
        });
      }

      const user = { ...response.rows[0] };
      req.user = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        othername: user.othername,
        email,
        phoneNumber: user.phonenumber,
        passportUrl: user.passporturl,
        isAdmin: user.isadmin,
      };

      const token = Auth.generateToken(req.user);
      const {
        id, firstname, lastname, othername, phoneNumber, passportUrl, isAdmin
      } = req.user;

      return res.status(200).send({
        status: 200,
        data: [{
          token,
          user: {
            id,
            firstname,
            lastname,
            othername,
            email,
            phoneNumber,
            passportUrl,
            isAdmin,
          },
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
