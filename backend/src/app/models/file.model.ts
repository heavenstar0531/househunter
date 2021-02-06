import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

let fileSchema = new mongoose.Schema({
    acc:      { type: ObjectId }, // -> acc
    filename: { type: String },   // string
    filetype: { type: String },   // string
    data:     { type: Buffer },   // buffer
    bytesize: { type: Number },   // number
    note:     { type: String },   // string|null
    created:  { type: Date },     // date
    deleted:  { type: Date },     // date|null
});

let fileModel = mongoose.model( 'file', fileSchema );

export { fileModel };

