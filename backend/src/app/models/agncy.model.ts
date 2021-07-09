import mongoose, { Model } from 'mongoose';
import { Session } from "../util/types";
import { ObjectId } from 'mongodb';
import { AgncyData } from '../common/requests/agncy.data';
import { Status } from '../common/types'

let agncySchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< agency info
 // _id:            { type: ObjectId },   // [id]      # agency id, currently only one agency exists
    income:         { type: ObjectId },   // ->acc
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
    async get(): Promise<[ Status, AgncyData? ]> {
        let status = new Status();
        let agency = null;

        // TODO
        if( this.session.acc_type != "adm" )
        {
            status.setStatus( "error" );
            status.setMessage( "insufficient privileges" );
            return [ status ];
        }

        try
        {
            agency = await this.model.findOne() as AgncyData;
            status.setStatus( "error" );
            return [ status, agency ];
        }
        catch( err )
        {
            status.set( "status", "error" );
            status.set( "errmsg", "could not find agency data" );
            return [ status ];
        }
    }

    // (adm)
    async update( updated_agncy: AgncyData ): Promise<Status> {
        let status = new Status();
        let agency = null;

        // TODO
        if( this.session.acc_type != "adm" )
        {
            status.set( "status", "error" );
            status.set( "errmsg", "insufficient privileges" );
            return status;
        }

        try
        {
            agency = await this.model.findOne() as AgncyData;
            status.set( "status", "success" );
            return status;
        }
        catch( err )
        {
            status.set( "status", "error" );
            status.set( "errmsg", "could not update agency data" );
            return status;
        }
    }
}

