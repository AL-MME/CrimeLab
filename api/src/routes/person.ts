import { Request, Response } from 'express';
import { PersonsController } from '../controller/persons-controller';
const express = require('express');
const router = express.Router();

router.post('/persons', (req: Request, res: Response) => PersonsController.createPerson(req, res));
router.post('/persons/get/byIds', (req: Request, res: Response) => PersonsController.getAllPersonsByIds(req, res));
router.get('/persons/:id', (req: Request, res: Response) => PersonsController.getPersonById(req, res));
router.get('/persons', (req: Request, res: Response) => PersonsController.getAllPersons(req, res));
router.put('/persons/:id', (req: Request, res: Response) => PersonsController.updatePerson(req, res));
router.delete('/persons/:id', (req: Request, res: Response) => PersonsController.deletePerson(req, res));

module.exports = router;