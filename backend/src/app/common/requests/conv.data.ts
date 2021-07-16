import ObjectId from 'bson-objectid';
import { EnsurePermission } from '../permissions';
import { Status } from '../types';

export class MsgData
{
    // ------------------------------------------------------------- <<< message info
    sender_id?: ObjectId;        // ->acc      # (usr),agency_id
    text?:      string;          // string
    sent_dt?:   Date;            // date
    read_dt?:   null|Date;       // date|null

    // FIXME: this validation sort of works, but is not the best
    static validate( status: Status, data: null|MsgData, reqfields?: {} ): void
    {
        if( !( data instanceof MsgData ) ) { status.setError( "msg.err", "message not given" ); return; }
        if( reqfields )
        {
            // --------------
            if( 'sender_id' in reqfields && data.sender_id === undefined ) status.setError( "sender_id.err", "sender id missing" );
            if( 'text'      in reqfields && data.text      === undefined ) status.setError( "text.err",      "text missing" );
            if( 'sent_dt'   in reqfields && data.sent_dt   === undefined ) status.setError( "sent_dt.err",   "sent date missing" );
            if( 'read_dt'   in reqfields && data.read_dt   === undefined ) status.setError( "read_dt.err",   "read date missing" );
        }
        // ------------------------------------------------------------- <<< message info
        if( data.sender_id !== undefined && !data.sender_id    ) status.setError( "sender_id.err", "sender id missing" );
        if( data.text      !== undefined && !data.text?.length ) status.setError( "text.err",      "text missing" );
        if( data.sent_dt   !== undefined && !data.sent_dt      ) status.setError( "sent_dt.err",   "sent date missing" );
        // data.read_dt
    }
};

export class ConvData
{
    // ------------------------------------------------------------- <<< conversation info
    _id?:                ObjectId;         // [id]
    prop_id?:            ObjectId;         // ->prop        # koristi se za naslov poruke
    owner_id?:           ObjectId;         // ->acc         # (usr),agncy_id
    offeror_id?:         ObjectId;         // ->acc         # (usr) koji je zainteresovan za rentiranje/kupovinu
    msg_list?:           Array<MsgData>;   // list< msg >
    // ------------------------------------------------------------- <<< conversation status
    owner_arch_dt?:      null|Date;        // date|null
    owner_deleted_dt?:   null|Date;        // date|null
    offeror_arch_dt?:    null|Date;        // date|null
    offeror_deleted_dt?: null|Date;        // date|null


    // FIXME: this validation sort of works, but is not the best
    static validate( status: Status, data: null|ConvData, reqfields?: {} ): void
    {
        if( !( data instanceof ConvData ) ) { status.setError( "conv.err", "conversation not given" ); return; }
        if( reqfields )
        {
            // --------------
            if( '_id'                in reqfields && data._id                === undefined ) status.setError( "_id.err",                "conversation id missing" );
            if( 'prop_id'            in reqfields && data.prop_id            === undefined ) status.setError( "prop_id.err",            "property id missing" );
            if( 'owner_id'           in reqfields && data.owner_id           === undefined ) status.setError( "owner_id.err",           "owner id missing" );
            if( 'offeror_id'         in reqfields && data.offeror_id         === undefined ) status.setError( "offeror_id.err",         "offeror id missing" );
            if( 'msg_list'           in reqfields && data.msg_list           === undefined ) status.setError( "msg_list.err",           "message list missing" );
            // --------------
            if( 'owner_arch_dt'      in reqfields && data.owner_arch_dt      === undefined ) status.setError( "owner_arch_dt.err",      "owner archive date missing" );
            if( 'owner_deleted_dt'   in reqfields && data.owner_deleted_dt   === undefined ) status.setError( "owner_deleted_dt.err",   "owner delete date missing" );
            if( 'offeror_arch_dt'    in reqfields && data.offeror_arch_dt    === undefined ) status.setError( "offeror_arch_dt.err",    "offeror archive date missing" );
            if( 'offeror_deleted_dt' in reqfields && data.offeror_deleted_dt === undefined ) status.setError( "offeror_deleted_dt.err", "offeror delete date missing" );
        }
        // ------------------------------------------------------------- <<< conversation info
        if( data._id        !== undefined && !data._id        ) status.setError( "_id.err",        "conversation id missing" );
        if( data.prop_id    !== undefined && !data.prop_id    ) status.setError( "prop_id.err",    "property id missing" );
        if( data.owner_id   !== undefined && !data.owner_id   ) status.setError( "owner_id.err",   "owner id missing" );
        if( data.offeror_id !== undefined && !data.offeror_id ) status.setError( "offeror_id.err", "offeror id missing" );

        if( data.msg_list !== undefined )
        {
            if( !data.msg_list ) status.setError( "msg_list.err", "message list missing" );
            else for( let i = 0; i < data.msg_list.length; i++ )
            {
                let msg = data.msg_list[ i ];
                let msg_status = new Status();
                MsgData.validate( msg_status, msg, {
                    sender_id: true,
                    text:      true,
                    sent_dt:   true,
                    read_dt:   true,
                } );
                if( msg_status.getStatus() != Status.SUCCESS )
                {
                    status    .setError( "msg_list.err",   "invalid message list" );
                    msg_status.setError( "msg_list.err.+", { idx: i, status: msg_status } );
                    break;
                }
            }
        }
        // ------------------------------------------------------------- <<< conversation status
        // data.owner_arch_dt
        // data.owner_deleted_dt
        // data.offeror_arch_dt
        // data.offeror_deleted_dt
    }
};

// FIXME: check if the object contains all the necessary keys
export class ConvApiCall
{
    static ensureValid( acc_type: string|null, method: string|null, ...params: Array<any> ): void
    {
        EnsurePermission( acc_type, "conv", method );
        let status = new Status();

        switch( method )
        {
            // ------------------------------------------------------------- //
            // + add( conv: ConvData )
            case "add":
            {
                let conv = params[ 0 ] as ConvData;
                ConvData.validate( status, conv, {
                    // --------------
                    prop_id:            true,
                    owner_id:           true,
                    offeror_id:         true,
                    msg_list:           true,
                    // --------------
                    owner_arch_dt:      true,
                    owner_deleted_dt:   true,
                    offeror_arch_dt:    true,
                    offeror_deleted_dt: true,
                } );
                
                break;
            }
            // + delete( conv_id: ObjectId )
            case "delete":
            // + get( conv_id: ObjectId )
            case "get":
            {
                let conv_id = params[ 0 ] as ObjectId;
                if( !( conv_id instanceof ObjectId ) ) status.setError( "conv_id.err", "conversation id missing" );
                break;
            }
            // + list( is_archived: boolean )
            case "list":
            {
                let is_archived = params[ 0 ] as Boolean;
                if( !( is_archived instanceof Boolean ) ) status.setError( "is_archived.err", "conversation switch 'is archived' missing" );
                break;
            }

            // ------------------------------------------------------------- //
            // + sendMessage( conv_id: ObjectId, sender_id: ObjectId, text: string )
            case "sendMessage":
            {
                let conv_id   = params[ 0 ] as ObjectId;
                let text      = params[ 1 ] as String;

                if( !( conv_id   instanceof ObjectId ) ) status.setError( "conv_id.err",   "conversation id missing" );
                if( !( text      instanceof String )   ) status.setError( "text.err",      "message text missing" );
                break;
            }
            // + listMessages( conv_id: ObjectId )
            case "listMessages":
            {
                let conv_id = params[ 0 ] as ObjectId;
                if( !( conv_id instanceof ObjectId ) ) status.setError( "conv_id.err", "conversation id missing" );
                break;
            }
            // + markRead( conv_id: ObjectId, last_msg_dt: Date )
            case "markRead":
            {
                let conv_id     = params[ 0 ] as ObjectId;
                let last_msg_dt = params[ 1 ] as Date;

                if( !( conv_id     instanceof ObjectId ) ) status.setError( "conv_id.err",     "conversation id missing" );
                if( !( last_msg_dt instanceof Date )     ) status.setError( "last_msg_dt.err", "last message date missing" );
                break;
            }

        }

        if( status.getStatus() != Status.SUCCESS ) throw status;
    }
}

