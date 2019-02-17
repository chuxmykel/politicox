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

    if (!party.name) {
      return res.status(400).send({
        status: 400,
        error: 'Party name is required',
      });
    }

    if (!party.hqAddress) {
      return res.status(400).send({
        status: 400,
        error: 'HQ address is required',
      });
    }

    parties.push(party);
    return res.status(201).send({
      status: 201,
      data: [{
        id: party.id,
        name: party.name,
      }],
    });
  }
}

const partyController = new PartyController();

export default partyController;
