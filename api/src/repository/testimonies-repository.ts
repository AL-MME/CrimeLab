import { Testimonie, ITestimonie } from '../models/Testimonie';

export class TestimoniesRepository {

    static async create(testimonieData: Partial<ITestimonie>): Promise<ITestimonie> {
        return Testimonie.create(testimonieData);
    }

    static async readById(testimonieId: string): Promise<ITestimonie | null> {
        return await Testimonie.findById(testimonieId).exec();
    }

    static async readAll(): Promise<ITestimonie[]> {
        return Testimonie.find().exec();
    }

    static async update(testimonieId: string, testimonieData: Partial<ITestimonie>): Promise<ITestimonie | null> {
        return await Testimonie.findByIdAndUpdate(testimonieId, testimonieData, { new: true }).exec();
    }

    static async delete(testimonieId: string): Promise<ITestimonie | null> {
        return await Testimonie.findByIdAndDelete(testimonieId).exec();
    }

    static async readAllWithNoCase(): Promise<ITestimonie[]> {
        try {
            return await Testimonie.find({case: { $eq: null }}).exec();
        } catch (error) {
            throw new Error('Failed to retrieve testimonies without case');
        }
    }
}