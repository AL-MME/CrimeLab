import { TestimoniesRepository } from '../repository/testimonies-repository';
import { ITestimonie } from '../models/Testimonie';
import { isObjectId } from '../core/Utils';
import { BadRequestError } from '../core/CustomError';

export class TestimoniesService {
    static async createTestimonie(testimonieData: Partial<ITestimonie>): Promise<ITestimonie> {
        return await TestimoniesRepository.create(testimonieData);
    }

    static async getTestimonieById(testimonieId: string): Promise<ITestimonie | null> {
        if (!isObjectId(testimonieId)) {
            throw new BadRequestError('testimonieId is not a valid ObjectId');
        }
        return await TestimoniesRepository.readById(testimonieId);
    }

    static async getAllTestimonies(): Promise<ITestimonie[]> {
        return await TestimoniesRepository.readAll();
    }

    static async updateTestimonie(testimonieId: string, testimonieData: Partial<ITestimonie>): Promise<ITestimonie | null> {
        if (!isObjectId(testimonieId)) {
            throw new BadRequestError('testimonieId is not a valid ObjectId');
        }
        return await TestimoniesRepository.update(testimonieId, testimonieData);
    }

    static async deleteTestimonie(testimonieId: string): Promise<ITestimonie | null> {
        if (!isObjectId(testimonieId)) {
            throw new BadRequestError('testimonieId is not a valid ObjectId');
        }
        return await TestimoniesRepository.delete(testimonieId);
    }

    static async getTestimoniesWithoutCase(): Promise<ITestimonie[]> {
        return await TestimoniesRepository.readAllWithNoCase();
    }
}