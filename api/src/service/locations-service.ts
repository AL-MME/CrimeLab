import { ILocation } from '../models/Location';
import { LocationsRepository } from '../repository/locations-repository';
import { isObjectId } from '../core/Utils';
import { BadRequestError } from '../core/CustomError';

export class LocationsService {
    static async createLocation(locationData: Partial<ILocation>): Promise<ILocation> {
        return await LocationsRepository.create(locationData);
    }

    static async getLocationById(locationId: string): Promise<ILocation | null> {
        if (!isObjectId(locationId)) {
            throw new BadRequestError('locationId is not a valid ObjectId');
        }
        return await LocationsRepository.readById(locationId);
    }

    static async getAllLocations(): Promise<ILocation[]> {
        return await LocationsRepository.readAll();
    }

    static async updateLocation(locationId: string, locationData: Partial<ILocation>): Promise<ILocation | null> {
        if (!isObjectId(locationId)) {
            throw new BadRequestError('locationId is not a valid ObjectId');
        }
        return await LocationsRepository.update(locationId, locationData);
    }

    static async deleteLocation(locationId: string): Promise<ILocation | null> {
        if (!isObjectId(locationId)) {
            throw new BadRequestError('locationId is not a valid ObjectId');
        }
        return await LocationsRepository.delete(locationId);
    }
}