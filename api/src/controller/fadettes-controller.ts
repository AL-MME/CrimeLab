import { Request, Response} from 'express';
import { FadettesService } from '../service/fadettes-service';
import { IFadette } from '../models/Fadette';

export class FadettesController {
    static async createFadette(req: Request, res: Response): Promise<void> {
        try {
            const fadetteData: Partial<IFadette> = req.body;
            const newFadette = await FadettesService.createFadette(fadetteData);
            res.status(201).json(newFadette);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getFadetteById(req: Request, res: Response): Promise<void> {
        try {
            const fadetteId = req.params.id;
            const fadetteData = await FadettesService.getFadetteById(fadetteId);
            if (fadetteData) {
                res.status(200).json(fadetteData);
            } else {
                res.status(404).json({ message: 'Fadette not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllFadettes(req: Request, res: Response): Promise<void> {
        try {
            const fadettes = await FadettesService.getAllFadettes();
            res.status(200).json(fadettes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateFadette(req: Request, res: Response): Promise<void> {
        try {
            const fadetteId = req.params.id;
            const fadetteData: Partial<IFadette> = req.body;
            const updatedFadette = await FadettesService.updateFadette(fadetteId, fadetteData);
            if (updatedFadette) {
                res.status(200).json({
                    message: 'Fadette updated successfully',
                    updatedFadette,
                });
            } else {
                res.status(404).json({ message: 'Fadette not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteFadette(req: Request, res: Response): Promise<void> {
        try {
            const fadetteId = req.params.id
            const deletedFadette = await FadettesService.deleteFadette(fadetteId);
            if (deletedFadette) {
                res.status(200).json({
                    message: 'Fadette deleted successfully',
                    deletedFadette,
                });
            } else {
                res.status(404).json({ message: 'Fadette not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}