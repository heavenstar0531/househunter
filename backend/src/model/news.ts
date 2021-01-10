// module koji olaksava pristup mongo bazi
import mongoose from 'mongoose';

// pravljenje seme kolekcije (tabele) 'news' pomocu mongoose-a
let News = new mongoose.Schema({
    // struktura kolekcije 'news'
    _id: { type: Number },
    caption: { type: String },
    comments: { type: Array },
});

// objekat 'News' se eksportuje pod nazivom 'News'
// svi objekti iz kolekcije 'news' su predstavljeni semom 'News' -- active record
export default mongoose.model( 'News', News, 'news' );

