import { Router } from 'express';
import ObjectId from 'bson-objectid';
import { ConvApiCall, ConvData } from '../common/requests/conv.data';
import { ConvModel } from '../models/conv.model';
import { RestApi } from './rest.api';

export class ConvApi
{
    static register( router: Router ): void
    {
        // ------------------------------------------------------------- //
        // POST   async add( conv: ConvData ): Promise<[ Status, ObjectId?/*conv_id*/ ]>
        router.route( '/conv/add' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let conv = request.body as ConvData;
                ConvApiCall.ensureValid( session.acc_type, "add", conv );
                
                let res = await new ConvModel( request.session ).add( conv );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not add conversation" );
            }
        });

        // PUT   async delete( conv_id: ObjectId ): Promise<Status>
        router.route( '/conv/delete' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let conv_id = request.body as ObjectId;
                ConvApiCall.ensureValid( session.acc_type, "delete", conv_id );
                
                let res = await new ConvModel( request.session ).delete( conv_id );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not delete conversation" );
            }
        });

        // POST   async get( conv_id: ObjectId ): Promise<[ Status, ConvData? ]>
        router.route( '/conv/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let conv_id = request.body as ObjectId;
                ConvApiCall.ensureValid( session.acc_type, "get", conv_id );
                
                let res = await new ConvModel( request.session ).get( conv_id );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not get conversation" );
            }
        });

        // POST   async list( is_archived: boolean ): Promise<[ Status, Array<ConvData>? ]>
        router.route( '/conv/list' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let is_archived = request.body as boolean;
                ConvApiCall.ensureValid( session.acc_type, "list", is_archived );
                
                let res = await new ConvModel( request.session ).list( is_archived );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not list conversations" );
            }
        });


        // ------------------------------------------------------------- //
        // PUT   async sendMessage( conv_id: ObjectId, text: string ): Promise<[ Status, MsgData? ]>
        router.route( '/conv/sendMessage' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let conv_id = request.body.conv_id as ObjectId;
                let text = request.body.text as string;
                ConvApiCall.ensureValid( session.acc_type, "sendMessage", conv_id, text );
                
                let res = await new ConvModel( request.session ).sendMessage( conv_id, text );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not send message" );
            }
        });

        // PUT   async markRead( conv_id: ObjectId, last_msg_dt: Date ): Promise<Status>
        router.route( '/conv/markRead' ).put( async ( request, response ) => {
            try
            {
                let session = request.session;
                let conv_id = request.body.conv_id as ObjectId;
                let last_msg_dt = request.body.last_msg_dt as Date;
                ConvApiCall.ensureValid( session.acc_type, "markRead", conv_id, last_msg_dt );
                
                let res = await new ConvModel( request.session ).markRead( conv_id, last_msg_dt );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not mark messages as read" );
            }
        });
    }
}

