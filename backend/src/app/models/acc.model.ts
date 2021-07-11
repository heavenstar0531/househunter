import mongoose, { Model } from 'mongoose';
import { Session } from "../util/types";
import { ObjectId } from 'mongodb';
import { AccData } from '../common/requests/acc.data';
import { Status } from '../common/types'

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
    private session: Session = null;

    constructor( session: Session )
    {
        this.session = session;
    }

    // <gst>,(adm)
    async add( acc: AccData ): Promise<[ Status, ObjectId?/*acc_id*/ ]> {
        throw new Error('TODO');
    }
    
    // (adm)
    async delete( acc_id: ObjectId ): Promise<Status> {
        throw new Error('TODO');
    }

    // (adm)
    async get( acc_id: ObjectId ): Promise<[ Status, AccData? ]> {
        throw new Error('TODO');
    }

    // (adm): <everything>
    async list(): Promise<[ Status, Array<AccData>? ]> {
        throw new Error('TODO');
    }
    

    // <all> initializes a server session
    async login( username: string, password: string ): Promise<[ Status, ObjectId?/*acc_id*/ ]> {
        throw new Error('TODO');
    }

    // <all> current user is stored in session
    async logout(): Promise<Status> {
        throw new Error('TODO');
    }
    

    // <all>
    async updateInfo( updated_acc: AccData ): Promise<Status> {
        throw new Error('TODO');
    }

    // (adm)
    async updateStatus( updated_acc: AccData ): Promise<Status> {
        throw new Error('TODO');
    }
    

    // <all> current user is stored in session
    async blockAnother( blocked_acc_id: ObjectId, is_blocked: boolean ): Promise<Status> {
        throw new Error('TODO');
    }
}

