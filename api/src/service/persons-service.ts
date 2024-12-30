import { PersonsRepository } from '../repository/persons-repository';
import { IPerson, Person } from '../models/Person';

export class PersonsService {
    static async createPerson(caseData: Partial<IPerson>): Promise<IPerson> {
        return await PersonsRepository.create(caseData);
    }

    static async getPersonById(caseId: string): Promise<IPerson | null> {
        return await PersonsRepository.readById(caseId);
    }

    static async getAllPersons(): Promise<IPerson[]> {
        return await PersonsRepository.readAll();
    }

    static async updatePerson(caseId: string, caseData: Partial<IPerson>): Promise<IPerson | null> {
        return await PersonsRepository.update(caseId, caseData);
    }

    static async deletePerson(caseId: string): Promise<IPerson | null> {
        return await PersonsRepository.delete(caseId);
    }
}
