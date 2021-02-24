import ObjectId from 'bson-objectid';

export class Acc {
    _id:            ObjectId    = new ObjectId(); // [id]
    username:       string      = '';   // unique<string>
    password:       string      = '';   // unique<hash>
    firstname:      string      = '';
    lastname:       string      = '';
    telephone:      string|null = null;
    address:        string|null = null;
    acc_type:       string      = '';   // enum( 'adm', 'em', 'st' )
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

    simpleValidate(): boolean {
        let valid = true;
        if     ( this.username.length == 0 ) { this.usernameErr = 'nedostaje korisničko ime'; valid = false; }
        else if( this.username.length > 64 ) { this.usernameErr = 'predugačko korisničko ime'; valid = false; }
        else                                   this.usernameErr = '';

        if     ( this.password.length == 0 ) { this.passwordErr = 'nedostaje lozinka'; valid = false; }
        else if( this.password.length > 64 ) { this.passwordErr = 'predugačka lozinka'; valid = false; }
        else                                   this.passwordErr = '';

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
    acc_type:       string      = '';   // enum( 'adm', 'em', 'st' )
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

    simpleValidate(): boolean {
        let valid = true;

        if     ( this.username.length == 0 ) { this.usernameErr = 'nedostaje korisničko ime'; valid = false; }
        else if( this.username.length <  6 ) { this.usernameErr = 'prekratko korisničko ime'; valid = false; }
        else if( this.username.length > 64 ) { this.usernameErr = 'predugačko korisničko ime'; valid = false; }
        else                                   this.usernameErr = '';

        if     ( this.password.length == 0 ) { this.passwordErr = 'nedostaje lozinka'; valid = false; }
        else if( this.password.length < 10 ) { this.passwordErr = 'prekratka lozinka'; valid = false; }
        else if( this.password.length > 64 ) { this.passwordErr = 'predugačka lozinka'; valid = false; }
        else                                   this.passwordErr = '';

        if     ( this.firstname.length == 0 ) { this.firstnameErr = 'nedostaje ime'; valid = false; }
        else if( this.firstname.length > 16 ) { this.firstnameErr = 'predugačko ime'; valid = false; }
        else                                    this.firstnameErr = '';

        if     ( this.lastname.length == 0 ) { this.lastnameErr = 'nedostaje prezime'; valid = false; }
        else if( this.lastname.length > 48 ) { this.lastnameErr = 'predugačko prezime'; valid = false; }
        else                                   this.lastnameErr = '';

        let telephoneRegex = RegExp(/\+[0-9]+/);
        if( !this.telephone || this.telephone.length == 0 )  this.telephoneErr = '';
        else if( !telephoneRegex.test( this.telephone ) )  { this.telephoneErr = 'neispravan format broja telefona'; valid = false; }
        else if( this.telephone.length < 8   )             { this.telephoneErr = 'prekratak broj telefona'; valid = false; }
        else if( this.telephone.length > 16  )             { this.telephoneErr = 'predugačak broj telefona'; valid = false; }
        else                                                 this.telephoneErr = '';

        if     ( !this.address || this.address.length == 0 ) this.addressErr = '';
        else if( this.address.length > 128 )               { this.addressErr = 'predugačka adresa'; valid = false; }
        else                                                 this.addressErr = '';

        if     ( !this.acc_type || this.acc_type.length == 0 ) { this.acc_typeErr = 'izaberite tip korisnika'; valid = false; }
        else                                                     this.acc_typeErr = '';

        if( this.acc_type == 'em' )
        {
            if( !this.telephone || this.telephone.length == 0 ) { this.telephoneErr = 'nedostaje broj telefona'; valid = false; }

            if( !this.address || this.address.length == 0 ) { this.addressErr = 'nedostaje adresa'; valid = false; }

            if( !this.em_title ) { this.em_titleErr = 'izaberite zvanje'; valid = false; }
            else                   this.em_titleErr = '';

            if     ( !this.em_cabinet || this.em_cabinet.length == 0 ) { this.em_cabinetErr = 'unesite kabinet'; valid = false; }
            else if( this.em_cabinet.length > 4 )                      { this.em_cabinetErr = 'predugačak naziv kabineta'; valid = false; }
            else                                                         this.em_cabinetErr = '';
        }
        else
        {
            this.em_titleErr = '';
            this.em_cabinetErr = '';
        }
        
        return valid;
    }
}


