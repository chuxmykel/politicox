import db from '../model/db';

/**
 * @class OfficeController
 * @description Contains methods for each party related endpoint
 * @exports officeController
 */
class OfficeController {
  /**
  * @method addOffice
  * @description Adds an office to the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async addOffice(req, res) {
    const queryText = 'INSERT INTO offices(type, name) VALUES($1, $2) returning *';
    const office = { ...req.body };
    const values = [office.type, office.name];

    try {
      const response = await db.query(queryText, values);
      return res.status(201).send({
        status: 200,
        data: response.rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.detail,
      });
    }
  }

  /**
   * @method getAllOffices
   * @description Fetches all offices from the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  async getAllOffices(req, res) {
    const queryText = 'SELECT * FROM offices ORDER BY id ASC';
    try {
      const { rows } = await db.query(queryText);
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.detail,
      });
    }
  }

  /**
   * @method getSpecificOffice
   * @description Fetches a specific office from the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  async getSpecificOffice(req, res) {
    const queryText = 'SELECT * FROM offices WHERE id = $1';
    try {
      const { rows } = await db.query(queryText, [req.params.id]);

      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: `Office with id: ${req.params.id} does not exist`,
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.detail,
      });
    }
  }
}

const officeController = new OfficeController();

export default officeController;
