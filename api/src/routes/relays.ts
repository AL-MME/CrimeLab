import { Request, Response } from 'express';
import { RelaysController } from '../controller/relays-controller';
const express = require('express');
const router = express.Router();

router.post('/relays', (req: Request, res: Response) => RelaysController.createRelay(req, res));
router.get('/relays/:id', (req: Request, res: Response) => RelaysController.getRelayById(req, res));
router.get('/relays', (req: Request, res: Response) => RelaysController.getAllRelays(req, res));
router.put('/relays/:id', (req: Request, res: Response) => RelaysController.updateRelay(req, res));
router.delete('/relays/:id', (req: Request, res: Response) => RelaysController.deleteRelay(req, res));

module.exports = router;