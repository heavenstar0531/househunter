import mongoose from 'mongoose';

let accEmTitleSchema = new mongoose.Schema({
    title: { type: String },   // unique<string>   # nastavno zvanje:   redovni profesor, vanredni profesor, docent, asistent, saradnik u nastavi
                               //                  # nenastavno zvanje: istraživač, laboratorijski inženjer, laboratorijski tehničar
});

let accEmTitleModel = mongoose.model( 'acc_em_title', accEmTitleSchema );

export { accEmTitleModel };

