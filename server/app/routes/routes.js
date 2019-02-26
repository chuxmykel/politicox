import '@babel/polyfill';
import express from 'express';
import InputValidator from '../middleware/inputValidator';
import PartyController from '../controllers/partyController';
import OfficeController from '../controllers/officeController';
import UserController from '../controllers/userController';
import AuthenticateUser from '../middleware/authenticateUser';


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
router.post(partyEndPoint,
  InputValidator.validateParty,
  AuthenticateUser.verifyAdmin, PartyController.addParty);

router.get(partyEndPoint, AuthenticateUser.verifyUser, PartyController.getAllParties);
router.get(`${partyEndPoint}:id`, AuthenticateUser.verifyUser, PartyController.getSpecificParty);

router.patch(`${partyEndPoint}:id/name`,
  InputValidator.validateParty,
  AuthenticateUser.verifyAdmin, PartyController.editParty);

router.delete(`${partyEndPoint}:id`, PartyController.deleteParty);// admin

// Office
router.post(officeEndPoint,
  InputValidator.validateOffice,
  AuthenticateUser.verifyAdmin, OfficeController.addOffice);

router.get(officeEndPoint, AuthenticateUser.verifyUser, OfficeController.getAllOffices);
router.get(`${officeEndPoint}:id`, AuthenticateUser.verifyUser, OfficeController.getSpecificOffice);

// User
router.post(`${userEndPoint}signup`, InputValidator.validateUser, UserController.signUp);
router.post(`${userEndPoint}login`, InputValidator.validateLogin, UserController.signIn);

export default router;
