import { CitiesRepository } from '../repository/cities-repository';
import { ICity } from '../models/City';

export class CitiesService {
    static async createCity(cityData: Partial<ICity>): Promise<ICity> {
        return await CitiesRepository.create(cityData);
    }

    static async getCityById(cityId: string): Promise<ICity | null> {
        return await CitiesRepository.readById(cityId);
    }

    static async getAllCities(): Promise<ICity[]> {
        return await CitiesRepository.readAll();
    }

    static async updateCity(cityId: string, cityData: Partial<ICity>): Promise<ICity | null> {
        return await CitiesRepository.update(cityId, cityData);
    }

    static async deleteCity(cityId: string): Promise<ICity | null> {
        return await CitiesRepository.delete(cityId);
    }
}