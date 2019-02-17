/* eslint-disable class-methods-use-this */
import Joi from 'joi';

/**
 * @class Schema
 * @description Validates user input.
 * @exports schema
 */
class Schema {
  /**
  * @method partySchema
  * @description Registers a user if details are correct
  * @param {object} party - The party object to be validated
  * @returns {object} An object specifying weather the input was validated or not.
  */
  partySchema(party) {
    const schema = {
      name: Joi.string().min(2).max(20).required()
        .regex(/^[a-zA-Z]+$/),
      hqAddress: Joi.string().min(3).max(100).required(),
      logoUrl: Joi.string().min(5).max(200).optional(),
    };
    return Joi.validate(party, schema);
  }
}

const schema = new Schema();

export default schema;
