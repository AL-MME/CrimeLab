import { Request, Response } from 'express';
import { RelaysService } from '../service/relays.service';
import { IRelay } from '../models/Relay';

export class RelaysController {
    static async createRelay(req: Request, res: Response): Promise<void> {
        try {
            const relayData: Partial<IRelay> = req.body;
            const newRelay = await RelaysService.createRelay(relayData);
            res.status(201).json(newRelay);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getRelayById(req: Request, res: Response): Promise<void> {
        try {
            const relayId = req.params.id;
            const relayData = await RelaysService.getRelayById(relayId);
            if (relayData) {
                res.status(200).json(relayData);
            } else {
                res.status(404).json({ message: 'Relay not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllRelays(req: Request, res: Response): Promise<void> {
        try {
            const relays = await RelaysService.getAllRelays();
            res.status(200).json(relays);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateRelay(req: Request, res: Response): Promise<void> {
        try {
            const relayId = req.params.id;
            const relayData: Partial<IRelay> = req.body;
            const updatedRelay = await RelaysService.updateRelay(relayId, relayData);
            if (updatedRelay) {
                res.status(200).json({
                    message: 'Relay updated successfully',
                    updatedRelay,
                });
            } else {
                res.status(404).json({ message: 'Relay not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteRelay(req: Request, res: Response): Promise<void> {
        try {
            const relayId = req.params.id;
            const deletedRelay = await RelaysService.deleteRelay(relayId);
            if (deletedRelay) {
                res.status(200).json({
                    message: 'Relay deleted successfully',
                    deletedRelay,
                });
            } else {
                res.status(404).json({ message: 'Relay not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}