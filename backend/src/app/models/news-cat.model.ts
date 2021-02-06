import mongoose from 'mongoose';

let newsCatSchema = new mongoose.Schema({
    category: { type: String },   // unique<string>   # takmičenje, konferencija, praksa, posao, predmet
    created:  { type: Date },     // date
    deleted:  { type: Date },     // date|null
});

let newsCatModel = mongoose.model( 'news_cat', newsCatSchema );

export { newsCatModel };

