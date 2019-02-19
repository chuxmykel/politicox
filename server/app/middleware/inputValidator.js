import Schema from './schema';
import parties from '../model/parties';
import offices from '../model/offices';

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
    const newParty = { ...req.body };
    const validate = req.method === 'POST' ? Schema.createPartySchema(newParty)
      : Schema.editPartySchema(newParty);
    const { error } = validate;
    let nameExists = false;

    parties.forEach((party) => {
      if (newParty.name === party.name) { nameExists = true; }
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

  /**
  * @method validatePartyParams
  * @description Validates the parameters passed in from the request object
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @param {function} next - The next function to point to the next middleware
  * @returns {function} next() - The next function
  */
  validatePartyParams(req, res, next) {
    let idExists = false;
    const id = parseInt(req.params.id, 10);

    parties.forEach((party) => {
      if (party.id === id) { idExists = true; }
    });

    if (!idExists) {
      return res.status(404).send({
        status: 404,
        error: `Party with id: ${req.params.id} does not exist`,
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
    const newOffice = { ...req.body };
    const validate = Schema.createOfficeSchema(newOffice);
    const { error } = validate;
    let nameExists = false;

    offices.forEach((office) => {
      if (newOffice.name === office.name) { nameExists = true; }
    });

    if (nameExists) {
      return res.status(400).send({
        status: 400,
        error: 'Office name already exists',
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
