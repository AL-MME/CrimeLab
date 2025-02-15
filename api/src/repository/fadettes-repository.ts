import { Fadette, IFadette } from '../models/Fadette';
import { Person } from '../models/Person';

export class FadettesRepository {

    static async create(fadetteData: Partial<IFadette>): Promise<IFadette> {
        return Fadette.create(fadetteData);
    }

    static async createByCsv(fadetteData: Partial<IFadette>): Promise<IFadette> {
        return Fadette.create(fadetteData);
    }

    static async getUserIdByPhoneNumber(phoneNumber: string): Promise<string> {
        var fadette = await Person.findOne({ phone: phoneNumber }).select('_id').exec();
        if (!fadette || !fadette._id) {
            throw new Error('Fadette not found or _id is missing');
        }
        var fadetteString = fadette._id.toString();
        return fadetteString;
    }

    static async readById(fadetteId: string): Promise<IFadette | null> {
        return await Fadette.findById(fadetteId).exec();
    }

    static async readAll(): Promise<IFadette[]> {
        return Fadette.find().exec();
    }

    static async update(fadetteId: string, fadetteData: Partial<IFadette>): Promise<IFadette | null> {
        return await Fadette.findByIdAndUpdate(fadetteId, fadetteData, { new: true }).exec();
    }

    static async delete(fadetteId: string): Promise<IFadette | null> {
        return await Fadette.findByIdAndDelete(fadetteId).exec();
    }
}