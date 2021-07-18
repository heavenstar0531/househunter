import { Router } from 'express';
import { AgncyApiCall, AgncyData } from '../common/requests/agncy.data';
import { JsonStringifyReplacer, Status } from '../common/types';
import { AgncyModel } from '../models/agncy.model';
import { Error } from 'mongoose';

export class AgncyApi
{
    static register( router: Router ): void
    {
        // ------------------------------------------------------------- //
        // POST   async get(): Promise<[ Status, AgncyData? ]>
        router.route( '/agncy/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                AgncyApiCall.ensureValid( session.acc_type, "get" );
                
                let res = await new AgncyModel( request.session ).get();
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;

                let res = [ new Status().setError( "message", "could not get agency" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });

        // PUT   async update( updated_agncy: AgncyData ): Promise<Status>
        router.route( '/agncy/update' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let updated_agncy = request.body.updated_agncy as AgncyData;
                AgncyApiCall.ensureValid( session.acc_type, "update", updated_agncy );

                let res = await new AgncyModel( request.session ).update( updated_agncy );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;

                let res = new Status().setError( "message", "could not update agency" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });
    }
}

