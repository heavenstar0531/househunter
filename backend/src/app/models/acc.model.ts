import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

let accSchema = new mongoose.Schema({
    username:       { type: String },   // unique<string>
    password:       { type: String },   // unique<hash>
    firstname:      { type: String },   // string
    lastname:       { type: String },   // string
    telephone:      { type: String },   // string|null
    address:        { type: String },   // string|null
    acc_type:       { type: String, enum: [ 'adm', 'em', 'st' ] },   // enum( 'adm', 'em', 'st' ) + usr
    created:        { type: Date },     // date|null
    active:         { type: Date },     // date|null
    deleted:        { type: Date },     // date|null
    // ### employee ###
    em_title:       { type: ObjectId }, // -> acc_em_title|null
    em_biography:   { type: String },   // string
    em_photo:       { type: ObjectId }, // -> file|null
    em_website_url: { type: String },   // string|null
    em_cabinet:     { type: String },   // string|null
    // ### student ###
    st_index:       { type: String },   // string|null
    st_semester:    { type: Number },   // number|null
});

let accModel = mongoose.model( 'acc', accSchema );

export { accModel };

