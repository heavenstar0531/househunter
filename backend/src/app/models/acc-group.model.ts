import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

let accGroupSchema = new mongoose.Schema({
    name:    { type: String },       // string
    type:    { type: String },       // string
    acc:     { type: [ObjectId] },   // list< -> acc >
    created: { type: Date },         // date
    deleted: { type: Date },         // date|null
});

let accGroupModel = mongoose.model( 'acc_group', accGroupSchema );

export { accGroupModel };

