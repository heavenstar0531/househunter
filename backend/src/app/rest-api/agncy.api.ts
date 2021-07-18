import { Router } from 'express';
import { AgncyApiCall, AgncyData } from '../common/requests/agncy.data';
import { AgncyModel } from '../models/agncy.model';
import { RestApi } from './rest.api';

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
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not get agency" );
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
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not update agency" );
            }
        });
    }
}

