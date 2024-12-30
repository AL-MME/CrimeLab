import { Model } from 'mongoose';
import { Person, IPerson } from '../models/Person';

export class PersonsRepository {

    static async create(caseData: Partial<IPerson>): Promise<IPerson> {
        return Person.create(caseData);
    }

    static async readById(caseId: string): Promise<IPerson | null> {
        return Person.findById(caseId).exec();
    }

    static async readAll(): Promise<IPerson[]> {
        return Person.find().exec();
    }

    static async update(caseId: string, caseData: Partial<IPerson>): Promise<IPerson | null> {
        return Person.findByIdAndUpdate(caseId, caseData, { new: true }).exec();
    }

    static async delete(caseId: string): Promise<IPerson | null> {
        return Person.findByIdAndDelete(caseId).exec();
    }
}

