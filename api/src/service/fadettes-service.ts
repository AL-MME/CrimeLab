import { FadettesRepository } from '../repository/fadettes-repository';
import { IFadette } from '../models/Fadette';
import { isObjectId } from '../core/Utils';
import { BadRequestError } from '../core/CustomError';

export class FadettesService {
    static async createFadette(fadetteData: Partial<IFadette>): Promise<IFadette> {
        return await FadettesRepository.create(fadetteData);
    }

    static async createFadettesFromCsv(fadetteData: Partial<IFadette>[]) {
        for (var fadette of fadetteData) {
            fadette.caller = await FadettesRepository.getUserIdByPhoneNumber(fadette.caller ?? '');
            fadette.receiver = await FadettesRepository.getUserIdByPhoneNumber(fadette.receiver ?? "");
            await FadettesRepository.create(fadette);
        }
        return;
    }

    static async getFadetteById(fadetteId: string): Promise<IFadette | null> {
        if (!isObjectId(fadetteId)) {
            throw new BadRequestError('fadetteId is not a valid ObjectId');
        }
        return await FadettesRepository.readById(fadetteId);
    }

    static async getAllFadettes(): Promise<IFadette[]> {
        return await FadettesRepository.readAll();
    }

    static async updateFadette(fadetteId: string, fadetteData: Partial<IFadette>): Promise<IFadette | null> {
        if (!isObjectId(fadetteId)) {
            throw new BadRequestError('fadetteId is not a valid ObjectId');
        }
        return await FadettesRepository.update(fadetteId, fadetteData);
    }

    static async deleteFadette(fadetteId: string): Promise<IFadette | null> {
        if (!isObjectId(fadetteId)) {
            throw new BadRequestError('fadetteId is not a valid ObjectId');
        }
        return await FadettesRepository.delete(fadetteId);
    }
}