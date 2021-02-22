import ObjectId from 'bson-objectid';

class Acc {
    _id:            ObjectId; // [id]
    username:       string;   // unique<string>
    password:       string;   // unique<hash>
    firstname:      string;   // string
    lastname:       string;   // string
    telephone:      string;   // string|null
    address:        string;   // string|null
    acc_type:       string;   // enum( 'adm', 'em', 'st' )
    created:        Date;     // date
    valid:          Date;     // date|null
    active:         Date;     // date|null
    deleted:        Date;     // date|null
    // ### employee ###
    em_title:       ObjectId; // -> acc_em_title|null
    em_biography:   string;   // string|null
    em_photo:       ObjectId; // -> file|null
    em_website_url: string;   // string|null
    em_cabinet:     string;   // string|null
    // ### student ###
    st_index:       string;   // string|null
    st_semester:    number;   // number|null
};

export { Acc };

