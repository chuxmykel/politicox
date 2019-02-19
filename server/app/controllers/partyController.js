/* eslint-disable class-methods-use-this */
import parties from '../model/parties';

/**
 * @class PartyController
 * @description Contains methods for each party related endpoint
 * @exports partyController
 */
class PartyController {
  /**
  * @method addParty
  * @description Adds a party to the data structure if the input is valid
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  addParty(req, res) {
    const party = { id: parties.length + 1, ...req.body };

    parties.push(party);
    return res.status(201).send({
      status: 201,
      data: [{
        id: party.id,
        name: party.name,
      }],
    });
  }

  /**
  * @method getAllParties
  * @description Gets all the parties
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  getAllParties(req, res) {
    return res.status(200).send({
      status: 201,
      data: parties,
    });
  }
}

const partyController = new PartyController();

export default partyController;
