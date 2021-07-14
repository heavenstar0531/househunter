import ObjectId from 'bson-objectid';
import { EnsurePermission } from '../permissions';
import { Status } from '../types';

export class FileMetadata
{
    // ------------------------------------------------------------- <<< file metadata
    uploader_id?: ObjectId;   // ->acc
    upload_dt?:   Date;       // date

    // FIXME: this validation sort of works, but is not the best
    static validate( status: Status, data: null|FileMetadata, reqfields?: {} ): void
    {
        if( !( data instanceof FileMetadata ) ) { status.setError( "data.err", "data not given" ); return; }
        if( reqfields )
        {
            // --------------
            if( 'uploader_id' in reqfields && data.uploader_id === undefined ) status.setError( "uploader_id.err", "uploader id missing" );
            if( 'upload_dt'   in reqfields && data.upload_dt   === undefined ) status.setError( "upload_dt.err",   "upload date missing" );
        }
        // ------------------------------------------------------------- <<< file metadata
        if( data.uploader_id !== undefined && !data.uploader_id ) status.setError( "uploader_id.err", "uploader missing" );
        if( data.upload_dt   !== undefined && !data.upload_dt   ) status.setError( "upload_dt.err",   "upload date missing" );
    }
}

export class FileData
{
    // ------------------------------------------------------------- <<< file info
    _id?:          ObjectId|string;   // [id] -- string (zbog grid filesystem-a)!!!
    content_type?: string;            // string
    metadata?:     FileMetadata;      // metadata
    // ------------------------------------------------------------- <<< file
    data?:         Buffer;            // buffer< binary >

    static validate( status: Status, data: null|FileData, reqfields?: {} ): void
    {
        if( !( data instanceof FileData ) ) { status.setError( "data.err", "data not given" ); return; }
        if( reqfields )
        {
            // --------------
            if( '_id'          in reqfields && data._id          === undefined ) status.setError( "_id.err",          "file id missing" );
            if( 'content_type' in reqfields && data.content_type === undefined ) status.setError( "content_type.err", "content type missing" );
            if( 'metadata'     in reqfields && data.metadata     === undefined ) status.setError( "metadata.err",     "metadata missing" );
            // --------------
            if( 'data'         in reqfields && data.data         === undefined ) status.setError( "data.err",         "data missing" );
        }
        // ------------------------------------------------------------- <<< file metadata
        if( data._id !== undefined )
        {
            if( !data._id                         ) status.setError( "_id.err", "file id missing" );
            if( !( data._id instanceof ObjectId ) ) status.setError( "_id.err", "file id not an 'object id'" );
        }
        if( data.content_type !== undefined && !data.content_type ) status.setError( "content_type.err", "file content type missing" );
        if( data.metadata !== undefined )
        {
            if( !data.metadata ) status.setError( "metadata.err", "file metadata missing" );
            else
            {
                let metadata_status = new Status();
                FileMetadata.validate( metadata_status, data.metadata, {
                    _id:          true,
                    content_type: true,
                    metadata:     true,
                    data:         true,
                } );
                if( metadata_status.getStatus() != Status.SUCCESS )
                {
                    status         .setError( "metadata.err",   "invalid file metadata" );
                    metadata_status.setError( "metadata.err.+", metadata_status );
                }
            }
        }
        if( data !== undefined && !data ) status.setError( "data.err", "file date missing" );
    }
}

// FIXME: check if the object contains all the necessary keys
export class FileApiCall
{
    static ensureValid( acc_type: string, method: string, ...params: Array<any> ): void
    {
        EnsurePermission( acc_type, "file", method );
        let status = new Status();

        switch( method )
        {
            // ------------------------------------------------------------- //
            // + add( file: FileData )
            case "add":
            {
                let file = params[ 0 ] as FileData;
                FileData.validate( status, file, {
                    // --------------
                    _id:          true,
                    content_type: true,
                    metadata:     true,
                    // --------------
                    data:         true,
                } );
                
                break;
            }
            // + get( file_id: ObjectId )
            case "get":
            {
                let file_id = params[ 0 ] as ObjectId;
                if( !( file_id instanceof ObjectId ) ) status.setError( "file_id.err", "file id missing" );
                break;
            }

        }

        if( status.getStatus() != Status.SUCCESS ) throw status;
    }
}

