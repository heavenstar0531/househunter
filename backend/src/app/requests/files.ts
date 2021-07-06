import ObjectId from 'bson-objectid';

export class FilesData {
    // ------------------------------------------------------------- <<< file info
    _id:         null|ObjectId = null;   // [id]
    length:      null|number = null;     // number
    chunkSize:   null|number = null;     // number
    uploadDate:  null|Date = null;       // date
    filename:    null|string = null;     // string
    metadata:    null|any = null;        // any


    ensureValid( acc_type: string, method: string ): void {
        throw new Error('Not implemented');
    }
}

