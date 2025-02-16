import { Request, Response } from 'express';
import { TestimoniesController } from '../controller/testimonies-controller';
const express = require('express');
const router = express.Router();

router.post('/testimonies', (req: Request, res: Response) => TestimoniesController.createTestimonie(req, res));
router.get('/testimonies/:id', (req: Request, res: Response) => TestimoniesController.getTestimonieById(req, res));
router.get('/testimonies', (req: Request, res: Response) => TestimoniesController.getAllTestimonies(req, res));
router.put('/testimonies/:id', (req: Request, res: Response) => TestimoniesController.updateTestimonie(req, res));
router.delete('/testimonies/:id', (req: Request, res: Response) => TestimoniesController.deleteTestimonie(req, res));

module.exports = router;