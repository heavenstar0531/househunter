import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

let newsSchema = new mongoose.Schema({
    title:    { type: String },     // string
    text:     { type: String },     // string|null
    news_cat: { type: ObjectId },   // -> news_cat
    acc:      { type: ObjectId },   // -> acc
    scope:    { type: [ObjectId] }, // list< ->general|->crs >
    files:    { type: [ObjectId] }, // list< ->file >|null
    created:  { type: Date },       // date
    posted:   { type: Date },       // date
    expired:  { type: Date },       // date             # kada obavestenje treba da posivi
    deleted:  { type: Date },       // date|null
});

let newsModel = mongoose.model( 'news', newsSchema );

export { newsModel };

