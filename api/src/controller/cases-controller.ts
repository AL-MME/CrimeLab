import { Request, Response } from 'express';
import { CaseService } from '../service/cases-service';
import { ICase } from '../models/Case';

export class CaseController {
    static async createCase(req: Request, res: Response): Promise<void> {
        try {
            const caseData: Partial<ICase> = req.body;
            const newCase = await CaseService.createCase(caseData);
            res.status(201).json(newCase);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCaseById(req: Request, res: Response): Promise<void> {
        try {
            const caseId = req.params.id;
            const caseData = await CaseService.getCaseById(caseId);
            if (caseData) {
                res.status(200).json(caseData);
            } else {
                res.status(404).json({ message: 'Case not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllCases(req: Request, res: Response): Promise<void> {
        try {
            const cases = await CaseService.getAllCases();
            res.status(200).json(cases);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateCase(req: Request, res: Response): Promise<void> {
        try {
            const caseId = req.params.id;
            const caseData: Partial<ICase> = req.body;
            const updatedCase = await CaseService.updateCase(caseId, caseData);
            if (updatedCase) {
                res.status(200).json(updatedCase);
            } else {
                res.status(404).json({ message: 'Case not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteCase(req: Request, res: Response): Promise<void> {
        try {
            const caseId = req.params.id;
            const deletedCase = await CaseService.deleteCase(caseId);
            if (deletedCase) {
                res.status(200).json(deletedCase);
            } else {
                res.status(404).json({ message: 'Case not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
