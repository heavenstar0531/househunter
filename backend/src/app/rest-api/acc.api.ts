import { Router } from 'express';
import ObjectId from 'bson-objectid';
import { AccApiCall, AccData } from '../common/requests/acc.data';
import { JsonStringifyReplacer, Status } from '../common/types';
import { AccModel } from '../models/acc.model';
import { Error } from 'mongoose';

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
                let acc = request.body.acc as AccData;
                AccApiCall.ensureValid( session.acc_type, "add", acc );
                
                let res = await new AccModel( request.session ).add( acc );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;

                let res = [ new Status().setError( "message", "could not add account" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });

        // PUT   async delete( acc_id: ObjectId ): Promise<Status>
        router.route( '/acc/delete' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let acc_id = request.body.acc_id as ObjectId;
                AccApiCall.ensureValid( session.acc_type, "delete", acc_id );
                
                let res = await new AccModel( request.session ).delete( acc_id );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not delete account" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });
        
        // POST   async get( acc_id: ObjectId ): Promise<[ Status, AccData? ]>
        router.route( '/acc/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let acc_id = request.body.acc_id as ObjectId;
                AccApiCall.ensureValid( session.acc_type, "get", acc_id );
                
                let res = await new AccModel( request.session ).get( acc_id );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not get account" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });
        
        // POST   async list(): Promise<[ Status, Array<AccData>? ]>
        router.route( '/acc/list' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                AccApiCall.ensureValid( session.acc_type, "list" );
                
                let res = await new AccModel( request.session ).list();
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not list accounts" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
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
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not log in" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });
        
        // POST   async logout(): Promise<Status>
        router.route( '/acc/logout' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                AccApiCall.ensureValid( session.acc_type, "logout" );
                
                let res = await new AccModel( request.session ).logout();
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not log out" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async updateInfo( updated_acc: AccData ): Promise<Status>
        router.route( '/acc/updateInfo' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let updated_acc = request.body.updated_acc as AccData;
                AccApiCall.ensureValid( session.acc_type, "updateInfo", session.acc_id, updated_acc );
                
                let res = await new AccModel( request.session ).updateInfo( updated_acc );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not update account info" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });

        // PUT   async updateStatus( updated_acc: AccData ): Promise<Status>
        router.route( '/acc/updateStatus' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let updated_acc = request.body.updated_acc as AccData;
                AccApiCall.ensureValid( session.acc_type, "updateStatus", session.acc_id, updated_acc );
                
                let res = await new AccModel( request.session ).updateStatus( updated_acc );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not update account status" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
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
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = new Status().setError( "message", "could not " + ( is_blocked ? "block" : "unblock" ) + " another account" );
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
        });
    }
}

