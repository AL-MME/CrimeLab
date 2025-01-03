import mongoose, { Schema, Document } from 'mongoose';

interface ITestimonie extends Document {
    case: string;
    person: string;
    description: string;
    date: Date;
}

const TestimonieSchema: Schema = new Schema({
    case: { type: String, required: true },
    person: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
}, {
    versionKey: false
});

const Testimonie = mongoose.model<ITestimonie>('Testimonie', TestimonieSchema, 'testimonies');

export { Testimonie, ITestimonie };