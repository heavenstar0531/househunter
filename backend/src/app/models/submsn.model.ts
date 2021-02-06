import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

let submsnSubmtdSchema = new mongoose.Schema({
    acc:  { type: ObjectId },   // -> acc
    file: { type: ObjectId },   // -> file|null
});

let submsnTermSchema = new mongoose.Schema({
    cabinet:    { type: String },   // string
    date_beg:   { type: Date },     // date
    date_end:   { type: Date },     // date
    prsn_limit: { type: Number },   // number|null
    submtd:     { type: [submsnSubmtdSchema] }, // list< >
});

let submsnSchema = new mongoose.Schema({
    name:           { type: String }, // string
    term:           { type: [submsnTermSchema]}, // list< >
    created:        { type: Date },   // date
    readonly:       { type: Date },   // date|null
    completed:      { type: Date },   // date|null
});

let submsnModel = mongoose.model( 'submsn', submsnSchema );

export { submsnModel };

