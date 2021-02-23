import ObjectId from 'bson-objectid';

export class News {
    _id:      ObjectId = new ObjectId();   // [id]
    title:    string = '';
    text:     string|null = '';
    news_cat: ObjectId = new ObjectId();   // -> news_cat
    acc:      ObjectId = new ObjectId();   // -> acc
    scope:    Array<ObjectId> = [];   // list< ->general|->crs >
    files:    Array<ObjectId> = [];   // list< ->file >|null
    created:  Date = new Date();
    posted:   Date = new Date();
    expired:  Date = new Date();   // kada obavestenje treba da posivi
    deleted:  Date|null = null;
};



