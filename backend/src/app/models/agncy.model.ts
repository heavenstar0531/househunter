import mongoose, { Model } from 'mongoose';
import ObjectId from 'bson-objectid';
import { AgncyData } from '../common/requests/agncy.data';
import { Status } from '../common/types'
import { Sesh } from 'express-session';

let agncySchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< agency info
 // _id:            ObjectId,   // [id]      # agency id, currently only one agency exists
    credit_percent: Number,     // number    # currently fixed at 20%
    rent_percent:   Number,     // number
    sale_percent:   Number,     // number
});

export class AgncyModel
{
    private model: Model<AgncyData> = mongoose.model( 'agncy', agncySchema, 'agncy' );
    constructor( 
        private session: Sesh
    ) { }

    // ------------------------------------------------------------- //

    // private method
    // FIXME: Agency Id, currently fixed
    static getId(): ObjectId { return new ObjectId( "602ed0298b05043edc647cce" ); }

    // (adm)
    async get(): Promise<[ Status, AgncyData? ]>
    {
        let status = new Status();
        
        let agency = await this.model.findOne(
            {}
        ).lean().exec();

        if( !agency ) return [ status.setError( "message", "could not get agency" ) ];
        return [ status, agency ];
    }

    // (adm)
    // FIXME: limit what the user can do
    async update( updated_agncy: AgncyData ): Promise<Status>
    {
        let status = new Status();
        
        let opres = await this.model.collection.updateOne(
            { _id: updated_agncy._id },
            updated_agncy
        );

        if( opres.result.ok != 1 ) return status.setError( "message", "could not update agency" );
        return status;
    }
}

