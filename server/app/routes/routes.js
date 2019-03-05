import '@babel/polyfill';
import express from 'express';
import InputValidator from '../middleware/inputValidator';
import AuthenticateUser from '../middleware/authenticateUser';
import UserController from '../controllers/userController';
import PartyController from '../controllers/partyController';
import OfficeController from '../controllers/officeController';
import CandidateController from '../controllers/candidateController';
import VoteController from '../controllers/voteController';
import ResultController from '../controllers/resultController';


const router = express.Router();

const homeEndPoint = '/';
const apiEndPoint = '/api/v1/';
const userEndPoint = `${apiEndPoint}auth/`;
const partyEndPoint = `${apiEndPoint}parties/`;
const officeEndPoint = `${apiEndPoint}offices/`;
const candidateEndpoint = `${apiEndPoint}office/:id/register/`;
const voteEndpoint = `${apiEndPoint}votes`;
const resultEndPoint = `${apiEndPoint}office/:id/result`;


// Home
router.get(homeEndPoint, (req, res) => res.status(200).redirect(apiEndPoint));
router.get(apiEndPoint, (req, res) => res.status(200).json({ message: 'Welcome to politicox' }));

// Users
router.post(`${userEndPoint}signup`, InputValidator.validateUser, UserController.signUp);
router.post(`${userEndPoint}login`, InputValidator.validateLogin, UserController.signIn);

// Parties
router.post(partyEndPoint,
  InputValidator.validateParty,
  AuthenticateUser.verifyAdmin, PartyController.addParty);

router.get(partyEndPoint, AuthenticateUser.verifyUser, PartyController.getAllParties);
router.get(`${partyEndPoint}:id`, AuthenticateUser.verifyUser, PartyController.getSpecificParty);

router.patch(`${partyEndPoint}:id/name`,
  InputValidator.validateParty,
  AuthenticateUser.verifyAdmin, PartyController.editParty);

router.delete(`${partyEndPoint}:id`, AuthenticateUser.verifyAdmin, PartyController.deleteParty);

// Offices
router.post(officeEndPoint,
  InputValidator.validateOffice,
  AuthenticateUser.verifyAdmin, OfficeController.addOffice);

router.get(officeEndPoint, AuthenticateUser.verifyUser, OfficeController.getAllOffices);
router.get(`${officeEndPoint}:id`, AuthenticateUser.verifyUser, OfficeController.getSpecificOffice);

// Candidates
router.post(candidateEndpoint,
  InputValidator.validateCandidate,
  AuthenticateUser.verifyAdmin, CandidateController.registerCandidate);

// Votes
router.post(voteEndpoint,
  InputValidator.validateVote,
  AuthenticateUser.verifyUser, VoteController.vote);

// Results
router.get(resultEndPoint, AuthenticateUser.verifyUser, ResultController.getResult);

// All Other Endpoints
router.all('*', (req, res) => res.status(404).json({ message: 'Sorry, We have no such endpoint' }));

export default router;
