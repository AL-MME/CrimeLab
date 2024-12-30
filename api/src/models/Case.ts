import mongoose, { Schema, Document } from 'mongoose';

interface ICase extends Document {
    type: string;
    description: string;
    date: Date;
    location: mongoose.Schema.Types.ObjectId;
    suspects: mongoose.Schema.Types.ObjectId[];
    witnesses: mongoose.Schema.Types.ObjectId[];
    victims: mongoose.Schema.Types.ObjectId[];
    testimonies: mongoose.Schema.Types.ObjectId[];
}

const CaseSchema: Schema = new Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    suspects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true }],
    witnesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true }],
    victims: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true }],
    testimonies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Testimonie', required: true }]
}, {
    versionKey: false
});

const Case = mongoose.model<ICase>('Case', CaseSchema, 'cases');

export { Case, ICase };