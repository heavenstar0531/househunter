import ObjectId from 'bson-objectid';

export class File {
    _id:      ObjectId = new ObjectId();   // [id]
    acc:      ObjectId = new ObjectId();   // -> acc
    filename: string = '';
    filetype: string = '';
    data:     Buffer = Buffer.from('');
    bytesize: number = 0;
    note:     string|null = null;
    created:  Date = new Date();
    deleted:  Date|null = null;
};



