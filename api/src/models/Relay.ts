import mongoose, { Schema, Document } from 'mongoose';

interface IRelay extends Document {
    name: string;
    location: mongoose.Schema.Types.ObjectId;
}

const RelaySchema: Schema = new Schema({
    name: { type: String, required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }
}, {
    versionKey: false
});

const Relay = mongoose.model<IRelay>('Relay', RelaySchema, 'relays');

export { Relay, IRelay };