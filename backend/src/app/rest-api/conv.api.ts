import { Router } from 'express';
import { Session } from '../util/types';
import ObjectId from 'bson-objectid';
import { ConvApiCall, ConvData } from '../common/requests/conv.data';
import { JsonReplacer, Status } from '../common/types';
import { ConvModel } from '../models/conv.model';
import { NativeError } from 'mongoose';

export class ConvApi
{
    static register( router: Router ): void
    {
        // ------------------------------------------------------------- //
        // POST   async add( conv: ConvData ): Promise<[ Status, ObjectId?/*conv_id*/ ]>
        router.route( '/conv/add' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let conv = request.body.conv as ConvData;
                ConvApiCall.ensureValid( session.acc_type, "add", conv );
                
                let res = await new ConvModel( request.session ).add( conv );
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not add conversation" ) ];
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
        });

        // PUT   async delete( conv_id: ObjectId ): Promise<Status>
        router.route( '/conv/delete' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let conv_id = request.body.conv_id as ObjectId;
                ConvApiCall.ensureValid( session.acc_type, "delete", conv_id );
                
                let res = await new ConvModel( request.session ).delete( conv_id );
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not delete conversation" );
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
        });

        // POST   async get( conv_id: ObjectId ): Promise<[ Status, ConvData? ]>
        router.route( '/conv/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let conv_id = request.body.conv_id as ObjectId;
                ConvApiCall.ensureValid( session.acc_type, "get", conv_id );
                
                let res = await new ConvModel( request.session ).get( conv_id );
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not get conversation" ) ];
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
        });

        // POST   async list( is_archived: boolean ): Promise<[ Status, Array<ConvData>? ]>
        router.route( '/conv/list' ).post( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let is_archived = request.body.is_archived as boolean;
                ConvApiCall.ensureValid( session.acc_type, "list", is_archived );
                
                let res = await new ConvModel( request.session ).list( is_archived );
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not list conversations" ) ];
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async sendMessage( conv_id: ObjectId, text: string ): Promise<[ Status, MsgData? ]>
        router.route( '/conv/sendMessage' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let conv_id = request.body.conv_id as ObjectId;
                let text = request.body.text as string;
                ConvApiCall.ensureValid( session.acc_type, "sendMessage", conv_id, text );
                
                let res = await new ConvModel( request.session ).sendMessage( conv_id, text );
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = [ new Status().setError( "message", "could not send message" ) ];
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
        });

        // PUT   async markRead( conv_id: ObjectId, last_msg_dt: Date ): Promise<Status>
        router.route( '/conv/markRead' ).put( async ( request, response ) => {
            try
            {
                let session = request.session as Session;
                let conv_id = request.body.conv_id as ObjectId;
                let last_msg_dt = request.body.last_msg_dt as Date;
                ConvApiCall.ensureValid( session.acc_type, "markRead", conv_id, last_msg_dt );
                
                let res = await new ConvModel( request.session ).markRead( conv_id, last_msg_dt );
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status      ) console.log( err );
                else if( err instanceof NativeError ) console.log( err );
                else                                  throw err;
                
                let res = new Status().setError( "message", "could not mark messages as read" );
                response.status( 200 ).send( JSON.stringify( res, JsonReplacer ) );
            }
        });
    }
}

