import { Case, ICase } from '../models/Case';

export class CasesRepository {

    static async create(caseData: Partial<ICase>): Promise<ICase> {
        return Case.create(caseData);
    }

    static async readById(caseId: string): Promise<ICase | null> {
        return await Case.findById(caseId).exec();
    }

    static async readAll(): Promise<ICase[]> {
        return Case.find().exec();
    }

    static async update(caseId: string, caseData: Partial<ICase>): Promise<ICase | null> {
        return await Case.findByIdAndUpdate(caseId, caseData, { new: true }).exec();
    }

    static async delete(caseId: string): Promise<ICase | null> {
        return await Case.findByIdAndDelete(caseId).exec();
    }
}
