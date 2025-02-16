import { PersonsRepository } from '../repository/persons-repository';
import { IPerson } from '../models/Person';
import { isObjectId } from '../core/Utils';
import { BadRequestError } from '../core/CustomError';
import {ITestimonie, Testimonie} from "../models/Testimonie";

export class PersonsService {
    static async createPerson(caseData: Partial<IPerson>): Promise<IPerson> {
        return await PersonsRepository.create(caseData);
    }

    static async getPersonById(personId: string): Promise<IPerson | null> {
        if (!isObjectId(personId)) {
            throw new BadRequestError('personId is not a valid ObjectId');
        }
        return await PersonsRepository.readById(personId);
    }

    static async getAllPersons(): Promise<IPerson[]> {
        return await PersonsRepository.readAll();
    }

    static async updatePerson(personId: string, personData: Partial<IPerson>): Promise<IPerson | null> {
        if (!isObjectId(personId)) {
            throw new BadRequestError('personId is not a valid ObjectId');
        }
        return await PersonsRepository.update(personId, personData);
    }

    static async deletePerson(personId: string): Promise<IPerson | null> {
        if (!isObjectId(personId)) {
            throw new BadRequestError('personId is not a valid ObjectId');
        }
        return await PersonsRepository.delete(personId);
    }

    static async getPeronsByIds(personId: string): Promise<IPerson | null> {
        return await PersonsRepository.getPeronsByIds(personId);
    }
}
