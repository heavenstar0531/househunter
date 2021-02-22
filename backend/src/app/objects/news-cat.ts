import ObjectId from 'bson-objectid';

class NewsCat {
    _id:      ObjectId; // [id]
    category: string;   // unique<string>   # takmičenje, konferencija, praksa, posao, predmet
    created:  Date;     // date
    deleted:  Date;     // date|null
};

export { NewsCat };

