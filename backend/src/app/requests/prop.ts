import ObjectId from 'bson-objectid';

export class RentData {
    // ------------------------------------------------------------- <<< rent info
    _id:     null|ObjectId = null;   // [id]
    acc_id:  null|ObjectId = null;   // ->acc
    from_dt: null|Date = null;       // date
    to_dt:   null|Date = null;       // date
};


export class propData {
    // ------------------------------------------------------------- <<< property info
    _id:             null|ObjectId = null;          // [id]
    name:            null|string = null;            // string
    addr_city:       null|string = null;            // string|null
    addr_district:   null|string = null;            // string|null
    addr_street:     null|string = null;            // string|null
    addr_streetnum:  null|string = null;            // string|null
    prop_type:       null|string = null;            // enum( 'house', 'flat' )
    flat_floornum:   null|number = null;            // number|null
    floorcnt:        null|number = null;            // number
    area_m2:         null|number = null;            // number
    roomcnt:         null|number = null;            // number
    is_furnished:    null|boolean = null;           // bool
    gallery:         null|string = null;            // list< ->file|buffer<binary> >|null   # u objektu se uvek cuva! lista ->file;   photos, gifs and videos
    prev_owner_id:   null|ObjectId = null;          // ->acc|->agncy                        # (usr), agency
    // ------------------------------------------------------------- <<< rent/sale info
    prop_sale_type:  null|string = null;            // enum( 'rent', 'sale' )
    rent_list:       null|Array<RentData> = null;   // list< rent >|null
    rent_price:      null|number = null;            // number|null
    sale_price:      null|number = null;            // number|null
    sale_owner_id:   null|ObjectId = null;          // ->acc|null                           # (usr)
    // ------------------------------------------------------------- <<< property status
    accepted_dt:     null|Date = null;              // date|null
    sold_dt:         null|Date = null;              // date|null
    deleted_dt:      null|Date = null;              // date|null
    is_promoted:     null|boolean = null;           // bool
    viewcnt:         null|number = null;            // number    


    ensureValid( acc_type: string, method: string ): void {
        throw new Error('Not implemented');
    }
};

