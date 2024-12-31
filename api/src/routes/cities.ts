import { Request, Response } from 'express';
import { CitiesController } from '../controller/cities-controller';
const express = require('express');
const router = express.Router();

router.post('/cities', (req: Request, res: Response) => CitiesController.createCity(req, res));
router.get('/cities/:id', (req: Request, res: Response) => CitiesController.getCityById(req, res));
router.get('/cities', (req: Request, res: Response) => CitiesController.getAllCities(req, res));
router.put('/cities/:id', (req: Request, res: Response) => CitiesController.updateCity(req, res));
router.delete('/cities/:id', (req: Request, res: Response) => CitiesController.deleteCity(req, res));

module.exports = router;