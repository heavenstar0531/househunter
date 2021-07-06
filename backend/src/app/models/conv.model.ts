import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

let convMsgSchema = new mongoose.Schema({
 // ------------------------------------------------------------- <<< message info
 // _id:       { type: ObjectId },   // [id]
    sender_id: { type: ObjectId },   // ->acc      # (usr),agency_id
    text:      { type: String },     // string
    sent_dt:   { type: Date },       // date
    read_dt:   { type: Date },       // date|null
});

let convSchema = new mongoose.Schema({
 // ------------------------------------------------------------- <<< conversation info
 // _id:             { type: ObjectId },          // [id]
    prop_id:         { type: ObjectId },          // ->prop        # koristi se za naslov poruke
    offeror_id:      { type: ObjectId },          // ->acc         # (usr) koji je zainteresovan za rentiranje/kupovinu
    msg_list:        { type: [convMsgSchema] },   // list< msg >
 // ------------------------------------------------------------- <<< conversation status
    owner_arch_dt:   { type: Date },              // date|null
    offeror_arch_dt: { type: Date },              // date|null
    deleted_dt:      { type: Date },              // date|null
});

class convModel
{
    private model: Model<any> = mongoose.model( 'conv', convSchema );
}

export { convModel };

