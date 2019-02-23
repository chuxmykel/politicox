import '@babel/polyfill';
import express from 'express';
import InputValidator from '../middleware/inputValidator';
import PartyController from '../controllers/partyController';
import OfficeController from '../controllers/officeController';
import UserController from '../controllers/userController';


const router = express.Router();

const homeEndPoint = '/';
const apiEndPoint = '/api/v1/';
const partyEndPoint = `${apiEndPoint}parties/`;
const officeEndPoint = `${apiEndPoint}offices/`;
const userEndPoint = `${apiEndPoint}auth/`;

// Home
router.get(homeEndPoint, (req, res) => res.status(200).redirect(apiEndPoint));
router.get(apiEndPoint, (req, res) => res.status(200).send('Welcome to politicox'));

// Party
router.post(partyEndPoint, InputValidator.validateParty, PartyController.addParty);
router.get(partyEndPoint, PartyController.getAllParties);
router.get(`${partyEndPoint}:id`, PartyController.getSpecificParty);
router.patch(`${partyEndPoint}:id/name`, InputValidator.validateParty, PartyController.editParty);
router.delete(`${partyEndPoint}:id`, PartyController.deleteParty);

// Office
router.post(officeEndPoint, InputValidator.validateOffice, OfficeController.addOffice);
router.get(officeEndPoint, OfficeController.getAllOffices);
router.get(`${officeEndPoint}:id`, OfficeController.getSpecificOffice);

// User
router.post(`${userEndPoint}signup`, InputValidator.validateUser, UserController.signUp);

export default router;
