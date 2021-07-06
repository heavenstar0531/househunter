import ObjectId from 'bson-objectid';

export class CrsGroup {
    _id:           ObjectId  = new ObjectId();   // [id]
    crs:           ObjectId  = new ObjectId();   // -> crs
    department:    string    = '';     // enum( 'si', 'rti', 'os' )
    semester:      number    = 0;
    lecturer:      Array<ObjectId> = [];   // list< ->acc >
    student:       ObjectId  = new ObjectId();   // -> acc_group
    tm_schoolyear: number    = 2020;
    tm_weekday:    number    = 0;
    tm_timebeg:    Date      = new Date();   // time
    tm_timeend:    Date      = new Date();   // time
    created:       Date      = new Date();
    deleted:       Date|null = null;
};



