import ObjectId from 'bson-objectid';

class AccGroup {
    _id:     ObjectId;        // [id]
    name:    string;          // string
    acc:     Array<ObjectId>; // list< -> acc >
    created: Date;            // date
    deleted: Date;            // date|null
};

export { AccGroup };

