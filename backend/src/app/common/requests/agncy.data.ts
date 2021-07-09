import ObjectId from 'bson-objectid';
import { EnsurePermission } from '../permissions';
import { Status } from '../types';

export class AgncyData
{
    // ------------------------------------------------------------- <<< agency info
    _id?:            null|ObjectId = null;   // [id]      # agency id, currently only one agency exists
    credit_percent?: null|number = null;     // number    # currently fixed at 20%
    rent_percent?:   null|number = null;     // number
    sale_percent?:   null|number = null;     // number
    admn_id?:        null|ObjectId = null;   // ->acc


    static ensureValid( acc_type: string, method: string, data?: AgncyData ): void
    {
        EnsurePermission( acc_type, "agncy", method );
        let status = new Status();

        if( data )
        {
            if( !data["_id"] ) status.set( "_id_err", "id missing" );
            if( data["credit_percent"] && ( data.credit_percent < 0 || data.credit_percent > 100 ) ) status.set( "credit_percent_err", "credit percentage not in range [0., 100.]" );
            if( data["rent_percent"]   && ( data.rent_percent   < 0 || data.rent_percent   > 100 ) ) status.set( "rent_percent_err",   "rent percentage not in range [0., 100.]" );
            if( data["sale_percent"]   && ( data.sale_percent   < 0 || data.sale_percent   > 100 ) ) status.set( "sale_percent_err",   "sale percentage not in range [0., 100.]" );
        }

        switch( method )
        {
            case "get":
            {
                // no user-given data to validate
                break;
            }
            case "update":
            {
                if( !data ) throw new Status( "error", "Data not given." );
                if( !data["credit_percent"] ) status.set( "credit_percent_err", "credit percentage missing" );
                if( !data["rent_percent"] ) status.set( "rent_percent_err", "rent percentage missing" );
                if( !data["sale_percent"] ) status.set( "sale_percent_err", "sale percentage missing" );
                
                break;
            }
        }

        if( status.getStatus() != "" ) throw status;
    }
};

