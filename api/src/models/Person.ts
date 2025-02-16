import mongoose, { Schema, Document } from 'mongoose';

interface IPerson extends Document {
    firstname: string;
    lastname: string;
    age: number;
    location: string;
    phone: string;
}

const PersonSchema: Schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true }
}, {
    versionKey: false
});

const Person = mongoose.model<IPerson>('Person', PersonSchema, 'persons');

export { Person, IPerson };