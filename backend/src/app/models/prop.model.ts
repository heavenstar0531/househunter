import mongoose, { Model } from 'mongoose';
import { Session } from "../util/types";
import { EnsurePermission } from '../common/permissions';
import { ObjectId } from 'mongodb';
import { PropData, OfferData } from '../common/requests/prop.data';
import { Status, Criteria, Stats } from '../common/types'

let propRentSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< rent info
 // _id:     { type: ObjectId },   // [id]
    acc_id:  { type: ObjectId },   // ->acc
    from_dt: { type: Date },       // date
    to_dt:   { type: Date },       // date
});

let propOfferSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< offer info
 // _id:            { type: ObjectId },   // [id]
    offeror_id:     { type: ObjectId },   // ->acc
    offered_amount: { type: Number },     // number
    accepted_dt:    { type: Date },       // date|null
});

let propSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< property info
 // _id:             { type: ObjectId },           // [id]
    name:            { type: String },             // string
    addr_city:       { type: String },             // string|null
    addr_district:   { type: String },             // string|null
    addr_street:     { type: String },             // string|null
    addr_streetnum:  { type: String },             // string|null
    prop_type:       { type: String, enum: [ 'house', 'flat' ] },   // enum( 'house', 'flat' )
    flat_floornum:   { type: Number },             // number|null
    floorcnt:        { type: Number },             // number
    area_m2:         { type: Number },             // number
    roomcnt:         { type: Number },             // number
    is_furnished:    { type: Boolean },            // bool
    gallery:         { type: [ObjectId] },         // list< ->file >|list< file >|null    # u objektu se uvek cuva! lista ->file;   photos, gifs and videos
    old_owner_id:    { type: ObjectId },           // ->acc|->agncy                       # (usr), agency
    // ------------------------------------------------------------- <<< rent/sale info
    prop_sale_type:  { type: String, enum: [ 'rent', 'sale' ] },   // enum( 'rent', 'sale' )
    rent_list:       { type: [propRentSchema] },   // list< rent >|null
    rent_price:      { type: Number },             // number|null
    sale_proposed_price: { type: Number },         // number|null
    sale_offer_list:     { type: [propOfferSchema] },   // list< sale_offer >|null
    sale_actual_price:   { type: Number },         // number|null
    sale_arbiter_id:     { type: ObjectId },       // ->acc|null                           # (agn),(adm) mora da potvrdi prihvacenu ponudu! (ako nije potvrdio, ponuda nije jos prihvacena)
    sale_new_owner_id:   { type: ObjectId },       // ->acc|null                           # (usr)
    // ------------------------------------------------------------- <<< property status
    accepted_dt:     { type: Date },               // date|null
    sold_dt:         { type: Date },               // date|null
    deleted_dt:      { type: Date },               // date|null
    is_promoted:     { type: Boolean },            // bool
    viewcnt:         { type: Number },             // number    
});

export class PropModel
{
    private model: Model<any> = mongoose.model( 'prop', propSchema );
    private session: Session = null;

    constructor( session: Session )
    {
        this.session = session;
    }

    // <all>
    async add( prop: PropData ): Promise<[ Status, ObjectId?/*prop_id*/ ]> {
        throw new Error('TODO');
    }

    // (adm)
    async addMany( prop_list: Array<String> ): Promise<[ Status, Array<ObjectId>?/*prop_list*/ ]> {
        throw new Error('TODO');
    }

    // (adm)
    async delete( prop_id: ObjectId ): Promise<Status> {
        throw new Error('TODO');
    }

    // <gst>,<all>
    async get( prop_id: ObjectId ): Promise<[ Status, PropData? ]> {
        throw new Error('TODO');
    }

    // <gst>,<all>: <everything>|promoted|city|price_range;   (usr): owned;   (ang),(adm): agency_owned|sold
    async list( criteria: Criteria ): Promise<[ Status, Array<PropData>? ]> {
        throw new Error('TODO');
    }


    // <all>
    async updateInfo( updated_prop: PropData ): Promise<Status> {
        throw new Error('TODO');
    }

    // (adm),(agn)
    async updateStatus( updated_prop: PropData ): Promise<Status> {
        throw new Error('TODO');
    }
    
    
    // (usr)
    async rent( prop_id: ObjectId, from_dt: Date, to_dt: Date ): Promise<[ Status, number?/*cost*/ ]> {
        throw new Error('TODO');
    }


    // (usr)
    async makePurchaseOffer( prop_id: ObjectId, offer: OfferData ): Promise<Status> {
        throw new Error('TODO');
    }

    // <all>
    async acceptPurchaseOffer( prop_id: ObjectId, offeror_id: ObjectId ): Promise<Status> {
        throw new Error('TODO');
    }

    // <all>
    async listPurchaseOffers( prop_id: ObjectId ): Promise<[ Status, Array< OfferData >? ]> {
        throw new Error('TODO');
    }
    
    
    // (adm),(agn)
    async getStats( criteria: Criteria ): Promise<[ Status, Stats? ]> {
        throw new Error('TODO');
    }
}

