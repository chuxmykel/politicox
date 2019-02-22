import db from '../model/db';

/**
 * @class PartyController
 * @description Contains methods for each party related endpoint
 * @exports partyController
 */
class PartyController {
  /**
  * @method addParty
  * @description Adds a party to the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async addParty(req, res) {
    const queryText = 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES($1, $2, $3) returning *';
    const party = { ...req.body };
    const values = [party.name, party.hqAddress, party.logoUrl];

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
   * @method getAllParties
   * @description Fetches all the parties from the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  async getAllParties(req, res) {
    const queryText = 'SELECT * FROM parties ORDER BY id ASC';
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
   * @method getSpecificPartiy
   * @description Fetches a specific party from the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  async getSpecificParty(req, res) {
    const queryText = 'SELECT * FROM parties WHERE id = $1';
    try {
      const { rows } = await db.query(queryText, [req.params.id]);

      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: `Party with id: ${req.params.id} does not exist`,
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

  /**
   * @method editParty
   * @description Updates the name of a party
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  async editParty(req, res) {
    const findQuery = 'SELECT * FROM parties WHERE id=$1';
    const updateQuery = 'UPDATE parties SET name = $1 WHERE id = $2 returning *';
    try {
      const { rows } = await db.query(findQuery, [req.params.id]);

      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: `Party with id: ${req.params.id} does not exist`,
        });
      }
      const values = [
        req.body.name,
        req.params.id
      ];
      const response = await db.query(updateQuery, values);

      return res.status(200).send({
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
   * @method deleteParty
   * @description Deletes a party from the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  async deleteParty(req, res) {
    const deleteQuery = 'DELETE FROM parties WHERE id=$1 returning *';

    try {
      const response = await db.query(deleteQuery, [req.params.id]);

      if (!response.rows[0]) {
        return res.status(404).send({
          status: 404,
          error: `Party with id: ${req.params.id} does not exist`,
        });
      }
      return res.status(200).send({
        status: 200,
        data: [{ message: `Party with id: ${req.params.id} deleted successfully` }]
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.detail,
      });
    }
  }
}

const partyController = new PartyController();

export default partyController;
