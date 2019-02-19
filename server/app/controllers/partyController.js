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

  /**
  * @method getSpecificParty
  * @description Gets a specified party
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  getSpecificParty(req, res) {
    const partyIndex = parseInt(req.params.id, 10) - 1;

    return res.status(200).send({
      status: 201,
      data: parties[partyIndex],
    });
  }

  /**
  * @method editParty
  * @description Edits a party
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  editParty(req, res) {
    const partyIndex = parseInt(req.params.id, 10) - 1;
    parties[partyIndex].name = req.body.name;

    return res.status(200).send({
      status: 200,
      data: [{
        id: parties[partyIndex].id,
        name: parties[partyIndex].name,
      }],
    });
  }
}

const partyController = new PartyController();

export default partyController;
