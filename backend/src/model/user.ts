// module koji olaksava pristup mongo bazi
import mongoose from 'mongoose';

// pravljenje seme kolekcije (tabele) 'user' pomocu mongoose-a
let User = new mongoose.Schema({
    // struktura kolekcije 'user'
    username: { type: String },
    password: { type: String },
    email: { type: String },
    type: { type: Number },
});

// objekat 'User' se eksportuje pod nazivom 'User'
// svi objekti iz kolekcije 'user' su predstavljeni semom 'User' -- active record
export default mongoose.model( 'User', User, 'user' );

