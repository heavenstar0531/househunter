import { ObjectId } from 'mongodb';
import { FileData } from '../common/requests/file.data';
import { Status } from '../common/types'

export class FileModel
{
    // invisible to rest api
    async add( file: FileData ): Promise<[ Status, ObjectId?/*file_id*/ ]> {
        throw new Error('TODO');
    }
    
    // invisible to rest api
    async delete( file_id: ObjectId ): Promise<Status> {
        throw new Error('TODO');
    }
    
    // invisible to rest api
    async get( file_id: ObjectId ): Promise<[ Status, FileData? ]> {
        throw new Error('TODO');
    }
}

