import { ILocation } from '../models/Location';
import { LocationsRepository } from '../repository/locations-repository';

export class LocationsService {
    static async createLocation(locationData: Partial<ILocation>): Promise<ILocation> {
        return await LocationsRepository.create(locationData);
    }

    static async getLocationById(locationId: string): Promise<ILocation | null> {
        return await LocationsRepository.readById(locationId);
    }

    static async getAllLocations(): Promise<ILocation[]> {
        return await LocationsRepository.readAll();
    }

    static async updateLocation(locationId: string, locationData: Partial<ILocation>): Promise<ILocation | null> {
        return await LocationsRepository.update(locationId, locationData);
    }

    static async deleteLocation(locationId: string): Promise<ILocation | null> {
        return await LocationsRepository.delete(locationId);
    }
}