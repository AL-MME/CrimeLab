import { Request, Response } from 'express';
import { TestimoniesService } from '../service/testimonies-service';
import { ITestimonie } from '../models/Testimonie';

export class TestimoniesController {
    static async createTestimonie(req: Request, res: Response): Promise<void> {
        try {
            const testimonieData: Partial<ITestimonie> = req.body;
            const newTestimonie = await TestimoniesService.createTestimonie(testimonieData);
            res.status(201).json(newTestimonie);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getTestimonieById(req: Request, res: Response): Promise<void> {
        try {
            const testimonieId = req.params.id;
            const testimonieData = await TestimoniesService.getTestimonieById(testimonieId);
            if (testimonieData) {
                res.status(200).json(testimonieData);
            } else {
                res.status(404).json({ message: 'Testimonie not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllTestimonies(req: Request, res: Response): Promise<void> {
        try {
            const testimonies = await TestimoniesService.getAllTestimonies();
            res.status(200).json(testimonies);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateTestimonie(req: Request, res: Response): Promise<void> {
        try {
            const testimonieId = req.params.id;
            const testimonieData: Partial<ITestimonie> = req.body;
            const updatedTestimonie = await TestimoniesService.updateTestimonie(testimonieId, testimonieData);
            if (updatedTestimonie) {
                res.status(200).json({
                    message: 'Testimonie updated successfully',
                    updatedTestimonie,
                });
            } else {
                res.status(404).json({ message: 'Testimonie not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteTestimonie(req: Request, res: Response): Promise<void> {
        try {
            const testimonieId = req.params.id;
            const deletedTestimonie = await TestimoniesService.deleteTestimonie(testimonieId);
            if (deletedTestimonie) {
                res.status(200).json({
                    message: 'Testimonie deleted successfully',
                    deletedTestimonie,
                });
            } else {
                res.status(404).json({ message: 'Testimonie not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllTestimoniesWithNoCase(req: Request, res: Response): Promise<void> {
        try {
            console.log("passe dans getAllTestimoniesWithNoCase avec condition d'IDs");
            console.log(req.body.ids)
            const { ids } = req.body;
            let testimonies;
            console.log("ids :", ids)

            if (ids && Array.isArray(ids)) {
                testimonies = await TestimoniesService.getTestimoniesWithoutCaseByIds(ids);
            } else {
                testimonies = await TestimoniesService.getTestimoniesWithoutCase();
            }

            res.status(200).json(testimonies);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}