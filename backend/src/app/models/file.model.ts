// import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { FileData } from '../requests/file';
import { Status } from '../common/types'

export class FileModel
{
    // invisible to rest api
    add( file: FileData ): [ Status, ObjectId|null/*file_id*/ ] {
        throw new Error('TODO');
    }
    
    // invisible to rest api
    delete( file_id: ObjectId ): Status {
        throw new Error('TODO');
    }
    
    // invisible to rest api
    get( file_id: ObjectId ): [ Status, FileData|null ] {
        throw new Error('TODO');
    }
}

