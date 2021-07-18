import { Router } from 'express';
import { Grid } from 'gridfs-stream';
import ObjectId from 'bson-objectid';
import { FileApiCall, FileData } from '../common/requests/file.data';
import { JsonStringifyReplacer, Status } from '../common/types';
import { FileModel } from '../models/file.model';
import { Error } from 'mongoose';

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
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not add file" ) ];
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
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
                response.status( 200 ).type( "application/json" ).send( JSON.stringify( res, JsonStringifyReplacer ) );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                let res = [ new Status().setError( "message", "could not get file" ) ];
                response.status( 404 ).send( JSON.stringify( res, JsonStringifyReplacer ) );
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
                if( status.getStatus() != Status.SUCCESS || !file ) { response.status( 400 ); return; }
                
                if( file?.content_type ) response.setHeader( "Content-Type", file?.content_type );
                response.status( 200 ).type( "application/json" ).send( file.data );
            }
            catch( err )
            {
                if     ( err instanceof Status ) console.log( err );
                else if( err instanceof Error  ) console.log( err );
                else                             throw err;
                
                response.status( 404 );
            }
        });
    }
}

