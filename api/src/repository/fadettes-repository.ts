import { Fadette, IFadette} from '../models/Fadette';

export class FadettesRepository {

        static async create(fadetteData: Partial<IFadette>): Promise<IFadette> {
            return Fadette.create(fadetteData);
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