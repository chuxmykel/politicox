import db from '../model/db';

/**
 * @class VoteController
 * @description Contains methods for each candidate related endpoint
 * @exports voteController
 */
class VoteController {
  /**
  * @method vote
  * @description Register the user's vote
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async vote(req, res) {
    const queryText1 = 'SELECT * FROM candidates WHERE candidate = $1';
    const queryText2 = `INSERT INTO votes (createdOn, createdBy, office, candidate) 
    VALUES ($1, $2, $3, $4) RETURNING *;`;

    try {
      const { candidate } = req.body;
      const response1 = await db.query(queryText1, [candidate]);

      if (response1.rowCount < 1) {
        return res.status(404).send({
          status: 404,
          error: 'Candidate does not exist',
        });
      }
      const { office } = response1.rows[0];
      const now = new Date();
      const values = [now, req.user.id, office, candidate];

      const response2 = await db.query(queryText2, values);

      const { office: newOffice, candidate: newCandidate, createdby } = response2.rows[0];

      return res.status(201).send({
        status: 201,
        data: [{
          office: newOffice,
          candidate: newCandidate,
          voter: createdby,
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

const voteController = new VoteController();

export default voteController;
