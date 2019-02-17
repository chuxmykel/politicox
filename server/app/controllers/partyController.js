/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
import parties from '../model/parties';

class PartyController {
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
