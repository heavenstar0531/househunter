import ObjectId from 'bson-objectid';

class CrsGroup {
    _id:           ObjectId;   // [id]
    crs:           ObjectId;   // -> crs
    department:    string;     // enum( 'si', 'rti', 'os' )
    semester:      number;     // number
    lecturer:      Array<ObjectId>; // list< ->acc >
    student:       ObjectId;   // -> acc_group
    tm_schoolyear: number;     // number
    tm_weekday:    number;     // number
    tm_timebeg:    Date;       // time
    tm_timeend:    Date;       // time
    created:       Date;       // date
    deleted:       Date;       // date|null
};

export { CrsGroup };

