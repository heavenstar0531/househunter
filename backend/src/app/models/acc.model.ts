import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

let accSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< account info
 // _id:              { type: ObjectId },     // [id]
    username:         { type: String },       // unique<string>
    password:         { type: String },       // unique<hash>
    firstname:        { type: String },       // string
    lastname:         { type: String },       // string
    email:            { type: String },       // unique<string>
    // ------------------------------------------------------------- <<< user info
    usr_photo_id:     { type: ObjectId },     // ->file|buffer< binary >|null      # u objektu se uvek cuva! ->file;   ako se ne unese koristiti default sliku
    usr_addr_country: { type: String },       // string|null
    usr_addr_city:    { type: String },       // string|null
    // ------------------------------------------------------------- <<< acc status
    acc_type:         { type: String, enum: ['adm', 'agn', 'usr'] },   // enum( 'adm', 'agn', 'usr' )
    activated_dt:     { type: Date },         // date|null
    deleted_dt:       { type: Date },         // date|null
    usr_blocked_ids:  { type: [ObjectId] },   // list< ->acc >|null
});

export class AccModel
{
    private model: Model<any> = mongoose.model( 'acc', accSchema );
}

