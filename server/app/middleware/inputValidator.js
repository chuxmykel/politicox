/* eslint-disable class-methods-use-this */
import Schema from './schema';
import parties from '../model/parties';

/**
 * @class InputValidator
 * @description Validates all user inputs
 * @exports inputValidator
 */
class InputValidator {
  /**
  * @method validateParty
  * @description Validates the party object passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  validateParty(req, res, next) {
    const newParty = { ...req.body };
    const validate = Schema.partySchema(newParty);
    const { error } = validate;
    let nameExists = false;

    parties.forEach((party) => {
      if (newParty.name === party.name) {
        nameExists = true;
      }
    });

    if (nameExists) {
      return res.status(400).send({
        status: 400,
        error: 'Party name already exists',
      });
    }

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    return next();
  }
}

const inputValidator = new InputValidator();

export default inputValidator;
