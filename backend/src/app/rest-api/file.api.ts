import { Router } from 'express';
import { Grid } from 'gridfs-stream';
import ObjectId from 'bson-objectid';
import { FileApiCall, FileData } from '../common/requests/file.data';
import { FileModel } from '../models/file.model';
import { RestApi } from './rest.api';

export class FileApi
{
    static register( router: Router, gfs: Grid ): void
    {
        // ------------------------------------------------------------- //
        // POST   async add( file: FileData ): Promise<[ Status, ObjectId?/*file_id*/ ]>
        router.route( '/file/add' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let file = Object.assign( new FileData(), request.body.file );
                FileApiCall.ensureValid( session.acc_type, "add", file );
    
                let res = await new FileModel( request.session, gfs ).add( file );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not add file" );
            }
        });

        // POST   async get( file_id: ObjectId ): Promise<[ Status, FileData? ]>
        router.route( '/file/get' ).post( async ( request, response ) => {
            try
            {
                let session = request.session;
                let file_id = Object.assign( new ObjectId(), request.body.file_id );
                FileApiCall.ensureValid( session.acc_type, "get", file_id );
                
                let res = await new FileModel( request.session, gfs ).get( file_id );
                RestApi.sendJsonResponse( response, 200, res );
            }
            catch( err )
            {
                RestApi.sendJsonErrorResponse( response, 200, err, "could not get file" );
            }
        });

        // GET   async get( file_id: ObjectId ): Promise<[ File ]>
        router.route( '/file/get/:file_id' ).get( async ( request, response ) => {
            try
            {
                let session = request.session;
                let file_id = ObjectId.createFromHexString( request.params.file_id );
                FileApiCall.ensureValid( session.acc_type, "get", file_id );
                
                let [ status, file ] = await new FileModel( request.session, gfs ).get( file_id );
                RestApi.sendFileResponse( response, status, file );
            }
            catch( err )
            {
                RestApi.sendFileErrorResponse( response, err );
            }
        });
    }
}

