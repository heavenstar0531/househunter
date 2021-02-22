import ObjectId from 'bson-objectid';

class SubmsnSubmtd {
    _id:  ObjectId;   // [id]
    acc:  ObjectId;   // -> acc
    file: ObjectId;   // -> file|null
};

class SubmsnTerm {
    _id:        ObjectId;   // [id]
    cabinet:    string;     // string
    date_beg:   Date;       // date
    date_end:   Date;       // date
    prsn_limit: number;     // number|null
    submtd:     Array<SubmsnSubmtd>; // list< >
};

class Submsn {
    _id:       ObjectId;   // [id]
    name:      string;     // string
    term:      Array<SubmsnTerm>; // list< >
    created:   Date;       // date
    readonly:  Date;       // date|null
    completed: Date;       // date|null
};

export { Submsn, SubmsnTerm, SubmsnSubmtd };

