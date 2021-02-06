import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

let crsPlanSchema = new mongoose.Schema({
    department: { type: String, enum: ['si', 'rti', 'os'] },   // enum( 'si', 'rti', 'os' )
    semester:   { type: Number },    // number
    optional:   { type: Boolean },   // bool
});

let crsPageSchema = new mongoose.Schema({
    type:    { type: String, enum: ['info', 'pred', 'vezbe', 'lab', 'domaci', 'proj', 'ispit'] },   // enum( 'info', 'pred', 'vezbe', 'lab', 'domaci', 'proj', 'ispit' )
    text:    { type: String },       // string|null
    files:   { type: [ObjectId] },   // list< ->file >|null
    enabled: { type: Date },         // date|null
});

let crsSchema = new mongoose.Schema({
    code:     { type: String },          // unique<string>
    name:     { type: String },          // string
    plan:     { type: [crsPlanSchema] }, // list< >
    class_hh: { type: Number },          // number
    espb:     { type: Number },          // number
    lecturer: { type: [ObjectId] },      // list< ->acc >
    goal:     { type: String },          // string
    outcome:  { type: String },          // string
    page:     { type: [crsPageSchema] }, // list< >
    created:  { type: Date },            // date
    deleted:  { type: Date },            // date|null
});

let crsModel = mongoose.model( 'crs', crsSchema );

export { crsModel };

