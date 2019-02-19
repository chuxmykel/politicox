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
  * @method eidtPartySchema
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
}

const schema = new Schema();

export default schema;
