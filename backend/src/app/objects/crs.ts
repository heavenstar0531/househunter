import ObjectId from 'bson-objectid';

export class CrsPlan {
    _id:        ObjectId = new ObjectId();  // [id]
    department: string   = '';   // enum( 'si', 'rti', 'os' )
    semester:   number   = 0;
    optional:   boolean  = false;
};

export class CrsPage {
    _id:     ObjectId    = new ObjectId();   // [id]
    type:    string      = '';   // enum( 'info', 'pred', 'vezbe', 'lab', 'domaci', 'proj', 'ispit' )
    text:    string|null = null;
    files:   Array<ObjectId> = [];   // list< ->file >|null
    enabled: Date|null   = null;
};

export class Crs {
    _id:      ObjectId  = new ObjectId();   // [id]
    code:     string    = '';   // unique<string>
    name:     string    = '';
    plan:     Array<CrsPlan> = [];
    class_hh: string    = '';
    espb:     number    = 0;
    lecturer: Array<ObjectId> = [];   // list< ->acc >
    goal:     string    = '';
    outcome:  string    = '';
    page:     Array<CrsPage> = [];
    created:  Date      = new Date();
    deleted:  Date|null = null;
};



