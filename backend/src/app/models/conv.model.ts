import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ConvData, MsgData } from '../requests/conv';
import { Status, Criteria } from '../common/types'

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

export class ConvModel
{
    private model: Model<any> = mongoose.model( 'conv', convSchema );

    // (usr)
    add( conv: ConvData ): Status {
        throw new Error('TODO');
    }
    
    // <all>
    send( conv_id: ObjectId, msg: MsgData ): [ Status, ObjectId|null/*msg_id*/ ] {
        throw new Error('TODO');
    }
    
    // <all>: not_archived|archived
    list( criteria: Criteria ): [ Status, Array<ConvData> ] {
        throw new Error('TODO');
    }
}

