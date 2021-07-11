import mongoose, { Model } from 'mongoose';
import { Session } from "../util/types";
import { ObjectId } from 'mongodb';
import { ConvData, MsgData } from '../common/requests/conv.data';
import { Status, Criteria } from '../common/types'


let convMsgSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< message info
 // _id:       ObjectId,   // [id]
    sender_id: ObjectId,   // ->acc      # (usr),agency_id
    text:      String,     // string
    sent_dt:   Date,       // date
    read_dt:   Date,       // date|null
});

let convSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< conversation info
 // _id:             ObjectId,          // [id]
    prop_id:         ObjectId,          // ->prop        # koristi se za naslov poruke
    offeror_id:      ObjectId,          // ->acc         # (usr) koji je zainteresovan za rentiranje/kupovinu
    msg_list:        [convMsgSchema],   // list< msg >
    // ------------------------------------------------------------- <<< conversation status
    owner_arch_dt:   Date,              // date|null
    offeror_arch_dt: Date,              // date|null
    deleted_dt:      Date,              // date|null
});

export class ConvModel
{
    private model: Model<any> = mongoose.model( 'conv', convSchema, 'conv' );
    private session: Session = null;

    constructor( session: Session )
    {
        this.session = session;
    }

    // <all>
    async add( conv: ConvData ): Promise<Status> {
        throw new Error('TODO');
    }

    // <all>
    async delete( conv_id: ObjectId ): Promise<Status> {
        throw new Error('TODO');
    }
    
    // <all>
    async get( conv_id: ObjectId ): Promise<[ Status, ConvData? ]> {
        throw new Error('TODO');
    }
    
    // <all>: not_archived|archived
    async list( criteria: Criteria ): Promise<[ Status, Array<ConvData>? ]> {
        throw new Error('TODO');
    }


    // <all>
    async sendMessage( conv_id: ObjectId, msg: MsgData ): Promise<[ Status, ObjectId?/*msg_id*/ ]> {
        throw new Error('TODO');
    }

    // <all>
    async markRead( conv_id: ObjectId, last_msg_dt: Date ): Promise<Status> {
        throw new Error('TODO');
    }
}

