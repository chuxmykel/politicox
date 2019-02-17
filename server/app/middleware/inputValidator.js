/* eslint-disable class-methods-use-this */
import Schema from './schema';

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
  * @param {Function} next - The next function to point to the next middleware
  * @returns {object} JSON API Response
  */
  validateParty(req, res, next) {
    const party = { ...req.body };
    const validate = Schema.partySchema(party);
    const { error } = validate;
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
