import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { OfferData } from '../requests/offer';
import { Status } from '../common/types'

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

export class OfferModel
{
    private model: Model<any> = mongoose.model( 'offer', offerSchema );

    // (usr)
    add( offer: OfferData ): Status {
        throw new Error('TODO');
    }

    // rest-unexposed method
    delete( prop_id: ObjectId ): Status {
        throw new Error('TODO');
    }

    // <all>
    accept( offer: OfferData ): Status {
        throw new Error('TODO');
    }

    // <all>
    list( prop_id: ObjectId ): [ Status, Array< OfferData >|null ] {
        throw new Error('TODO');
    }
}

