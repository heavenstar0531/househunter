import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

let crsGroupSchema = new mongoose.Schema({
    crs:           { type: ObjectId },   // -> crs
    department:    { type: String, enum: ['si', 'rti', 'os'] },   // enum( 'si', 'rti', 'os' )
    semester:      { type: Number },     // number
    lecturer:      { type: [ObjectId] }, // list< ->acc >
    student:       { type: ObjectId },   // -> acc_group
    tm_schoolyear: { type: Number },     // number
    tm_weekday:    { type: Number },     // number
    tm_timebeg:    { type: Date },       // time
    tm_timeend:    { type: Date },       // time
    created:       { type: Date },       // date
    deleted:       { type: Date },       // date|null
});

let crsGroupModel = mongoose.model( 'crs_group', crsGroupSchema );

export { crsGroupModel };

