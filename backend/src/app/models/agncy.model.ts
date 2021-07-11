import mongoose, { Model } from 'mongoose';
import { Session } from "../util/types";
import { MongoError, ObjectId } from 'mongodb';
import { AgncyData } from '../common/requests/agncy.data';
import { Status } from '../common/types'

let agncySchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< agency info
 // _id:            ObjectId,   // [id]      # agency id, currently only one agency exists
    credit_percent: Number,     // number    # currently fixed at 20%
    rent_percent:   Number,     // number
    sale_percent:   Number,     // number
    admn_id:        ObjectId,   // ->acc
});

export class AgncyModel
{
    private model: Model<AgncyData> = mongoose.model( 'agncy', agncySchema, 'agncy' );
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
            let status = new Status();
            
            let agency = await this.model.findOne().lean().exec();
            if( !agency ) return [ status.setError( "message", "Could not get agency." ) ];

            return [ status, agency ];
        }
        catch( err )
        {
            if( err instanceof Status ) return [ err ];
            if( err instanceof MongoError ) return [ new Status().setError( "message", "Could not get agency." ) ];
            throw err;
        }
    }

    // (adm)
    async update( updated_agncy: AgncyData ): Promise<Status>
    {
        try
        {
            AgncyData.ensureValid( this.session.acc_type, "update", updated_agncy );
            let status = new Status();
            
            let opres = await this.model.collection.updateOne(
                { _id: updated_agncy._id },
                updated_agncy
            );

            if( opres.result.ok != 1 ) return status.setError( "message", "Could not update agency." );
            return status;
        }
        catch( err )
        {
            if( err instanceof Status ) return err;
            if( err instanceof MongoError ) return new Status().setError( "message", "Could not update agency." );
            throw err;
        }
    }
}

