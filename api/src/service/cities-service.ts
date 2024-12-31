import { CitiesRepository } from '../repository/cities-repository';
import { ICity } from '../models/City';
import { isObjectId } from '../core/Utils';
import { BadRequestError } from '../core/CustomError';

export class CitiesService {
    static async createCity(cityData: Partial<ICity>): Promise<ICity> {
        return await CitiesRepository.create(cityData);
    }

    static async getCityById(cityId: string): Promise<ICity | null> {
        if (!isObjectId(cityId)) {
            throw new BadRequestError('cityId is not a valid ObjectId');
        }
        return await CitiesRepository.readById(cityId);
    }

    static async getAllCities(): Promise<ICity[]> {
        return await CitiesRepository.readAll();
    }

    static async updateCity(cityId: string, cityData: Partial<ICity>): Promise<ICity | null> {
        if (!isObjectId(cityId)) {
            throw new BadRequestError('cityId is not a valid ObjectId');
        }
        return await CitiesRepository.update(cityId, cityData);
    }

    static async deleteCity(cityId: string): Promise<ICity | null> {
        if (!isObjectId(cityId)) {
            throw new BadRequestError('cityId is not a valid ObjectId');
        }
        return await CitiesRepository.delete(cityId);
    }
}