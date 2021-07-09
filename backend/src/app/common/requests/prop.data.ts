import ObjectId from 'bson-objectid';
import { FileData } from './file.data';

export class RentData
{
    // ------------------------------------------------------------- <<< rent info
    _id?:     null|ObjectId = null;   // [id]
    acc_id?:  null|ObjectId = null;   // ->acc
    from_dt?: null|Date = null;       // date
    to_dt?:   null|Date = null;       // date


    static ensureValid( acc_type: string, method: string, data?: RentData ): void
    {
        throw new Error('TODO');
    }
};


export class OfferData
{
    // ------------------------------------------------------------- <<< offer info
    _id?:            null|ObjectId = null;   // [id]
    offeror_id?:     null|ObjectId = null;   // ->acc
    offered_amount?: null|number = null;     // number
    accepted_dt?:    null|Date = null;       // date|null


    static ensureValid( acc_type: string, method: string, data?: OfferData ): void
    {
        throw new Error('TODO');
    }
};


export class PropData
{
    // ------------------------------------------------------------- <<< property info
    _id?:             null|ObjectId = null;          // [id]
    name?:            null|string = null;            // string
    addr_city?:       null|string = null;            // string|null
    addr_district?:   null|string = null;            // string|null
    addr_street?:     null|string = null;            // string|null
    addr_streetnum?:  null|string = null;            // string|null
    prop_type?:       null|string = null;            // enum( 'house', 'flat' )
    flat_floornum?:   null|number = null;            // number|null
    floorcnt?:        null|number = null;            // number
    area_m2?:         null|number = null;            // number
    roomcnt?:         null|number = null;            // number
    is_furnished?:    null|boolean = null;           // bool
    gallery?:         null|Array<ObjectId>|Array<FileData> = null;   // list< ->file >|list< file >|null   # u objektu se uvek cuva! lista ->file;   photos, gifs and videos
    old_owner_id?:    null|ObjectId = null;          // ->acc|->agncy                        # (usr), agency
    // ------------------------------------------------------------- <<< rent/sale info
    prop_sale_type?:  null|string = null;            // enum( 'rent', 'sale' )
    rent_list?:       null|Array<RentData> = null;   // list< rent >|null
    rent_price?:      null|number = null;            // number|null
    sale_proposed_price?: null|number = null;        // number|null
    sale_offer_list?:     null|Array<OfferData> = null;   // list< sale_offer >|null
    sale_actual_price?:   null|number = null;        // number|null
    sale_arbiter_id?:     null|ObjectId = null;      // ->acc|null                           # (agn),(adm) mora da potvrdi prihvacenu ponudu! (ako nije potvrdio, ponuda nije jos prihvacena)
    sale_new_owner_id?:   null|ObjectId = null;      // ->acc|null                           # (usr)
    // ------------------------------------------------------------- <<< property status
    accepted_dt?:     null|Date = null;              // date|null
    sold_dt?:         null|Date = null;              // date|null
    deleted_dt?:      null|Date = null;              // date|null
    is_promoted?:     null|boolean = null;           // bool
    viewcnt?:         null|number = null;            // number    


    static ensureValid( acc_type: string, method: string, data?: PropData ): void
    {
        throw new Error('TODO');
    }
};

