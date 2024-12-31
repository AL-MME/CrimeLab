import { ILocation } from '../models/Location';
import { LocationsService } from '../service/locations-service';
import { Request, Response } from 'express';

export class LocationsController {
    static async createLocation(req: Request, res: Response) {
        try {
            const locationData: Partial<ILocation> = req.body;
            const location = await LocationsService.createLocation(locationData);
            res.status(201).json(location);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getLocationById(req: Request, res: Response) {
        try {
            const locationId = req.params.id;
            const location = await LocationsService.getLocationById(locationId);
            if (!location) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            res.json(location);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllLocations(req: Request, res: Response) {
        try {
            const locations = await LocationsService.getAllLocations();
            res.json(locations);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateLocation(req: Request, res: Response) {
        try {
            const locationId = req.params.id;
            const locationData: Partial<ILocation> = req.body;
            const location = await LocationsService.updateLocation(locationId, locationData);
            if (!location) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            res.json(location);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteLocation(req: Request, res: Response) {
        try {
            const locationId = req.params.id;
            const location = await LocationsService.deleteLocation(locationId);
            if (!location) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            res.json(location);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}