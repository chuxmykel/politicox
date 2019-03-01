import db from '../model/db';

/**
 * @class CandidateController
 * @description Contains methods for each candidate related endpoint
 * @exports candidateController
 */
class CandidateController {
  /**
  * @method registerCandidate
  * @description Register a candidate to run for an office
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async registerCandidate(req, res) {
    const queryText1 = 'SELECT * FROM users WHERE id = $1';
    const queryText2 = `INSERT INTO candidates (candidate, party, office) 
    VALUES ($1, $2, $3) RETURNING *;`;

    try {
      const user = parseInt(req.params.id, 10);
      const { party, office } = req.body;
      const response1 = await db.query(queryText1, [user]);

      if (response1.rowCount < 1) {
        return res.status(404).send({
          status: 404,
          error: 'User does not exist',
        });
      }

      const values = [user, party, office];
      const response2 = await db.query(queryText2, values);

      const { candidate, office: newOffice } = response2.rows[0];

      return res.status(201).send({
        status: 201,
        data: [{
          office: newOffice,
          user: candidate,
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

const candidateController = new CandidateController();

export default candidateController;
