import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

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
}

