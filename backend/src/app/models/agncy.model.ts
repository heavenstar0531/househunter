import mongoose, { Model } from 'mongoose';
import { Session } from "../util/types";
import { MongoError, ObjectId } from 'mongodb';
import { AgncyData } from '../common/requests/agncy.data';
import { Status } from '../common/types'

let agncySchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< agency info
 // _id:            { type: ObjectId },   // [id]      # agency id, currently only one agency exists
    credit_percent: { type: Number },     // number    # currently fixed at 20%
    rent_percent:   { type: Number },     // number
    sale_percent:   { type: Number },     // number
    admn_id:        { type: ObjectId },   // ->acc
});

export class AgncyModel
{
    private model: Model<any> = mongoose.model( 'agncy', agncySchema );
    private session: Session = null;

    constructor( session: Session )
    {
        this.session = session;
    }

    // (adm)
    async get(): Promise<[ Status, AgncyData? ]>
    {
        try
        {
            AgncyData.ensureValid( this.session.acc_type, "get" );
            
            let agency = await this.model.findOne().exec() as AgncyData;
            if( !agency ) return [ new Status( "error", "Could not get agency." ) ];

            return [ new Status( "success" ), agency ];
        }
        catch( err )
        {
            if( err instanceof Status ) return [ err ];
            if( err instanceof MongoError ) return [ new Status( "error", "Could not get agency." ) ];
            throw err;
        }
    }

    // (adm)
    async update( updated_agncy: AgncyData ): Promise<Status>
    {
        try
        {
            AgncyData.ensureValid( this.session.acc_type, "update", updated_agncy );
            
            let error = await this.model.updateOne(
                { _id: updated_agncy._id },
                updated_agncy,
                { upsert: true }
            ).exec();   // upsert <=> add if not exists + update
            
            return new Status( "success" );
        }
        catch( err )
        {
            if( err instanceof Status ) return err;
            throw err;
        }
    }
}

