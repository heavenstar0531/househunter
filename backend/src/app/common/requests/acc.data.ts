import ObjectId from 'bson-objectid';
import { EnsurePermission } from '../permissions';
import { emailRegex, minFourInASequence, oneDigitRegex, oneLowercaseRegex, oneSpecialRegex, oneUppercaseRegex, Status } from '../types';

export class AccData
{
    // ------------------------------------------------------------- <<< account info
    _id?:              ObjectId;               // [id]
    username?:         string;                 // unique<string>
    password?:         string;                 // unique<hash>          # len: [8, 24], lowercase: 1+, uppercase: 1+, digit: 1+, special: 1+, max char repeat: 3
    firstname?:        string;                 // string
    lastname?:         string;                 // string
    email?:            string;                 // unique<string>
    // ------------------------------------------------------------- <<< user info
    usr_photo_id?:     null|ObjectId;          // ->file|file|null      # u objektu se uvek cuva! ->file;   ako se ne unese koristiti default sliku
    usr_addr_country?: string;                 // string|null
    usr_addr_city?:    string;                 // string|null
    // ------------------------------------------------------------- <<< acc status
    acc_type?:         string;                 // enum( 'adm', 'agn', 'usr' )
    activated_dt?:     null|Date;              // date|null
    deleted_dt?:       null|Date;              // date|null
    usr_blocked_ids?:  Array<ObjectId>;        // list< ->acc >


    // FIXME: this validation sort of works, but is not the best
    static validate( status: Status, data: null|AccData, reqfields?: {} ): void
    {
        if( !( data instanceof AccData ) ) { status.setError( "acc.err", "account not given" ); return; }
        if( reqfields )
        {
            // --------------
            if( '_id'              in reqfields && data._id              === undefined ) { status.setError( "_id.err",              "account id missing" ); return; }
            if( 'username'         in reqfields && data.username         === undefined ) status.setError( "username.err",         "username missing" );
            if( 'password'         in reqfields && data.password         === undefined ) status.setError( "password.err",         "password missing" );
            if( 'firstname'        in reqfields && data.firstname        === undefined ) status.setError( "firstname.err",        "firstname missing" );
            if( 'lastname'         in reqfields && data.lastname         === undefined ) status.setError( "lastname.err",         "lastname missing" );
            if( 'email'            in reqfields && data.email            === undefined ) status.setError( "email.err",            "email missing" );
            // --------------
            if( 'usr_photo_id'     in reqfields && data.usr_photo_id     === undefined ) status.setError( "usr_photo_id.err",     "photo missing" );
            if( 'usr_addr_country' in reqfields && data.usr_addr_country === undefined ) status.setError( "usr_addr_country.err", "country missing" );
            if( 'usr_addr_city'    in reqfields && data.usr_addr_city    === undefined ) status.setError( "usr_addr_city.err",    "city missing" );
            // --------------
            if( 'acc_type'         in reqfields && data.acc_type         === undefined ) status.setError( "acc_type.err",         "account type missing" );
            if( 'activated_dt'     in reqfields && data.activated_dt     === undefined ) status.setError( "activated_dt.err",     "activation date missing" );
            if( 'deleted_dt'       in reqfields && data.deleted_dt       === undefined ) status.setError( "deleted_dt.err",       "deletion date missing" );
            if( 'usr_blocked_ids'  in reqfields && data.usr_blocked_ids  === undefined ) status.setError( "usr_blocked_ids.err",  "blocked user list missing" );
        }
        // ------------------------------------------------------------- <<< account info
        if( data._id       !== undefined && !data._id              ) { status.setError( "_id.err",       "account id missing" ); return; }
        if( data.username  !== undefined && !data.username?.length ) status.setError( "username.err",  "username missing" );
        if( data.password  !== undefined )
        {
            if     ( !data.password?.length                   ) status.setError( "password.err",  "password missing" );
            else if( data.password.length < 8                 ) status.setError( "password.err",  "password too short" );
            else if( data.password.length > 24                ) status.setError( "password.err",  "password too long" );
            else if( !oneUppercaseRegex.test( data.password ) ) status.setError( "password.err",  "password missing uppercase letter" );
            else if( !oneLowercaseRegex.test( data.password ) ) status.setError( "password.err",  "password missing lowercase letter" );
            else if( !oneDigitRegex    .test( data.password ) ) status.setError( "password.err",  "password missing digit" );
            else if( !oneSpecialRegex  .test( data.password ) ) status.setError( "password.err",  "password missing special character" );
            else if( minFourInASequence.test( data.password ) ) status.setError( "password.err",  "password should not have more than three characters in a row" );
        }
        if( data.firstname !== undefined && !data.firstname?.length ) status.setError( "firstname.err", "firstname missing" );
        if( data.lastname  !== undefined && !data.lastname?.length  ) status.setError( "lastname.err",  "lastname missing" );
        if( data.email     !== undefined )
        {
            if     ( !data.email?.length            ) status.setError( "email.err", "email missing" );
            else if( !emailRegex.test( data.email ) ) status.setError( "email.err", "email not in correct format" );
        }
        // ------------------------------------------------------------- <<< user info
        if( data.usr_photo_id     !== undefined && !data.usr_photo_id             ) data.usr_photo_id = new ObjectId( /*TODO*/ );
        if( data.usr_addr_country !== undefined && !data.usr_addr_country?.length ) status.setError( "usr_addr_country.err", "country missing" );
        if( data.usr_addr_city    !== undefined && !data.usr_addr_city?.length    ) status.setError( "usr_addr_city.err",    "city missing" );
        // ------------------------------------------------------------- <<< acc status
        if( data.acc_type !== undefined && data.acc_type != "adm" && data.acc_type != "agn" && data.acc_type != "usr" ) status.setError( "acc_type.err", "invalid account type" );
        // data.activated_dt
        // data.deleted_dt
        if( data.usr_blocked_ids !== undefined )
        {
            if( !data.usr_blocked_ids ) status.setError( "usr_blocked_ids.err", "missing blocked users" );
            for( let i = 0; i < data.usr_blocked_ids.length; i++ )
            {
                let usr_blocked_id = data.usr_blocked_ids[ i ];
                if( !usr_blocked_id )
                {
                    status.setError( "usr_blocked_ids.err", "invalid blocked user list" );
                    status.setError( "usr_blocked_ids.err.+", "missing blocked user[" + i + "]'s id" );
                    break;
                }
            }
        }
    }
};

// FIXME: check if the object contains all the necessary keys
export class AccApiCall
{
    static ensureValid( acc_type: string|null, method: string|null, ...params: Array<any> ): void
    {
        EnsurePermission( acc_type, "acc", method );
        let status = new Status();

        switch( method )
        {
            // ------------------------------------------------------------- //
            // + add( acc: AccData )
            // FIXME: limit what the user can do
            case "add":
            {
                let acc = params[ 0 ] as AccData;
                AccData.validate( status, acc, {
                    // --------------
                    username:         true,
                    password:         true,
                    firstname:        true,
                    lastname:         true,
                    email:            true,
                    // --------------
                    usr_photo_id:     true,
                    usr_addr_country: true,
                    usr_addr_city:    true,
                    // --------------
                    acc_type:         true,
                    activated_dt:     true,
                    deleted_dt:       true,
                    usr_blocked_ids:  true,
                } );
                
                if( acc && acc_type == "gst" && acc.acc_type != "usr" ) status.setError( "acc_type.err", "account type mismatch" );
                break;
            }
            // + delete( acc_id: ObjectId )
            case "delete":
            // + get( acc_id: ObjectId )
            case "get":
            {
                let acc_id = params[ 0 ] as ObjectId;
                if( !( acc_id instanceof ObjectId ) ) status.setError( "acc_id.err", "account id missing" );
                break;
            }
            // + list()
            
            // ------------------------------------------------------------- //
            // + login( username: string, password: string )
            case "login":
            {
                let username = params[ 0 ] as string;
                let password = params[ 1 ] as string;
                if( !username?.length ) status.setError( "username.err", "username missing" );
                if( !password?.length ) status.setError( "password.err", "password missing" );
                break;
            }
            // + logout()
            
            // ------------------------------------------------------------- //
            // + updateInfo( acc_id: ObjectId, updated_acc: AccData )
            case "updateInfo":
            // + updateStatus( acc_id: ObjectId, updated_acc: AccData )
            case "updateStatus":
            {
                let acc_id      = params[ 0 ] as ObjectId;
                let updated_acc = params[ 1 ] as AccData;
                
                if( !( updated_acc?._id instanceof ObjectId )        ) { status.setError( "acc_id.err", "account id missing" ); break; }
                if( acc_type != "adm" && acc_id !== updated_acc?._id ) { status.setError( "message", "insufficient permissions" ); break }

                AccData.validate( status, updated_acc, {
                    // --------------
                    _id:              true,
                    username:         true,
                    password:         true,
                    firstname:        true,
                    lastname:         true,
                    email:            true,
                    // --------------
                    usr_photo_id:     true,
                    usr_addr_country: true,
                    usr_addr_city:    true,
                    // --------------
                    acc_type:         true,
                    activated_dt:     true,
                    deleted_dt:       true,
                    usr_blocked_ids:  true,
                } );

                break;
            }

            // ------------------------------------------------------------- //
            // + blockAnother( blocked_acc_id: ObjectId, is_blocked: boolean )
            case "blockAnother":
            {
                let blocked_acc_id = params[ 0 ] as ObjectId;
                let is_blocked     = params[ 1 ] as Boolean;
                if( !( blocked_acc_id instanceof ObjectId ) ) status.setError( "blocked_id.err", "blocked account id missing" );
                if( !( is_blocked     instanceof Boolean )  ) status.setError( "is_blocked.err", "new blocked status missing" );
                break;
            }
        }

        if( status.getStatus() != Status.SUCCESS ) throw status;
    }
}

