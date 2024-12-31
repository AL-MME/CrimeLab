import { Request, Response } from 'express';
import { CitiesService } from '../service/cities-service';
import { ICity } from '../models/City';

export class CitiesController {
    static async createCity(req: Request, res: Response): Promise<void> {
        try {
            const cityData: Partial<ICity> = req.body;
            const newCity = await CitiesService.createCity(cityData);
            res.status(201).json(newCity);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCityById(req: Request, res: Response): Promise<void> {
        try {
            const cityId = req.params.id;
            const cityData = await CitiesService.getCityById(cityId);
            if (cityData) {
                res.status(200).json(cityData);
            } else {
                res.status(404).json({ message: 'City not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllCities(req: Request, res: Response): Promise<void> {
        try {
            const cities = await CitiesService.getAllCities();
            res.status(200).json(cities);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateCity(req: Request, res: Response): Promise<void> {
        try {
            const cityId = req.params.id;
            const cityData: Partial<ICity> = req.body;
            const updatedCity = await CitiesService.updateCity(cityId, cityData);
            if (updatedCity) {
                res.status(200).json(updatedCity);
            } else {
                res.status(404).json({ message: 'City not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteCity(req: Request, res: Response): Promise<void> {
        try {
            const cityId = req.params.id;
            const deletedCity = await CitiesService.deleteCity(cityId);
            if (deletedCity) {
                res.status(200).json(deletedCity);
            } else {
                res.status(404).json({ message: 'City not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}