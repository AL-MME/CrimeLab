import mongoose, { Schema, Document } from 'mongoose';

interface IPerson extends Document {
    firstname: string;
    lastname: string;
    age: number;
    location: string;
    call_history: string[];
}

const PersonSchema: Schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    call_history: { type: [String], default: [] }
});

const Person = mongoose.model<IPerson>('Person', PersonSchema);

export { Person };