import { Router } from 'express';
import { Session } from '../util/types';
import ObjectId from 'bson-objectid';
import { AccApiCall, AccData } from '../common/requests/acc.data';
import { Status } from '../common/types';
import { AccModel } from '../models/acc.model';
import { NativeError } from 'mongoose';

export class AccApi
{
    static register( router: Router ): void
    {
        // ------------------------------------------------------------- //
        // PUT   async add( acc: AccData ): Promise<[ Status, ObjectId?/*acc_id*/ ]>
        router.route( '/acc/add' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let acc = Object.assign( new AccData(), request.body.acc );
                AccApiCall.ensureValid( session.acc_type, "add", acc );
                
                let res = await new AccModel( request.session ).add( acc );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;

                let res = [ new Status().setError( "message", "could not add account" ) ];
                response.status( 200 ).json( res );
            }
        });

        // PUT   async delete( acc_id: ObjectId ): Promise<Status>
        router.route( '/acc/delete' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let acc_id = Object.assign( new ObjectId(), request.body.acc_id );
                AccApiCall.ensureValid( session.acc_type, "delete", acc_id );
                
                let res = await new AccModel( request.session ).delete( acc_id );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not delete account" );
                response.status( 200 ).json( res );
            }
        });
        
        // POST   async get( acc_id: ObjectId ): Promise<[ Status, AccData? ]>
        router.route( '/acc/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let acc_id = Object.assign( new ObjectId(), request.body.acc_id );
                AccApiCall.ensureValid( session.acc_type, "get", acc_id );
                
                let res = await new AccModel( request.session ).get( acc_id );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not get account" ) ];
                response.status( 200 ).json( res );
            }
        });
        
        // POST   async list(): Promise<[ Status, Array<AccData>? ]>
        router.route( '/acc/list' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                AccApiCall.ensureValid( session.acc_type, "list" );
                
                let res = await new AccModel( request.session ).list();
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not list accounts" ) ];
                response.status( 200 ).json( res );
            }
        });

        
        // ------------------------------------------------------------- //
        // POST   async login( username: string, password: string ): Promise<[ Status, AccData? ]>
        router.route( '/acc/login' ).post( async ( request, response ) => {
            try
            {
                let username = Object.assign( new String(), request.body.username );
                let password = Object.assign( new String(), request.body.password );
                AccApiCall.ensureValid( "gst", "login", username, password );
                
                let res = await new AccModel( request.session ).login( username, password );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not log in" ) ];
                response.status( 200 ).json( res );
            }
        });
        
        // POST   async logout(): Promise<Status>
        router.route( '/acc/logout' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                AccApiCall.ensureValid( session.acc_type, "logout" );
                
                let res = await new AccModel( request.session ).logout();
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not log out" );
                response.status( 200 ).json( res );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async updateInfo( updated_acc: AccData ): Promise<Status>
        router.route( '/acc/updateInfo' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let updated_acc = Object.assign( new AccData(), request.body.updated_acc );
                AccApiCall.ensureValid( session.acc_type, "updateInfo", session.acc_id, updated_acc );
                
                let res = await new AccModel( request.session ).updateInfo( updated_acc );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not update account info" );
                response.status( 200 ).json( res );
            }
        });

        // PUT   async updateStatus( updated_acc: AccData ): Promise<Status>
        router.route( '/acc/updateStatus' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let updated_acc = Object.assign( new AccData(), request.body.updated_acc );
                AccApiCall.ensureValid( session.acc_type, "updateStatus", session.acc_id, updated_acc );
                
                let res = await new AccModel( request.session ).updateStatus( updated_acc );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not update account status" );
                response.status( 200 ).json( res );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async blockAnother( blocked_acc_id: ObjectId, is_blocked: boolean ): Promise<Status>
        router.route( '/acc/blockAnother' ).put( async ( request, response ) => {
            let is_blocked = true;
            try
            {
                let session = request.session as Session;
                let blocked_acc_id = Object.assign( new AccData(), request.body.blocked_acc_id );
                is_blocked = Object.assign( new Boolean(), request.body.is_blocked );
                AccApiCall.ensureValid( session.acc_type, "blockAnother", blocked_acc_id, is_blocked );
                
                let res = await new AccModel( request.session ).blockAnother( blocked_acc_id, is_blocked );
                response.status( 200 ).json( res );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not " + ( is_blocked ? "block" : "unblock" ) + " another account" );
                response.status( 200 ).json( res );
            }
        });
    }
}

