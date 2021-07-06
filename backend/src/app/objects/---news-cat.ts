import ObjectId from 'bson-objectid';

export class NewsCat {
    _id:      ObjectId = new ObjectId();   // [id]
    category: string = '';   // unique<string>   # takmičenje, konferencija, praksa, posao, predmet
    created:  Date = new Date();
    deleted:  Date|null = null;
};



