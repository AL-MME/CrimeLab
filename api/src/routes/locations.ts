import { Request, Response } from 'express';
import { LocationsController } from '../controller/locations-controller';
import express from 'express';
const router = express.Router();

router.post('/locations', (req: Request, res: Response) => LocationsController.createLocation(req, res));
router.get('/locations/:id', (req: Request, res: Response) => LocationsController.getLocationById(req, res));
router.get('/locations', (req: Request, res: Response) => LocationsController.getAllLocations(req, res));
router.put('/locations/:id', (req: Request, res: Response) => LocationsController.updateLocation(req, res));
router.delete('/locations/:id', (req: Request, res: Response) => LocationsController.deleteLocation(req, res));

module.exports = router;