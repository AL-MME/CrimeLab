import { RelaysRepository } from '../repository/relays-repository';
import { IRelay } from '../models/Relay';
import { isObjectId } from '../core/Utils';
import { BadRequestError } from '../core/CustomError';

export class RelaysService {
    static async createRelay(relayData: Partial<IRelay>): Promise<IRelay> {
        return await RelaysRepository.create(relayData);
    }

    static async getRelayById(relayId: string): Promise<IRelay | null> {
        if (!isObjectId(relayId)) {
            throw new BadRequestError('relayId is not a valid ObjectId');
        }
        return await RelaysRepository.readById(relayId);
    }

    static async getAllRelays(): Promise<IRelay[]> {
        return await RelaysRepository.readAll();
    }

    static async updateRelay(relayId: string, relayData: Partial<IRelay>): Promise<IRelay | null> {
        if (!isObjectId(relayId)) {
            throw new BadRequestError('relayId is not a valid ObjectId');
        }
        return await RelaysRepository.update(relayId, relayData);
    }

    static async deleteRelay(relayId: string): Promise<IRelay | null> {
        if (!isObjectId(relayId)) {
            throw new BadRequestError('relayId is not a valid ObjectId');
        }
        return await RelaysRepository.delete(relayId);
    }
}