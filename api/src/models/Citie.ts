import mongoose, { Schema, Document } from 'mongoose';

interface ICity extends Document {
    name: string;
    country: string;
    lat: number;
    lon: number;
    postal_code: string;
}

const CitySchema: Schema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    postal_code: { type: String, required: true }
});

const City = mongoose.model<ICity>('City', CitySchema);

export { City };