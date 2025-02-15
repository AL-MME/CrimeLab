import mongoose, { Schema, Document } from 'mongoose';

interface IPerson extends Document {
    firstname: string;
    lastname: string;
    age: number;
    location: string;
    call_history: string[];
    phone: string;
}

const PersonSchema: Schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    call_history: { type: [String], default: [], required: false },
    phone: { type: String, required: true }
}, {
    versionKey: false
});

const Person = mongoose.model<IPerson>('Person', PersonSchema, 'persons');

export { Person, IPerson };