import ObjectId from 'bson-objectid';

export class Acc {
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

export class AccLoginData {
    // request
    username:    string = '';   // unique<string>
    password:    string = '';   // unique<hash>
    // response
    acc:         Acc|null = null;
    loginErr:    string = '';
    usernameErr: string = '';
    passwordErr: string = '';

    validate(): boolean {
        let valid = true;
        if( this.username == '' ) { this.usernameErr = 'nedostaje korisničko ime'; valid = false; }
        if( this.password == '' ) { this.passwordErr = 'nedostaje lozinka'; valid = false; }

        return valid;
    }
};

export class AccRegisterData {
    // request
    username:       string      = '';   // unique<string>
    password:       string      = '';   // unique<hash>
    firstname:      string      = '';
    lastname:       string      = '';
    telephone:      string|null = null;
    address:        string|null = null;
    acc_type:       string      = 'st';   // enum( 'adm', 'em', 'st' )
    // ### employee ###
    em_title:       ObjectId|null = null;   // -> acc_em_title|null
    em_cabinet:     string|null   = null;
    // response
    acc:            Acc|null = null;
    registerErr:    string   = '';
    usernameErr:    string   = '';
    passwordErr:    string   = '';
    firstnameErr:   string   = '';
    lastnameErr:    string   = '';
    telephoneErr:   string   = '';
    addressErr:     string   = '';
    acc_typeErr:    string   = '';
    em_titleErr:    string   = '';
    em_cabinetErr:  string   = '';

    validate(): boolean {
        let valid = true;
        if( this.username == '' ) { this.usernameErr = 'nedostaje korisničko ime'; valid = false; }
        if( this.password == '' ) { this.passwordErr = 'nedostaje lozinka'; valid = false; }

        return valid;
    }
}


