import ObjectId from 'bson-objectid';

class AccEmTitle {
    _id:   ObjectId;   // [id]
    title: string;     // unique<string>   # nastavno zvanje:   redovni profesor, vanredni profesor, docent, asistent, saradnik u nastavi
                       //                  # nenastavno zvanje: istraživač, laboratorijski inženjer, laboratorijski tehničar
};

export { AccEmTitle };

