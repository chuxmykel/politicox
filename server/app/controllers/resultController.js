import db from '../model/db';

/**
 * @class ResultController
 * @description Contains methods for each candidate related endpoint
 * @exports resultController
 */
class ResultController {
  /**
  * @method getResult
  * @description get the results of the election
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async getResult(req, res) {
    const queryText = `SELECT office, candidate, COUNT(candidate) AS result
    FROM votes WHERE office = $1 
    GROUP BY candidate, office;`;
    try {
      const response = await db.query(queryText, [req.params.id]);

      if (response.rowCount < 1) {
        return res.status(404).send({
          status: 404,
          error: 'Office has no votes',
        });
      }


      return res.status(200).send({
        status: 200,
        data: response.rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.detail,
      });
    }
  }
}

const resultController = new ResultController();

export default resultController;
