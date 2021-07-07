import ObjectId from 'bson-objectid';
import { FileData } from './file';

export class AccData {
    // ------------------------------------------------------------- <<< account info
    _id:              null|ObjectId = null;          // [id]
    username:         null|string = null;            // unique<string>
    password:         null|string = null;            // unique<hash>
    firstname:        null|string = null;            // string
    lastname:         null|string = null;            // string
    email:            null|string = null;            // unique<string>
    // ------------------------------------------------------------- <<< user info
    usr_photo_id:     null|ObjectId|FileData = null; // ->file|file|null      # u objektu se uvek cuva! ->file;   ako se ne unese koristiti default sliku
    usr_addr_country: null|string = null;            // string|null
    usr_addr_city:    null|string = null;            // string|null
    // ------------------------------------------------------------- <<< acc status
    acc_type:         null|string = null;            // enum( 'adm', 'agn', 'usr' )
    activated_dt:     null|Date = null;              // date|null
    deleted_dt:       null|Date = null;              // date|null
    usr_blocked_ids:  null|Array<ObjectId> = null;   // list< ->acc >|null


    ensureValid( acc_type: string, method: string ): void {
        throw new Error('TODO');
    }
};

// TODO: fix
export class AccLoginData {
    // request
    username:    string = '';   // unique<string>
    password:    string = '';   // unique<hash>
    // response
    acc:         AccData|null = null;
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

// TODO: fix
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
    acc:            AccData|null = null;
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


