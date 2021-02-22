import ObjectId from 'bson-objectid';

class CrsPlan {
    _id:        ObjectId;  // [id]
    department: string;    // enum( 'si', 'rti', 'os' )
    semester:   number;    // number
    optional:   boolean;   // bool
};

class CrsPage {
    _id:     ObjectId;        // [id]
    type:    string;          // enum( 'info', 'pred', 'vezbe', 'lab', 'domaci', 'proj', 'ispit' )
    text:    string;          // string|null
    files:   Array<ObjectId>; // list< ->file >|null
    enabled: Date;            // date|null
};

class Crs {
    _id:      ObjectId;        // [id]
    code:     string;          // unique<string>
    name:     string;          // string
    plan:     Array<CrsPlan>;  // list< >
    class_hh: string;          // string
    espb:     number;          // number
    lecturer: Array<ObjectId>; // list< ->acc >
    goal:     string;          // string
    outcome:  string;          // string
    page:     Array<CrsPage>;  // list< >
    created:  Date;            // date
    deleted:  Date;            // date|null
};

export { Crs, CrsPage, CrsPlan };

