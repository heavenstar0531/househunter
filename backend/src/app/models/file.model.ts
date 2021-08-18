import { Grid } from 'gridfs-stream';
import { Readable, pipeline } from 'stream';
import ObjectId from 'bson-objectid';
import { FileData, FileMetadata } from '../common/requests/file.data';
import { Status } from '../common/types'
import { Sesh } from 'express-session';



export class FileModel
{
    constructor(
        private session: Sesh,
        private gfs: Grid )
    { }

    // ------------------------------------------------------------- //
    // (gst), <all>
    // FIXME: limit what the user can do
    async add( file: FileData ): Promise<[ Status, string?/*file_id*/ ]>
    {
        let status = new Status();
        
        // delete file.data property from the FileData object, in order for the object to be like the GridFSStream.Options interface
        let data = file.data;
        delete file.data;

        file._id = ( file._id as ObjectId ).toHexString();

        file.metadata = new FileMetadata();
        file.metadata.uploader_id = this.session.acc_id;
        file.metadata.upload_dt = new Date();

        // create a file id for the new file
        let id = new ObjectId().toHexString();

        pipeline(
            new Readable({
                // insert null at the end of the stream in order to terminate the stream
                read() { this.push(data); this.push(null); }
            }),
            this.gfs.createWriteStream(file as any)
        );

        return [ status, id ];
    }
    
    // (gst), <all>
    // FIXME: limit what the user can do
    async get( file_id: ObjectId ): Promise<[ Status, FileData? ]>
    {
        let status = new Status();
        let id = file_id.toHexString();

        let file: FileData = await this.gfs.files.find(
            { _id: id }
        ).next() as FileData;

        if( !file ) return [ status.setError( "message", "file does not exist" ) ];
        // copy the object properties into a file data object
        file = Object.assign( new FileData(), file );

        let stream = this.gfs.createReadStream( { _id: id } );
        
        const chunks = new Array<Buffer>();
        for await( let chunk of stream )
        {
            chunks.push( chunk as Buffer );
        }

        file._id = file_id;
        file.data = Buffer.concat( chunks );

        return [ status, file ];
    }
}

