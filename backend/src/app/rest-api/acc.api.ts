import { Router } from 'express';
import ObjectId from 'bson-objectid';
import { AccApiCall, AccData } from '../common/requests/acc.data';
import { AccModel } from '../models/acc.model';
import { RestApi } from './rest.api';

export class AccApi
{
    static register( router: Router ): void
    {
        // ------------------------------------------------------------- //
        // PUT   async add( acc: AccData ): Promise<[ Status, ObjectId?/*acc_id*/ ]>
        router.route( '/acc/add' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let acc = request.body as AccData;
                AccApiCall.ensureValid( session.acc_type, "add", acc );
                
                let res = await new AccModel( request.session ).add( acc );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not add account" );
            }
        });

        // PUT   async delete( acc_id: ObjectId ): Promise<Status>
        router.route( '/acc/delete' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let acc_id = request.body as ObjectId;
                AccApiCall.ensureValid( session.acc_type, "delete", acc_id );
                
                let res = await new AccModel( request.session ).delete( acc_id );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not delete account" );
            }
        });
        
        // POST   async get( acc_id: ObjectId ): Promise<[ Status, AccData? ]>
        router.route( '/acc/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let acc_id = request.body as ObjectId;
                AccApiCall.ensureValid( session.acc_type, "get", acc_id );
                
                let res = await new AccModel( request.session ).get( acc_id );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not get account" );
            }
        });
        
        // POST   async list(): Promise<[ Status, Array<AccData>? ]>
        router.route( '/acc/list' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                AccApiCall.ensureValid( session.acc_type, "list" );
                
                let res = await new AccModel( request.session ).list();
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not list accounts" );
            }
        });

        
        // ------------------------------------------------------------- //
        // POST   async login( username: string, password: string ): Promise<[ Status, AccData? ]>
        router.route( '/acc/login' ).post( async ( request, response ) => {
            try
            {
                let username = request.body.username as string;
                let password = request.body.password as string;
                AccApiCall.ensureValid( "gst", "login", username, password );
                
                let res = await new AccModel( request.session ).login( username, password );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not log in" );
            }
        });
        
        // POST   async logout(): Promise<Status>
        router.route( '/acc/logout' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                AccApiCall.ensureValid( session.acc_type, "logout" );
                
                let res = await new AccModel( request.session ).logout();
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not log out" );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async updateInfo( updated_acc: AccData ): Promise<Status>
        router.route( '/acc/updateInfo' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let updated_acc = request.body as AccData;
                AccApiCall.ensureValid( session.acc_type, "updateInfo", session.acc_id, updated_acc );
                
                let res = await new AccModel( request.session ).updateInfo( updated_acc );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not update account info" );
            }
        });

        // PUT   async updateStatus( updated_acc: AccData ): Promise<Status>
        router.route( '/acc/updateStatus' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let updated_acc = request.body as AccData;
                AccApiCall.ensureValid( session.acc_type, "updateStatus", session.acc_id, updated_acc );
                
                let res = await new AccModel( request.session ).updateStatus( updated_acc );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not update account status" );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async blockAnother( blocked_acc_id: ObjectId, is_blocked: boolean ): Promise<Status>
        router.route( '/acc/blockAnother' ).put( async ( request, response ) => {
            let is_blocked = true;
            try
            {
                let session = request.session;
                let blocked_acc_id = request.body.blocked_acc_id as ObjectId;
                is_blocked = request.body.is_blocked as boolean;
                AccApiCall.ensureValid( session.acc_type, "blockAnother", blocked_acc_id, is_blocked );
                
                let res = await new AccModel( request.session ).blockAnother( blocked_acc_id, is_blocked );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not " + ( is_blocked ? "block" : "unblock" ) + " another account" );
            }
        });
    }
}

