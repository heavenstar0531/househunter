import ObjectId from 'bson-objectid';

export class OfferData {
    // ------------------------------------------------------------- <<< offer info
    _id:        null|ObjectId = null;   // [id]
    prop_id:    null|ObjectId = null;   // ->prop
    offeror_id: null|ObjectId = null;   // ->acc         # (usr) nalog koji daje ponudu
    sale_offer: null|number = null;     // number|null
    accept_dt:  null|Date = null;       // date|null
    arbiter_id: null|ObjectId = null;   // ->acc|null    # (agn),(adm) mora da potvrdi prihvacenu ponudu! (ako nije potvrdio, ponuda nije jos prihvacena)
    reject_dt:  null|Date = null;       // date|null


    ensureValid( acc_type: string, method: string ): void {
        throw new Error('Not implemented');
    }
};

