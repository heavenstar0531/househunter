import ObjectId from 'bson-objectid';
import { EnsurePermission } from '../permissions';
import { Status } from '../types';

// IMPORTANT: don't add any nonstatic methods, since the json replacer and reviver view this object as POJO
export class AgncyData
{
    // ------------------------------------------------------------- <<< agency info
    _id?:            ObjectId;   // [id]      # agency id, currently only one agency exists
    credit_percent?: number;     // number    # currently fixed at 20%
    rent_percent?:   number;     // number
    sale_percent?:   number;     // number


    // FIXME: this validation sort of works, but is not the best
    static validate( status: Status, data: null|AgncyData, reqfields?: {} ): void
    {
        if( !data ) { status.setError( "agncy.err", "agency not given" ); return; }
        if( reqfields )
        {
            // --------------
            if( '_id'            in reqfields && data._id            === undefined ) { status.setError( "_id.err",            "agency id missing" ); return; }
            if( 'credit_percent' in reqfields && data.credit_percent === undefined ) status.setError( "credit_percent.err", "credit percent missing" );
            if( 'rent_percent'   in reqfields && data.rent_percent   === undefined ) status.setError( "rent_percent.err",   "rent percent missing" );
            if( 'sale_percent'   in reqfields && data._id            === undefined ) status.setError( "sale_percent.err",   "sale percent missing" );
        }
        // ------------------------------------------------------------- <<< agency info
        if( data._id            !== undefined && !( data._id instanceof ObjectId )                                                                   ) { status.setError( "_id.err",            "agency id missing" ); return; }
        if( data.credit_percent !== undefined && ( typeof data.credit_percent !== 'number' || data.credit_percent < 0 || data.credit_percent > 100 ) ) status.setError( "credit_percent.err", "credit percent not in range [0, 100]" );
        if( data.rent_percent   !== undefined && ( typeof data.rent_percent   !== 'number' || data.rent_percent   < 0 || data.rent_percent   > 100 ) ) status.setError( "rent_percent.err",   "rent percent not in range [0, 100]" );
        if( data.sale_percent   !== undefined && ( typeof data.sale_percent   !== 'number' || data.sale_percent   < 0 || data.sale_percent   > 100 ) ) status.setError( "sale_percent.err",   "sale percent not in range [0, 100]" );
    }
};

// FIXME: check if the object contains all the necessary keys
export class AgncyApiCall
{
    static ensureValid( acc_type: string|undefined|null, method: string|undefined|null, ...params: Array<any> ): void
    {
        EnsurePermission( acc_type, "agncy", method );
        let status = new Status();

        switch( method )
        {
            // ------------------------------------------------------------- //
            // + get()
            // + update( updated_agncy: AgncyData )
            case "update":
            {
                let agncy = params[ 0 ] as AgncyData;
                AgncyData.validate( status, agncy, {
                    _id:            true,
                    credit_percent: true,
                    rent_percent:   true,
                    sale_percent:   true,
                } );
                break;
            }
        }

        if( status.getStatus() != Status.SUCCESS ) throw status;
    }

    static AgencyId(): ObjectId { return new ObjectId( "602ed0298b05043edc647cce" ); }
}

