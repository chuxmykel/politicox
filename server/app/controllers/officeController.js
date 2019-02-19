import offices from '../model/offices';

/**
 * @class OfficeController
 * @description Contains methods for each party related endpoint
 * @exports officeController
 */
class OfficeController {
  /**
  * @method addOffice
  * @description Adds an office to the data structure
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  addOffice(req, res) {
    const office = { id: offices[offices.length - 1].id + 1, ...req.body };

    offices.push(office);
    return res.status(201).send({
      status: 201,
      data: [
        offices[offices.length - 1],
      ],
    });
  }

  /**
  * @method getAllOffices
  * @description Gets all the offices
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  getAllOffices(req, res) {
    return res.status(200).send({
      status: 201,
      data: offices,
    });
  }
}

const officeController = new OfficeController();

export default officeController;
