import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

let offerSchema = new mongoose.Schema({
 // ------------------------------------------------------------- <<< offer info
 // _id:        { type: ObjectId },   // [id]
    prop_id:    { type: ObjectId },   // ->prop
    offeror_id: { type: ObjectId },   // ->acc         # (usr) nalog koji daje ponudu
    sale_offer: { type: Number },     // number|null
    accept_dt:  { type: Date },       // date|null
    arbiter_id: { type: ObjectId },   // ->acc|null    # (agn),(adm) mora da potvrdi prihvacenu ponudu! (ako nije potvrdio, ponuda nije jos prihvacena)
    reject_dt:  { type: Date },       // date|null
});

class offerModel
{
    private model: Model<any> = mongoose.model( 'offer', offerSchema );
}

export { offerModel };

