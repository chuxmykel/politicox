import Joi from 'joi';

/**
 * @class Schema
 * @description Validates user input.
 * @exports schema
 */
class Schema {
  /**
  * @method createPartySchema
  * @description Validates the party object from a post request
  * @param {object} party - The party object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  createPartySchema(party) {
    const schema = {
      name: Joi.string().min(2).max(20).required()
        .regex(/^[a-zA-Z]+$/),
      hqAddress: Joi.string().min(3).max(100).required()
        .regex(/^[a-zA-Z0-9]+[a-zA-Z0-9\s',."'()-]+$/),
      logoUrl: Joi.string().min(5).max(200).optional(),
    };
    return Joi.validate(party, schema);
  }

  /**
  * @method editPartySchema
  * @description Validates the party object from a patch patch
  * @param {object} party - The party object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  editPartySchema(party) {
    const schema = {
      name: Joi.string().min(2).max(20).required()
        .regex(/^[a-zA-Z]+$/),
    };
    return Joi.validate(party, schema);
  }

  /**
  * @method createOfficeSchema
  * @description Validates the Office object from a post request
  * @param {object} office - The office object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  createOfficeSchema(office) {
    const schema = {
      type: Joi.string().min(5).max(50).required()
        .regex(/^[a-zA-Z0-9]+[a-zA-Z\s]+$/),
      name: Joi.string().min(2).max(50).required()
        .regex(/^[a-zA-Z0-9]+[a-zA-Z\s]+$/),
    };
    return Joi.validate(office, schema);
  }

  /**
  * @method createUserSchema
  * @description Validates the user object from a post request
  * @param {object} user - The user object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  createUserSchema(user) {
    const schema = {
      firstname: Joi.string().min(2).max(12).required()
        .regex(/^[a-zA-Z]+$/),
      lastname: Joi.string().min(2).max(12).required()
        .regex(/^[a-zA-Z]+$/),
      othername: Joi.string().min(2).max(12).regex(/^[a-zA-Z]+$/),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phoneNumber: Joi.string().min(8).max(15).regex(/^[0-9+]?[0-9]+[0-9-]+$/),
      passportUrl: Joi.string().min(5).max(200).optional(),
      password: Joi.string().min(5).max(30).required(),
    };
    return Joi.validate(user, schema);
  }

  /**
  * @method loginSchema
  * @description Validates the login details from a post request
  * @param {object} login - The login object to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  loginSchema(login) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(5).max(30).required(),
    };
    return Joi.validate(login, schema);
  }

  /**
  * @method candidateSchema
  * @description Validates the details of a candidate from a post request
  * @param {object} details - The details of the candidate to be validated
  * @returns {object} An object specifying weather the input was valid or not.
  */
  candidateSchema(details) {
    const schema = {
      party: Joi.number().integer().min(1).required(),
      office: Joi.number().integer().min(1).required(),
    };
    return Joi.validate(details, schema);
  }
}

const schema = new Schema();

export default schema;
