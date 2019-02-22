import '@babel/polyfill';
import express from 'express';
import InputValidator from '../middleware/inputValidator';
import PartyController from '../controllers/partyController';
import OfficeController from '../controllers/officeController';


const router = express.Router();

const homeEndPoint = '/';
const apiEndPoint = '/api/v1/';
const partyEndPoint = `${apiEndPoint}parties/`;
const officeEndPoint = `${apiEndPoint}offices/`;

// Home
router.get(homeEndPoint, (req, res) => res.status(200).redirect(apiEndPoint));
router.get(apiEndPoint, (req, res) => res.status(200).send('Welcome to politicox'));

// Party
router.post(partyEndPoint, InputValidator.validatePartyBody, PartyController.addParty);
router.get(partyEndPoint, PartyController.getAllParties);
router.get(`${partyEndPoint}:id`, PartyController.getSpecificParty);
router.patch(`${partyEndPoint}:id/name`, InputValidator.validatePartyBody, PartyController.editParty);
router.delete(`${partyEndPoint}:id`, PartyController.deleteParty);

// Office
router.post(officeEndPoint, InputValidator.validateOfficeBody, OfficeController.addOffice);
router.get(officeEndPoint, OfficeController.getAllOffices);
router.get(`${officeEndPoint}:id`, OfficeController.getSpecificOffice);

export default router;
