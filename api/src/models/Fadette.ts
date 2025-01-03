import mongoose, { Schema, Document } from 'mongoose';

interface IFadette extends Document {
    date: Date;
    duration: number;
    caller: string;
    receiver: string;
    type: string;
    relay: string;
}

const FadetteSchema: Schema = new Schema({
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    caller: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    type: { type: String, required: true },
    relay: { type: String, required: true }
}, {
    versionKey: false
});

const Fadette = mongoose.model<IFadette>('Fadette', FadetteSchema, 'fadettes');

export { Fadette, IFadette };