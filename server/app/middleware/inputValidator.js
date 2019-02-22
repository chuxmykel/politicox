import Schema from './schema';

/**
 * @class InputValidator
 * @description Validates all user inputs
 * @exports inputValidator
 */
class InputValidator {
  /**
  * @method validatePartyBody
  * @description Validates the party object passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  validatePartyBody(req, res, next) {
    const party = { ...req.body };
    const validate = req.method === 'POST' ? Schema.createPartySchema(party)
      : Schema.editPartySchema(party);
    const { error } = validate;

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    return next();
  }

  /**
  * @method validateOfficeBody
  * @description Validates the office object passed in from the request body
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  validateOfficeBody(req, res, next) {
    const office = { ...req.body };
    const validate = Schema.createOfficeSchema(office);
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
