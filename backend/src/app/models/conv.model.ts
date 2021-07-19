import mongoose, { Model, mongo } from 'mongoose';
import ObjectId from 'bson-objectid';
import { ConvData, MsgData } from '../common/requests/conv.data';
import { Status } from '../common/types'
import { AgncyModel } from './agncy.model';
import { Sesh } from 'express-session';


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
 // _id:                ObjectId,          // [id]
    prop_id:            ObjectId,          // ->prop        # koristi se za naslov poruke
    owner_id:           ObjectId,          // ->acc         # (usr),agency_id
    offeror_id:         ObjectId,          // ->acc         # (usr) koji je zainteresovan za rentiranje/kupovinu
    msg_list:           [convMsgSchema],   // list< msg >
    // ------------------------------------------------------------- <<< conversation status
    owner_arch_dt:      Date,              // date|null
    owner_deleted_dt:   Date,              // date|null
    offeror_arch_dt:    Date,              // date|null
    offeror_deleted_dt: Date,              // date|null
});

export class ConvModel
{
    private model: Model<any> = mongoose.model( 'conv', convSchema, 'conv' );

    constructor(
        private session: Sesh
    ) { }

    private static getUserRole( acc_id: null|ObjectId, acc_type: string, conversation: ConvData ): string
    {
        let owner =   ( conversation.owner_id == AgncyModel.getId() && acc_type in { adm:0, agn:0 } )
                   || ( conversation.owner_id == acc_id             && acc_type == "usr" );
        let offeror = ( conversation.owner_id == acc_id             && acc_type == "usr" );

        if(  owner && !offeror ) return "owner";
        if( !owner &&  offeror ) return "offeror";
        return "invalid;"
    }

    // ------------------------------------------------------------- //
    // <all>
    // FIXME: limit what the user can do
    async add( conv: ConvData ): Promise<[ Status, ObjectId?/*conv_id*/ ]>
    {
        let status = new Status();
        
        let opres = await this.model.collection.insertOne(
            conv,
        );

        if( opres.result.ok != 1 ) return [ status.setError( "message", "could not add conversation" ) ];
        return [ status, opres.insertedId ];
    }

    // <all>
    async delete( conv_id: ObjectId ): Promise<Status>
    {
        let [ status, conversation ] = await this.get( conv_id );
        if( status.getStatus() ) return new Status().setError( "message", "could not delete conversation" );

        let user_role = ConvModel.getUserRole( this.session.acc_id ?? null, this.session.acc_type, conversation );

        if( user_role == "owner"   ) conversation.owner_deleted_dt   = new Date();
        if( user_role == "offeror" ) conversation.offeror_deleted_dt = new Date();

        let opres = await this.model.collection.updateOne(
            { _id: conv_id },
            conversation
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not delete conversation" );
        return status;
    }
    
    // <all>
    async get( conv_id: ObjectId ): Promise<[ Status, ConvData? ]>
    {
        let status = new Status();
        
        let conversation = await this.model.findOne(
            { _id: conv_id }
        ).lean().exec() as ConvData;
        
        if( !conversation ) return [ status.setError( "message", "could not get conversation" ) ];
        
        let user_role = ConvModel.getUserRole( this.session.acc_id, this.session.acc_type, conversation );
        if( user_role == "invalid" ) return [ status.setError( "message", "insufficient privileges" ) ];

        if( user_role == "owner"   && conversation.owner_deleted_dt   ) return [ status.setError( "message", "could not get conversation" ) ];
        if( user_role == "offeror" && conversation.offeror_deleted_dt ) return [ status.setError( "message", "could not get conversation" ) ];

        return [ status, conversation ];
    }
    
    // <all>: not_archived|archived
    async list( is_archived: boolean ): Promise<[ Status, Array<ConvData>? ]>
    {
        let status = new Status();

        let conversation_list = await this.model.find(
            { deleted_dt: { $eq: null } }
        ).lean().exec();

        if( !conversation_list ) return [ new Status().setError( "message", "could not list conversations" ) ];

        conversation_list = conversation_list.filter( ( conversation: ConvData ) => {
            let user_role = ConvModel.getUserRole( this.session.acc_id, this.session.acc_type, conversation );
            if( user_role == "invalid" ) return true;

            if( user_role == "owner"   && is_archived !== !!conversation.owner_arch_dt   ) return true;
            if( user_role == "offeror" && is_archived !== !!conversation.offeror_arch_dt ) return true;
        } );

        return [ status, conversation_list ];
    }


    // ------------------------------------------------------------- //
    // <all>
    async sendMessage( conv_id: ObjectId, text: string ): Promise<[ Status, MsgData? ]>
    {
        let [ status, _ ] = await this.get( conv_id );
        if( status.getStatus() ) return [ new Status().setError( "message", "could not send message" ) ];
        
        let message = new MsgData();
        message.sender_id = this.session.acc_id;
        message.text = text;
        message.sent_dt = new Date();
        message.read_dt = null;

        let opres = await this.model.collection.updateOne(
            { _id: conv_id },
            { msg_list: { $push: message } }
        );

        if( opres.result.ok != 1 ) return [ status.setError( "message", "could not send message" ) ];
        return [ status, message ];
    }

    // <all>
    async markRead( conv_id: ObjectId, last_msg_dt: Date ): Promise<Status>
    {
        let [ status, conversation ] = await this.get( conv_id );
        if( status.getStatus() ) return new Status().setError( "message", "could not get messages for given conversation" );
        for( let i = conversation.msg_list.length - 1; i > 0; i-- )
        {
            let message = conversation.msg_list[ i ];
            if( message.read_dt.valueOf() < last_msg_dt.valueOf() )
                message.read_dt = new Date( last_msg_dt );
        }

        let opres = await this.model.collection.updateOne(
            { _id: this.session.acc_id },
            conversation
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not update messages' read status" );
        return status;
    }
}

