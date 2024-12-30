import { Model } from 'mongoose';
import { Case, ICase } from '../models/Case';

export class CaseRepository {

    static async create(caseData: Partial<ICase>): Promise<ICase> {
        return Case.create(caseData);
    }

    static async readById(caseId: string): Promise<ICase | null> {
        return await Case.findById(caseId).exec();
    }

    static async readAll(): Promise<ICase[]> {
        console.log('CaseRepository.readAll()');
        const cases = await Case.find().exec();
        console.log('cases:', cases);

        return cases;
    }

    static async update(caseId: string, caseData: Partial<ICase>): Promise<ICase | null> {
        return await Case.findByIdAndUpdate(caseId, caseData, { new: true }).exec();
    }

    static async delete(caseId: string): Promise<ICase | null> {
        return await Case.findByIdAndDelete(caseId).exec();
    }
}

