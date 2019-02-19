import express from 'express';
import InputValidator from '../middleware/inputValidator';
import PartyController from '../controllers/partyController';

const router = express.Router();

const homeEndPoint = '/';
const apiEndPoint = '/api/v1/';
const partyEndPoint = `${apiEndPoint}parties/`;

// Home
router.get(homeEndPoint, (req, res) => res.status(200).redirect(apiEndPoint));
router.get(apiEndPoint, (req, res) => res.status(200).send('Welcome to politicox'));

// Party
router.post(partyEndPoint, InputValidator.validatePartyBody, PartyController.addParty);
router.get(partyEndPoint, PartyController.getAllParties);
router.get(`${partyEndPoint}:id`, InputValidator.validatePartyParams, PartyController.getSpecificParty);
router.patch(`${partyEndPoint}:id/name`,
  InputValidator.validatePartyParams,
  InputValidator.validatePartyBody, PartyController.editParty);

export default router;
