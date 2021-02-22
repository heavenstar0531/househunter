import ObjectId from 'bson-objectid';

class File {
    _id:      ObjectId; // [id]
    acc:      ObjectId; // -> acc
    filename: string;   // string
    filetype: string;   // string
    data:     Buffer;   // buffer
    bytesize: number;   // number
    note:     string;   // string|null
    created:  Date;     // date
    deleted:  Date;     // date|null
};

export { File };

