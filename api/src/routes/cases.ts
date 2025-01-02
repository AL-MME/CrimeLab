import { Request, Response } from 'express';
import { CaseController } from '../controller/cases-controller';
const express = require('express');
const router = express.Router();

router.post('/cases', (req: Request, res: Response) => CaseController.createCase(req, res));
router.get('/cases/:id', (req: Request, res: Response) => CaseController.getCaseById(req, res));
router.get('/cases', (req: Request, res: Response) => CaseController.getAllCases(req, res));
router.put('/cases/:id', (req: Request, res: Response) => CaseController.updateCase(req, res));
router.delete('/cases/:id', (req: Request, res: Response) => CaseController.deleteCase(req, res));

module.exports = router;