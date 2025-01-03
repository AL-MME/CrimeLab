import { Relay, IRelay } from '../models/Relay';

export class RelaysRepository {

        static async create(relayData: Partial<IRelay>): Promise<IRelay> {
            return Relay.create(relayData);
        }

        static async readById(relayId: string): Promise<IRelay | null> {
            return Relay.findById(relayId).exec();
        }

        static async readAll(): Promise<IRelay[]> {
            return Relay.find().exec();
        }

        static async update(relayId: string, relayData: Partial<IRelay>): Promise<IRelay | null> {
            return Relay.findByIdAndUpdate(relayId, relayData, { new: true }).exec();
        }

        static async delete(relayId: string): Promise<IRelay | null> {
            return Relay.findByIdAndDelete(relayId).exec();
        }
}