import { Location, ILocation } from '../models/Location';

export class LocationsRepository {
    static async create(locationData: Partial<ILocation>): Promise<ILocation> {
        return await Location.create(locationData);
    }

    static async readById(locationId: string): Promise<ILocation | null> {
        return await Location.findById(locationId).exec();
    }

    static async readAll(): Promise<ILocation[]> {
        return await Location.find().exec();
    }

    static async update(locationId: string, locationData: Partial<ILocation>): Promise<ILocation | null> {
        return await Location.findByIdAndUpdate(locationId, locationData, { new: true }).exec();
    }

    static async delete(locationId: string): Promise<ILocation | null> {
        return await Location.findByIdAndDelete(locationId).exec();
    }
}