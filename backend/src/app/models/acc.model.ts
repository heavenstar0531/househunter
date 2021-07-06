import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { AccData } from '../requests/acc';
import { Status } from '../common/types'

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

    // <gst>,(adm)
    add( acc: AccData ): [ Status, ObjectId|null/*acc_id*/ ] {
        throw new Error('TODO');
    }
    
    // (adm)
    delete( acc_id: ObjectId ): Status {
        throw new Error('TODO');
    }

    // (adm)
    get( acc_id: ObjectId ): [ Status, AccData|null ] {
        throw new Error('TODO');
    }

    // (adm): <everything>
    list(): [ Status, Array<AccData>|null ] {
        throw new Error('TODO');
    }
    

    // <all> initializes a server session
    login( username: string, password: string ): [ Status, ObjectId|null /*acc_id*/ ] {
        throw new Error('TODO');
    }

    // <all> current user in session
    logout(): Status {
        throw new Error('TODO');
    }
    

    // <all>
    updateInfo( updated_acc: AccData ): Status {
        throw new Error('TODO');
    }

    // (adm)
    updateStatus( updated_acc: AccData ): Status {
        throw new Error('TODO');
    }
    

    // <all> current user in session
    blockAnother( blocked_acc_id: ObjectId ): Status {
        throw new Error('TODO');
    }

    // <all> current user in session
    unblockAnother( blocked_acc_id: ObjectId ): Status {
        throw new Error('TODO');
    }
}

