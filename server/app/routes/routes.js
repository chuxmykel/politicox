import '@babel/polyfill';
import express from 'express';
import InputValidator from '../middleware/inputValidator';
import AuthenticateUser from '../middleware/authenticateUser';
import UserController from '../controllers/userController';
import PartyController from '../controllers/partyController';
import OfficeController from '../controllers/officeController';
import CandidateController from '../controllers/candidateController';


const router = express.Router();

const homeEndPoint = '/';
const apiEndPoint = '/api/v1/';
const userEndPoint = `${apiEndPoint}auth/`;
const partyEndPoint = `${apiEndPoint}parties/`;
const officeEndPoint = `${apiEndPoint}offices/`;
const candidateEndpoint = `${apiEndPoint}office/:id/register/`;

// Home
router.get(homeEndPoint, (req, res) => res.status(200).redirect(apiEndPoint));
router.get(apiEndPoint, (req, res) => res.status(200).send('Welcome to politicox'));

// User
router.post(`${userEndPoint}signup`, InputValidator.validateUser, UserController.signUp);
router.post(`${userEndPoint}login`, InputValidator.validateLogin, UserController.signIn);

// Party
router.post(partyEndPoint,
  InputValidator.validateParty,
  AuthenticateUser.verifyAdmin, PartyController.addParty);

router.get(partyEndPoint, AuthenticateUser.verifyUser, PartyController.getAllParties);
router.get(`${partyEndPoint}:id`, AuthenticateUser.verifyUser, PartyController.getSpecificParty);

router.patch(`${partyEndPoint}:id/name`,
  InputValidator.validateParty,
  AuthenticateUser.verifyAdmin, PartyController.editParty);

router.delete(`${partyEndPoint}:id`, AuthenticateUser.verifyAdmin, PartyController.deleteParty);

// Office
router.post(officeEndPoint,
  InputValidator.validateOffice,
  AuthenticateUser.verifyAdmin, OfficeController.addOffice);

router.get(officeEndPoint, AuthenticateUser.verifyUser, OfficeController.getAllOffices);
router.get(`${officeEndPoint}:id`, AuthenticateUser.verifyUser, OfficeController.getSpecificOffice);

// Candidate
router.post(candidateEndpoint,
  InputValidator.validateCandidate,
  AuthenticateUser.verifyAdmin, CandidateController.registerCandidate);

export default router;
