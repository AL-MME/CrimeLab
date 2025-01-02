import mongoose, { Schema, Document } from 'mongoose';

interface ILocation extends Document {
    street: string;
    city: string;
    lat: number;
    lon: number;
}

const LocationSchema: Schema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
}, {
    versionKey: false
});

const Location = mongoose.model<ILocation>('Location', LocationSchema, 'locations');

export { Location, ILocation };