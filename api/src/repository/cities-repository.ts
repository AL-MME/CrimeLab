import { City, ICity } from '../models/City';

export class CitiesRepository {

    static async create(cityData: Partial<ICity>): Promise<ICity> {
        return City.create(cityData);
    }

    static async readById(cityId: string): Promise<ICity | null> {
        return await City.findById(cityId).exec();
    }

    static async readAll(): Promise<ICity[]> {
        return City.find().exec();
    }

    static async update(cityId: string, cityData: Partial<ICity>): Promise<ICity | null> {
        return await City.findByIdAndUpdate(cityId, cityData, { new: true }).exec();
    }

    static async delete(cityId: string): Promise<ICity | null> {
        return await City.findByIdAndDelete(cityId).exec();
    }
}
