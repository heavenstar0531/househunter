import mongoose, { Model } from 'mongoose';
import ObjectId from 'bson-objectid';
import { AccData } from '../common/requests/acc.data';
import { Status } from '../common/types'
import { Sesh } from 'express-session';

let accSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< account info
 // _id:              ObjectId,     // [id]
    username:         { type: String, unique: true },   // unique<string>
    password:         String,       // unique<hash>          # len: [8, 24], lowercase: 1+, uppercase: 1+, digit: 1+, special: 1+, max char repeat: 3
    firstname:        String,       // string
    lastname:         String,       // string
    email:            { type: String, unique: true },   // unique<string>
    // ------------------------------------------------------------- <<< user info
    usr_photo_id:     ObjectId,     // ->file|file|null      # u objektu se uvek cuva! ->file;   ako se ne unese koristiti default sliku
    usr_addr_country: String,       // string|null
    usr_addr_city:    String,       // string|null
    // ------------------------------------------------------------- <<< acc status
    acc_type:         { type: String, enum: ['adm', 'agn', 'usr'] },   // enum( 'adm', 'agn', 'usr' )
    activated_dt:     Date,         // date|null
    deleted_dt:       Date,         // date|null
    usr_blocked_ids:  [ObjectId],   // list< ->acc >|null
});

export class AccModel
{
    private model: Model<any> = mongoose.model( 'acc', accSchema, 'acc' );
    constructor(
        private session: Sesh
    ) { }

    // ------------------------------------------------------------- //
    // <gst>,(adm)
    // FIXME: limit what the user can do
    async add( acc: AccData ): Promise<[ Status, ObjectId?/*acc_id*/ ]>
    {
        let status = new Status();
        
        let opres = await this.model.collection.insertOne(
            acc,
        );

        if( opres.result.ok != 1 ) return [ status.setError( "message", "could not add account" ) ];
        return [ status, opres.insertedId ];
    }
    
    // (adm)
    // FIXME: log out the user
    async delete( acc_id: ObjectId ): Promise<Status>
    {
        let status = new Status();
        
        let opres = await this.model.collection.updateOne(
            { _id: acc_id, deleted_dt: null },
            { deleted_dt: { $set: new Date() } }
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not delete account" );
        return status;
    }

    // (adm)
    async get( acc_id: ObjectId ): Promise<[ Status, AccData? ]>
    {
        let status = new Status();
        
        let account = await this.model.findOne(
            { _id: acc_id, deleted_dt: null }
        ).lean().exec();

        if( !account ) return [ status.setError( "message", "could not get account" ) ];
        return [ status, account ];
    }

    // (adm): <everything>
    async list(): Promise<[ Status, Array<AccData>? ]>
    {
        let status = new Status();
        
        let account_list = await this.model.find(
            { deleted_dt: null }
        ).lean().exec();

        if( !account_list ) return [ status.setError( "message", "could not list accounts" ) ];
        return [ status, account_list ];
    }
    

    // ------------------------------------------------------------- //
    // <all> initializes a server session
    async login( username: string, password: string ): Promise<[ Status, AccData? ]>
    {
        if( this.session.acc_id ) return [ new Status().setError( "message", "user already logged in" ) ];
        let status = new Status();
        
        let account = await this.model.findOne(
            { username: username, deleted_dt: null }
        ).lean().exec() as AccData;

        if( !account ) return [ status.setError( "username.err", "username invalid" ) ];
        if( password != account.password ) return [ status.setError( "password.err", "password invalid" ) ];

        this.session.acc_id          = account._id as ObjectId;
        this.session.acc_type        = account.acc_type;
        this.session.viewed_prop_map = new Map<ObjectId, boolean>();
        
        return [ status, account ];
    }

    // <all> current user is stored in session
    async logout(): Promise<Status>
    {
        this.session.destroy( () => {} );
        return new Status();
    }
    

    // ------------------------------------------------------------- //
    // <all>
    // FIXME: limit what the user can do
    async updateInfo( updated_acc: AccData ): Promise<Status>
    {
        let status = new Status();
        
        let opres = await this.model.collection.updateOne(
            { _id: updated_acc._id, deleted_dt: null },
            updated_acc
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not update account info" );
        return status;
    }

    // (adm)
    // FIXME: limit what the user can do
    async updateStatus( updated_acc: AccData ): Promise<Status>
    {
        let status = new Status();
        
        let opres = await this.model.collection.updateOne(
            { _id: updated_acc._id, deleted_dt: null },
            updated_acc
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not update account status" );
        return status;
    }
    

    // ------------------------------------------------------------- //
    // <all> current user is stored in session
    // FIXME: prevent the user from blocking nonexistent/deleted users
    async blockAnother( blocked_acc_id: ObjectId, is_blocked: boolean ): Promise<Status>
    {
        let status = new Status();
        
        let operation: any = ( is_blocked ) ? { $addToSet: blocked_acc_id } : { $pop: blocked_acc_id };

        let opres = await this.model.collection.updateOne(
            { _id: this.session.acc_id },
            { user_blocked_ids: operation }
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not " + ( is_blocked ? "block" : "unblock" ) + " another account" );
        return status;
    }
}

