import { CasesRepository } from '../repository/cases-repository';
import { ICase } from '../models/Case';
import { isObjectId } from '../core/Utils';
import { BadRequestError } from '../core/CustomError';

export class CasesService {
    static async createCase(caseData: Partial<ICase>): Promise<ICase> {
        return await CasesRepository.create(caseData);
    }

    static async getCaseById(caseId: string): Promise<ICase | null> {
        if (!isObjectId(caseId)) {
            throw new BadRequestError('caseId is not a valid ObjectId');
        }
        return await CasesRepository.readById(caseId);
    }

    static async getAllCases(): Promise<ICase[]> {
        return await CasesRepository.readAll();
    }

    static async updateCase(caseId: string, caseData: Partial<ICase>): Promise<ICase | null> {
        if (!isObjectId(caseId)) {
            throw new BadRequestError('caseId is not a valid ObjectId');
        }
        return await CasesRepository.update(caseId, caseData);
    }

    static async deleteCase(caseId: string): Promise<ICase | null> {
        if (!isObjectId(caseId)) {
            throw new BadRequestError('caseId is not a valid ObjectId');
        }
        return await CasesRepository.delete(caseId);
    }
}
