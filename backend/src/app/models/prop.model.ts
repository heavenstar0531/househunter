import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { PropData } from '../requests/prop';
import { Status, Criteria } from '../common/types'

let propRentSchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< rent info
 // _id:     { type: ObjectId },   // [id]
    acc_id:  { type: ObjectId },   // ->acc
    from_dt: { type: Date },       // date
    to_dt:   { type: Date },       // date
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
    gallery:         { type: String },             // list< ->file|buffer<binary> >|null   # u objektu se uvek cuva! lista ->file;   photos, gifs and videos
    prev_owner_id:   { type: ObjectId },           // ->acc|->agncy                        # (usr), agency
    // ------------------------------------------------------------- <<< rent/sale info
    prop_sale_type:  { type: String, enum: [ 'rent', 'sale' ] },   // enum( 'rent', 'sale' )
    rent_list:       { type: [propRentSchema] },   // list< rent >|null
    rent_price:      { type: Number },             // number|null
    sale_price:      { type: Number },             // number|null
    sale_owner_id:   { type: ObjectId },           // ->acc|null                           # (usr)
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

    // <all>
    add( prop: PropData ): [ Status, ObjectId|null/*prop_id*/ ] {
        throw new Error('TODO');
    }

    // (adm)
    addMany( prop_list: Array<String> ): [ Status, Array<ObjectId>|null/*prop_list*/ ] {
        throw new Error('TODO');
    }

    // (adm)
    delete( prop_id: ObjectId ): Status {
        throw new Error('TODO');
    }

    // <gst>,<all>
    get( prop_id: ObjectId ): [ Status, PropData|null ] {
        throw new Error('TODO');
    }

    // <gst>,<all>: <everything>|promoted|city|price_range;   (usr): owned;   (ang),(adm): agency_owned|sold
    list( criteria: Criteria ): [ Status, Array<PropData>|null ] {
        throw new Error('TODO');
    }


    // <all>
    updateInfo( updated_prop: PropData ): Status {
        throw new Error('TODO');
    }

    // (adm),(agn)
    updateStatus( updated_prop: PropData ): Status {
        throw new Error('TODO');
    }
    
    
    // (usr)
    rent( prop_id: ObjectId, from_dt: Date, to_dt: Date ): [ Status, number|null/*cost*/ ] {
        throw new Error('TODO');
    }

    // (usr)
    purchase( prop_id: ObjectId, on_credit: boolean ): [ Status, number|null/*cost|credit*/ ] {
        throw new Error('TODO');
    }
    
    // (adm),(agn)
    // TODO: smisliti sta treba da vrati ova funkcija
    getStats( criteria: Criteria ): [ Status, any|null ] {
        throw new Error('TODO');
    }
}

