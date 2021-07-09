import ObjectId from 'bson-objectid';

export class FileData
{
    // ------------------------------------------------------------- <<< file info
    _id?:         null|ObjectId = null;   // [id]
    length?:      null|number = null;     // number
    chunkSize?:   null|number = null;     // number
    uploadDate?:  null|Date = null;       // date
    filename?:    null|string = null;     // string
 // metadata?:    null|any = null;        // any
    data?:        null|Buffer = null;     // buffer< binary >


    static ensureValid( acc_type: string, method: string, data?: FileData ): void
    {
        throw new Error('TODO');
    }
}

