import ObjectId from 'bson-objectid';

class News {
    _id:      ObjectId;        // [id]
    title:    string;          // string
    text:     string;          // string|null
    news_cat: ObjectId;        // -> news_cat
    acc:      ObjectId;        // -> acc
    scope:    Array<ObjectId>; // list< ->general|->crs >
    files:    Array<ObjectId>; // list< ->file >|null
    created:  Date;            // date
    posted:   Date;            // date
    expired:  Date;            // date             # kada obavestenje treba da posivi
    deleted:  Date;            // date|null
};

export { News };

