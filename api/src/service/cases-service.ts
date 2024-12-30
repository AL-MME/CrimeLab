import { CaseRepository } from '../repository/cases-repository';
import { ICase } from '../models/Case';

export class CaseService {
    static async createCase(caseData: Partial<ICase>): Promise<ICase> {
        return await CaseRepository.create(caseData);
    }

    static async getCaseById(caseId: string): Promise<ICase | null> {
        return await CaseRepository.readById(caseId);
    }

    static async getAllCases(): Promise<ICase[]> {
        return await CaseRepository.readAll();
    }

    static async updateCase(caseId: string, caseData: Partial<ICase>): Promise<ICase | null> {
        return await CaseRepository.update(caseId, caseData);
    }

    static async deleteCase(caseId: string): Promise<ICase | null> {
        return await CaseRepository.delete(caseId);
    }
}

export const caseService = new CaseService();