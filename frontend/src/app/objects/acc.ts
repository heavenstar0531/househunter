import ObjectId from 'bson-objectid';

class Acc {
    _id:            ObjectId    = new ObjectId(); // [id]
    username:       string      = '';   // unique<string>
    password:       string      = '';   // unique<hash>
    firstname:      string      = '';
    lastname:       string      = '';
    telephone:      string|null = null;
    address:        string|null = null;
    acc_type:       string      = 'st';   // enum( 'adm', 'em', 'st' )
    created:        Date        = new Date();
    valid:          Date|null   = null;
    active:         Date|null   = null;
    deleted:        Date|null   = null;
    // ### employee ###
    em_title:       ObjectId|null = null;   // -> acc_em_title|null
    em_biography:   string|null   = null;
    em_photo:       ObjectId|null = null;   // -> file|null
    em_website_url: string|null   = null;
    em_cabinet:     string|null   = null;
    // ### student ###
    st_index:       string|null   = null;
    st_semester:    number|null   = null;
};

class LoginData {
    username: string = '';   // unique<string>
    password: string = '';   // unique<hash>
};

export { Acc, LoginData };

